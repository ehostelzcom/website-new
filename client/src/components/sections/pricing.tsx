import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";
import { useState } from "react";

const plans = [
  {
    name: "Starter",
    description: "Perfect for small single hostels just starting",
    monthlyPrice: 2000,
    seats: 50,
    hostels: 1,
    features: [
      "1 Hostel",
      "50 Active Seats / month",
      "Unlimited Registered Users"
    ],
    popular: false
  },
  {
    name: "Growth",
    description: "For growing hostels with more students",
    monthlyPrice: 3500,
    seats: 100,
    hostels: 1,
    features: [
      "1 Hostel",
      "100 Active Seats / month",
      "Unlimited Registered Users"
    ],
    popular: true
  },
  {
    name: "Scale",
    description: "For large hostels with high turnover",
    monthlyPrice: 8000,
    seats: 500,
    hostels: 1,
    features: [
      "1 Hostel",
      "500 Active Seats / month",
      "Unlimited Registered Users"
    ],
    popular: false
  },
  {
    name: "Business",
    description: "Designed for small hostel groups",
    monthlyPrice: 12000,
    seats: 300,
    hostels: 3,
    features: [
      "Up to 3 Hostels",
      "100 Active Seats per hostel",
      "Unlimited Registered Users"
    ],
    popular: false
  },
  {
    name: "Enterprise",
    description: "For bigger hostel chains with multiple branches",
    monthlyPrice: 20000,
    seats: 1000,
    hostels: 5,
    features: [
      "Up to 5 Hostels",
      "200 Active Seats per hostel",
      "Unlimited Registered Users"
    ],
    popular: false
  },
  {
    name: "Custom",
    description: "Unlimited hostels for large organizations",
    monthlyPrice: null,
    seats: "Unlimited",
    hostels: "Unlimited",
    features: [
      "Unlimited Hostels",
      "Unlimited Seats / month",
      "Unlimited Registered Users"
    ],
    popular: false,
    isCustom: true
  }
];

export default function Pricing() {
  const [billingPeriod, setBillingPeriod] = useState('monthly');

  const calculatePrice = (monthlyPrice: number | null, period: string) => {
    if (!monthlyPrice) return null;
    
    switch (period) {
      case 'monthly':
        return monthlyPrice;
      case '6months':
        return Math.round(monthlyPrice * 6 * 0.9); // 10% discount
      case 'yearly':
        return Math.round(monthlyPrice * 12 * 0.8); // 20% discount
      default:
        return monthlyPrice;
    }
  };

  const getPeriodLabel = (period: string) => {
    switch (period) {
      case 'monthly':
        return '/month';
      case '6months':
        return '/6 months';
      case 'yearly':
        return '/year';
      default:
        return '/month';
    }
  };

  const getDiscountLabel = (period: string) => {
    switch (period) {
      case '6months':
        return '10% OFF';
      case 'yearly':
        return '20% OFF';
      default:
        return '';
    }
  };

  return (
    <section id="pricing" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white" data-testid="pricing-title">
            💰 EHostelz Pricing Plans
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8" data-testid="pricing-subtitle">
            Choose the perfect plan for your hostel management needs
          </p>

          {/* Billing Toggle */}
          <div className="flex justify-center mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-1 shadow-md border border-gray-200 dark:border-gray-700">
              <div className="flex space-x-1">
                {[
                  { key: 'monthly', label: 'Monthly' },
                  { key: '6months', label: '6 Months', badge: '10% OFF' },
                  { key: 'yearly', label: '1 Year', badge: '20% OFF' }
                ].map((option) => (
                  <button
                    key={option.key}
                    onClick={() => setBillingPeriod(option.key)}
                    className={`relative px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      billingPeriod === option.key
                        ? 'bg-primary text-white'
                        : 'text-gray-600 dark:text-gray-400 hover:text-primary'
                    }`}
                  >
                    {option.label}
                    {option.badge && (
                      <span className="absolute -top-1 -right-1 bg-accent text-white text-xs px-1 py-0.5 rounded-full">
                        {option.badge}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {plans.map((plan, index) => {
            const price = calculatePrice(plan.monthlyPrice, billingPeriod);
            
            return (
              <Card 
                key={index} 
                className={`relative bg-white dark:bg-gray-800 border shadow-sm hover:shadow-md transition-shadow ${
                  plan.popular 
                    ? 'border-primary border-2' 
                    : 'border-gray-200 dark:border-gray-700'
                }`}
                data-testid={`pricing-card-${index}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary text-white px-3 py-1 rounded-full text-xs font-medium">
                      Most Popular
                    </span>
                  </div>
                )}

                <CardContent className="p-6">
                  {/* Plan Header */}
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white" data-testid={`plan-name-${index}`}>
                      {plan.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4" data-testid={`plan-description-${index}`}>
                      {plan.description}
                    </p>
                    
                    {/* Price */}
                    {plan.isCustom ? (
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">Contact Us</div>
                    ) : (
                      <div>
                        <div className="text-3xl font-bold text-gray-900 dark:text-white" data-testid={`plan-price-${index}`}>
                          Rs {price?.toLocaleString()}
                          <span className="text-sm text-gray-500 dark:text-gray-400">{getPeriodLabel(billingPeriod)}</span>
                        </div>
                        {billingPeriod !== 'monthly' && (
                          <div className="text-xs text-green-600 dark:text-green-400 mt-1">
                            Save Rs {((plan.monthlyPrice! * (billingPeriod === '6months' ? 6 : 12)) - price!).toLocaleString()}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Key Stats */}
                  <div className="grid grid-cols-2 gap-3 mb-6 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="text-center">
                      <div className="text-lg font-bold text-primary">{plan.hostels}</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Hostels</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-accent">{plan.seats}</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Seats</div>
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm" data-testid={`feature-${index}-${featureIndex}`}>
                        <Check className="text-green-500 mr-2 h-4 w-4 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Button 
                    className="w-full"
                    variant={plan.popular ? 'default' : 'outline'}
                    data-testid={`plan-button-${index}`}
                  >
                    {plan.isCustom ? 'Contact Sales' : 'Get Started'}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
