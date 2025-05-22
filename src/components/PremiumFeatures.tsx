
import React from 'react';
import { Check, BadgeDollarSign, CreditCard, Megaphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PricingTier } from '../types';

const PremiumFeatures: React.FC = () => {
  const pricingTiers: PricingTier[] = [
    {
      name: 'Free Basic',
      price: 'Free',
      description: 'One resume analysis per month',
      features: [
        'One free resume analysis monthly',
        'Basic formatting feedback',
        'Keyword optimization tips',
        'Ad-supported experience'
      ],
      type: 'free',
      adSupported: true
    },
    {
      name: 'Premium',
      price: '$9.99',
      description: 'Unlimited advanced analysis',
      features: [
        'Unlimited resume analyses',
        'Cover letter analysis',
        'Advanced ATS compatibility testing',
        'Industry-specific keyword recommendations',
        'Downloadable detailed report',
        'Section-by-section feedback',
        'Ad-free experience'
      ],
      type: 'subscription',
      isPopular: true,
      duration: 'month'
    },
    {
      name: 'One-Week Pass',
      price: '$4.99',
      description: 'Full access for 7 days',
      features: [
        'All Premium features for 7 days',
        'Unlimited resume analyses',
        'Cover letter analysis',
        'ATS compatibility testing',
        'Downloadable reports',
        'Ad-free experience',
        'No subscription required'
      ],
      type: 'one-time',
      duration: '7 days'
    }
  ];

  return (
    <div className="py-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Choose Your Plan</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-2">
          Get the competitive edge with our AI-powered resume analysis tools
        </p>
        <p className="text-lg font-semibold text-brand-600 max-w-2xl mx-auto">
          Don't let a weak resume hold you back.
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
            
            {tier.adSupported && (
              <div className="absolute top-0 left-0">
                <div className="bg-yellow-500 text-white text-xs font-semibold px-3 py-1 rounded-br-lg flex items-center gap-1">
                  <Megaphone className="h-3 w-3" />
                  Ad Supported
                </div>
              </div>
            )}
            
            <div className="p-6">
              <div className="mb-4">
                <h3 className="text-xl font-bold">{tier.name}</h3>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-3xl font-bold">{tier.price}</span>
                  {tier.type === 'subscription' && <span className="text-muted-foreground">/{tier.duration}</span>}
                  {tier.type === 'one-time' && <span className="text-muted-foreground">/{tier.duration}</span>}
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
                  variant={tier.name === 'Free Basic' ? 'outline' : 'default'}
                >
                  {tier.type === 'free' ? 'Current Plan' : tier.type === 'subscription' ? 'Subscribe Now' : 'Buy Now'}
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
            <h3 className="text-xl font-bold mb-2">100% Money Back Guarantee</h3>
            <p className="text-muted-foreground">
              Not satisfied with our premium analysis? We offer a 14-day money-back guarantee for all subscription plans, no questions asked.
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
