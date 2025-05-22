
import React from 'react';
import { Check, BadgeDollarSign, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PricingTier } from '../types';

const PremiumFeatures: React.FC = () => {
  const pricingTiers: PricingTier[] = [
    {
      name: 'Basic',
      price: 'Free',
      description: 'Essential resume feedback to get started',
      features: [
        'Single resume analysis',
        'Basic formatting feedback',
        'Keyword optimization tips',
        'Content improvement suggestions'
      ]
    },
    {
      name: 'Premium',
      price: '$9.99',
      description: 'Advanced analysis for serious job seekers',
      features: [
        'Unlimited resume analyses',
        'ATS compatibility testing',
        'Industry-specific keyword recommendations',
        'Downloadable detailed report',
        'Section-by-section feedback'
      ],
      isPopular: true
    },
    {
      name: 'Professional',
      price: '$29.99',
      description: 'Complete career support for professionals',
      features: [
        'All Premium features',
        'Cover letter analysis',
        'LinkedIn profile review',
        'Expert rewriting suggestions',
        'AI-generated personalization for job applications',
        'Priority support'
      ]
    }
  ];

  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Upgrade Your Job Search</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Get the competitive edge with our premium resume analysis tools
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {pricingTiers.map((tier, index) => (
          <div 
            key={index}
            className={`relative rounded-xl border ${
              tier.isPopular 
                ? 'border-brand-200 shadow-lg shadow-brand-100/50' 
                : 'border-border'
            } overflow-hidden`}
          >
            {tier.isPopular && (
              <div className="absolute top-0 right-0">
                <div className="bg-brand-600 text-white text-xs font-semibold px-3 py-1 rounded-bl-lg">
                  Most Popular
                </div>
              </div>
            )}
            
            <div className="p-6">
              <div className="mb-4">
                <h3 className="text-xl font-bold">{tier.name}</h3>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-3xl font-bold">{tier.price}</span>
                  {tier.price !== 'Free' && <span className="text-muted-foreground">/month</span>}
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{tier.description}</p>
              </div>
              
              <ul className="space-y-3 mt-6">
                {tier.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-brand-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-8">
                <Button 
                  className={`w-full ${
                    tier.isPopular 
                      ? 'bg-brand-600 hover:bg-brand-700' 
                      : ''
                  }`}
                  variant={tier.name === 'Basic' ? 'outline' : 'default'}
                >
                  {tier.name === 'Basic' ? 'Current Plan' : 'Upgrade'}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-16 bg-muted/50 rounded-xl p-6 border">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="flex-shrink-0">
            <div className="bg-brand-100 h-16 w-16 rounded-full flex items-center justify-center">
              <BadgeDollarSign className="h-8 w-8 text-brand-600" />
            </div>
          </div>
          <div className="flex-grow text-center md:text-left">
            <h3 className="text-xl font-bold mb-2">Money Back Guarantee</h3>
            <p className="text-muted-foreground">
              Not satisfied with our premium analysis? We offer a 14-day money-back guarantee, no questions asked.
            </p>
          </div>
          <div className="flex-shrink-0">
            <div className="flex items-center gap-2 text-sm">
              <CreditCard className="h-4 w-4" />
              <span>Secured by Stripe</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumFeatures;
