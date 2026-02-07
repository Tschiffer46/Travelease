'use client';

import { motion } from 'framer-motion';
import { 
  Droplets, 
  PackageCheck, 
  Users, 
  ShieldCheck, 
  Baby, 
  Pill,
  AlertCircle 
} from 'lucide-react';
import Container from '@/components/ui/Container';
import Card from '@/components/ui/Card';

export default function AirportRulesSection() {
  const rules = [
    {
      icon: Droplets,
      title: '100ml Maximum',
      description: 'Each liquid container must be 100ml or less',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: PackageCheck,
      title: '1 Litre Bag',
      description: 'All containers must fit in a single transparent, resealable plastic bag (max 1L, approx 20×20cm)',
      color: 'from-primary-500 to-primary-600',
    },
    {
      icon: Users,
      title: 'One Bag Per Person',
      description: 'Each passenger is allowed only one liquids bag',
      color: 'from-accent-500 to-accent-600',
    },
    {
      icon: ShieldCheck,
      title: 'Separate Screening',
      description: 'The bag must be presented separately at security',
      color: 'from-emerald-500 to-emerald-600',
    },
  ];

  const exceptions = [
    {
      icon: Baby,
      text: 'Baby food and milk for the journey',
    },
    {
      icon: Pill,
      text: 'Essential medicines (with proof)',
    },
  ];

  const liquidTypes = [
    'Liquids', 'Gels', 'Pastes', 'Creams', 'Aerosols', 'Lotions'
  ];

  return (
    <section id="airport-rules" className="py-20 bg-background-secondary">
      <Container>
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-primary-500/10 text-primary-700">
            <AlertCircle className="w-5 h-5" />
            <span className="text-sm font-semibold">Important Information</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-text mb-4">
            European Airport Liquid Rules
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            Know the rules before you fly. Here's everything you need to know about carrying liquids 
            in your hand luggage when flying from or within Europe.
          </p>
        </motion.div>

        {/* Main Rules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {rules.map((rule, index) => {
            const Icon = rule.icon;
            return (
              <motion.div
                key={rule.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full p-6 text-center hover:shadow-lg transition-shadow">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br ${rule.color} text-white mb-4`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-text mb-3">{rule.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {rule.description}
                  </p>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Exceptions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <Card className="p-8 bg-white">
            <h3 className="text-2xl font-bold text-text mb-6 text-center">Exceptions to the Rules</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {exceptions.map((exception) => {
                const Icon = exception.icon;
                return (
                  <div key={exception.text} className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-emerald-600" />
                    </div>
                    <p className="text-text-secondary font-medium">{exception.text}</p>
                  </div>
                );
              })}
            </div>
          </Card>
        </motion.div>

        {/* What Counts as Liquid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card className="p-8 bg-gradient-to-br from-primary-500 to-primary-600 text-white">
            <h3 className="text-2xl font-bold mb-6 text-center">What Counts as a Liquid?</h3>
            <p className="text-center text-primary-100 mb-6 max-w-2xl mx-auto">
              These rules apply to all of the following items in your hand luggage:
            </p>
            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
              {liquidTypes.map((type) => (
                <span 
                  key={type}
                  className="px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm font-semibold text-sm"
                >
                  {type}
                </span>
              ))}
            </div>
            <div className="mt-8 p-4 rounded-lg bg-white/10 backdrop-blur-sm max-w-3xl mx-auto">
              <p className="text-sm text-center text-primary-50">
                <strong>Note:</strong> Some EU airports have started allowing larger quantities with new CT scanners, 
                but the 100ml rule still applies at most European airports as of 2026.
              </p>
            </div>
          </Card>
        </motion.div>
      </Container>
    </section>
  );
}
