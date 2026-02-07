import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

interface WeatherData {
  main: {
    temp: number;
    humidity: number;
  };
  weather: Array<{
    main: string;
    description: string;
  }>;
}

// Parse destination from natural language input
function parseDestination(input: string): { destination: string; month?: string } {
  const monthNames = [
    'january', 'february', 'march', 'april', 'may', 'june',
    'july', 'august', 'september', 'october', 'november', 'december'
  ];
  
  let destination = input;
  let month: string | undefined;

  // Find month in input
  for (const monthName of monthNames) {
    if (input.toLowerCase().includes(monthName)) {
      month = monthName;
      destination = input.replace(new RegExp(monthName, 'gi'), '').trim();
      break;
    }
  }

  // Remove common words
  destination = destination
    .replace(/\b(in|to|going|traveling|travelling|i'm|im)\b/gi, '')
    .trim();

  return { destination, month };
}

// Get weather data from OpenWeatherMap API
async function getWeatherData(destination: string): Promise<WeatherData | null> {
  const apiKey = process.env.OPENWEATHER_API_KEY;
  
  if (!apiKey) {
    console.warn('OpenWeatherMap API key not configured');
    return null;
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(destination)}&units=metric&appid=${apiKey}`
    );

    if (!response.ok) {
      console.error('Weather API error:', response.statusText);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
}

// Get product recommendations based on weather
function getRecommendations(weather: WeatherData | null, input: string) {
  const recommendations: {
    categories: string[];
    reasoning: string;
    temperature?: number;
    humidity?: number;
  } = {
    categories: ['skincare', 'personal hygiene'],
    reasoning: 'Essential travel products for any destination',
  };

  if (!weather) {
    return recommendations;
  }

  const temp = weather.main.temp;
  const humidity = weather.main.humidity;
  const weatherCondition = weather.weather[0]?.main || '';

  recommendations.temperature = temp;
  recommendations.humidity = humidity;

  // Hot weather (> 25°C)
  if (temp > 25) {
    recommendations.categories = ['skincare', 'personal hygiene', 'haircare'];
    recommendations.reasoning = 
      `Warm weather detected (${temp.toFixed(1)}°C). We recommend sunscreen, moisturizers, and cooling skincare products. Don't forget deodorant and lightweight hair care!`;
  }
  // Moderate weather (15-25°C)
  else if (temp >= 15) {
    recommendations.categories = ['skincare', 'cosmetics', 'personal hygiene'];
    recommendations.reasoning = 
      `Pleasant weather (${temp.toFixed(1)}°C). Ideal for light skincare and cosmetics. Standard travel essentials recommended.`;
  }
  // Cold weather (< 15°C)
  else {
    recommendations.categories = ['skincare', 'personal hygiene'];
    recommendations.reasoning = 
      `Cool weather (${temp.toFixed(1)}°C). Focus on moisturizing products and lip balm to protect against dry, cold air.`;
  }

  // High humidity (> 70%)
  if (humidity > 70) {
    if (!recommendations.categories.includes('haircare')) {
      recommendations.categories.push('haircare');
    }
    recommendations.reasoning += ` High humidity (${humidity}%) - consider anti-frizz hair products and oil-control skincare.`;
  }

  // Sunny/Clear conditions
  if (weatherCondition === 'Clear' || weatherCondition === 'Sun') {
    recommendations.reasoning += ' Clear skies - sunscreen is essential!';
  }

  return recommendations;
}

export async function POST(request: NextRequest) {
  try {
    const { input } = await request.json();

    if (!input || typeof input !== 'string') {
      return NextResponse.json(
        { error: 'Invalid input' },
        { status: 400 }
      );
    }

    // Parse the destination from natural language
    const { destination, month } = parseDestination(input);

    if (!destination) {
      return NextResponse.json(
        { error: 'Could not parse destination' },
        { status: 400 }
      );
    }

    // Get weather data
    const weather = await getWeatherData(destination);

    // Get recommendations based on weather
    const recommendations = getRecommendations(weather, input);

    // Fetch products from recommended categories
    const products = await prisma.product.findMany({
      where: {
        category: {
          in: recommendations.categories,
        },
        stock: {
          gt: 0,
        },
      },
      take: 12,
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({
      destination,
      month,
      recommendations,
      products,
      weatherAvailable: weather !== null,
    });
  } catch (error) {
    console.error('Error generating recommendations:', error);
    return NextResponse.json(
      { error: 'Failed to generate recommendations' },
      { status: 500 }
    );
  }
}
