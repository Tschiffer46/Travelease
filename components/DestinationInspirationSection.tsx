'use client';

import { motion } from 'framer-motion';
import { Sun, Droplets, Wind, Sparkles, Shield, Bug, Waves } from 'lucide-react';
import Container from '@/components/ui/Container';
import Card from '@/components/ui/Card';

export default function DestinationInspirationSection() {
  const beachEssentials = [
    {
      icon: Sun,
      name: 'High SPF Sunscreen',
      detail: 'SPF 50+ essential',
      tip: 'Reapply every 2 hours',
      color: 'from-orange-500 to-orange-600',
    },
    {
      icon: Droplets,
      name: 'After-Sun Gel',
      detail: 'Aloe Vera soothing',
      tip: 'Cool and refresh skin',
      color: 'from-cyan-500 to-cyan-600',
    },
    {
      icon: Wind,
      name: 'Lightweight Moisturizer',
      detail: 'Humidity-friendly',
      tip: 'Non-greasy formula',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: Sparkles,
      name: 'Waterproof Mascara',
      detail: 'Beach & pool proof',
      tip: 'Stays put all day',
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: Bug,
      name: 'Insect Repellent',
      detail: 'Tropical protection',
      tip: 'For evening mosquitos',
      color: 'from-green-500 to-green-600',
    },
    {
      icon: Shield,
      name: 'Lip Balm with SPF',
      detail: 'Often forgotten',
      tip: 'Protect delicate lips',
      color: 'from-pink-500 to-pink-600',
    },
  ];

  const winterEssentials = [
    {
      icon: Droplets,
      name: 'Rich Moisturizer',
      tip: 'Combat dry indoor air',
    },
    {
      icon: Shield,
      name: 'Intensive Lip Balm',
      tip: 'Prevent chapping',
    },
    {
      icon: Sparkles,
      name: 'Hand Cream',
      tip: 'Keep hands soft',
    },
  ];

  return (
    <section id="destination" className="py-20 bg-white">
      <Container>
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-orange-500/10 text-orange-700">
            <Sun className="w-5 h-5" />
            <span className="text-sm font-semibold">Destination Guide</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-text mb-4">
            Pack Smart for Your Destination
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            Different destinations need different essentials. Here's your guide to packing perfectly 
            for any adventure.
          </p>
        </motion.div>

        {/* Sunny/Tropical Beach Destination */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-100 p-8 md:p-12">
            <div className="absolute top-0 right-0 text-9xl opacity-10">☀️</div>
            
            <div className="relative">
              <div className="flex items-center gap-3 mb-6">
                <Waves className="w-8 h-8 text-orange-600" />
                <h3 className="text-3xl font-serif font-bold text-text">
                  Heading to the Mediterranean?
                </h3>
              </div>
              <p className="text-lg text-text-secondary mb-8 max-w-2xl">
                Sun, sea, and sand paradise destinations like Thailand, Greece, or the Caribbean 
                require special sun protection and beach-ready essentials.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {beachEssentials.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Card className="p-5 h-full hover:shadow-lg transition-all">
                        <div className="flex items-start gap-4">
                          <div className={`flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center text-white`}>
                            <Icon className="w-6 h-6" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-text mb-1">{item.name}</h4>
                            <p className="text-sm text-text-secondary mb-1">{item.detail}</p>
                            <p className="text-xs text-primary-600 font-semibold">💡 {item.tip}</p>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>

              <div className="bg-orange-600 text-white p-6 rounded-xl">
                <p className="font-bold text-lg mb-2">☀️ Pro Tip:</p>
                <p className="text-orange-100">
                  Don't forget — sunscreen needs to be reapplied every 2 hours and after swimming! 
                  Even "waterproof" sunscreen washes off eventually.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Winter/Cold Destination */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="p-8 md:p-12 bg-gradient-to-br from-blue-50 to-cyan-50">
            <div className="flex items-center gap-3 mb-6">
              <Wind className="w-8 h-8 text-blue-600" />
              <h3 className="text-2xl font-serif font-bold text-text">
                Heading to a Cold Climate?
              </h3>
            </div>
            <p className="text-text-secondary mb-6">
              Winter cities like Stockholm, Reykjavik, or Montreal need extra moisture protection 
              against dry indoor heating.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {winterEssentials.map((item) => {
                const Icon = item.icon;
                return (
                  <div 
                    key={item.name}
                    className="flex items-center gap-3 p-4 bg-white rounded-lg"
                  >
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-bold text-text text-sm">{item.name}</p>
                      <p className="text-xs text-text-secondary">{item.tip}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </motion.div>
      </Container>
    </section>
  );
}
