import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number, currency: string = 'SEK'): string {
  const currencySymbols: Record<string, string> = {
    SEK: 'kr',
    NOK: 'kr',
    DKK: 'kr',
    EUR: '€',
    USD: '$',
  };

  const symbol = currencySymbols[currency] || currency;
  return `${price.toFixed(2)} ${symbol}`;
}

export function formatLiquidVolume(volumeMl: number): string {
  if (volumeMl >= 1000) {
    return `${(volumeMl / 1000).toFixed(1)}L`;
  }
  return `${volumeMl}ml`;
}

export function calculateLiquidTotal(items: Array<{ sizeInMl: number | null; quantity: number }>): number {
  return items.reduce((total, item) => {
    if (item.sizeInMl) {
      return total + item.sizeInMl * item.quantity;
    }
    return total;
  }, 0);
}

export function isWithinTSALimits(totalMl: number, maxPerContainer: number = 100): {
  isValid: boolean;
  totalMl: number;
  maxTotalMl: number;
  maxPerContainer: number;
} {
  const maxTotalMl = 1000; // 1 liter
  return {
    isValid: totalMl <= maxTotalMl,
    totalMl,
    maxTotalMl,
    maxPerContainer,
  };
}
