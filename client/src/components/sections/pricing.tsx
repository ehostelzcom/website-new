import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Star, Crown, Building, Users, Sparkles } from "lucide-react";
import { useState } from "react";

const plans = [
  {
    name: "Starter Plan",
    description: "Perfect for small single hostels just starting",
    monthlyPrice: 3000,
    icon: Building,
    seats: 50,
    hostels: 1,
    features: [
      "1 Hostel",
      "50 Active Seats / month",
      "Unlimited Registered Users",
      "Basic Reporting",
      "Email Support",
      "Monthly Transaction Cycle"
    ],
    popular: false,
    color: "from-blue-500 to-blue-600"
  },
  {
    name: "Growth Plan",
    description: "For growing hostels with more students",
    monthlyPrice: 5000,
    icon: Users,
    seats: 100,
    hostels: 1,
    features: [
      "1 Hostel",
      "100 Active Seats / month",
      "Unlimited Registered Users",
      "Advanced Reporting",
      "Priority Support",
      "Student Portal Access"
    ],
    popular: true,
    color: "from-green-500 to-green-600"
  },
  {
    name: "Scale Plan",
    description: "For large hostels with high turnover",
    monthlyPrice: 12000,
    icon: Star,
    seats: 500,
    hostels: 1,
    features: [
      "1 Hostel",
      "500 Active Seats / month",
      "Unlimited Registered Users",
      "Premium Analytics",
      "24/7 Support",
      "Advanced Automation"
    ],
    popular: false,
    color: "from-purple-500 to-purple-600"
  },
  {
    name: "Business Plan",
    description: "Designed for small hostel groups",
    monthlyPrice: 15000,
    icon: Crown,
    seats: 300,
    hostels: 3,
    features: [
      "Up to 3 Hostels",
      "100 Active Seats per hostel",
      "Unlimited Registered Users",
      "Multi-branch Management",
      "Business Analytics",
      "Dedicated Support"
    ],
    popular: false,
    color: "from-orange-500 to-orange-600"
  },
  {
    name: "Enterprise Plan",
    description: "For bigger hostel chains with multiple branches",
    monthlyPrice: 25000,
    icon: Sparkles,
    seats: 1000,
    hostels: 5,
    features: [
      "Up to 5 Hostels",
      "200 Active Seats per hostel",
      "Unlimited Registered Users",
      "Enterprise Analytics",
      "Priority Support",
      "Custom Integrations"
    ],
    popular: false,
    color: "from-red-500 to-red-600"
  },
  {
    name: "Custom Plan",
    description: "Unlimited hostels for large organizations",
    monthlyPrice: null,
    icon: Crown,
    seats: "Unlimited",
    hostels: "Unlimited",
    features: [
      "Unlimited Hostels",
      "Unlimited Seats / month",
      "Unlimited Registered Users",
      "Custom Features",
      "White-label Solution",
      "Dedicated Account Manager"
    ],
    popular: false,
    color: "from-gray-700 to-gray-800",
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
    <section id="pricing" className="py-20 bg-gradient-to-br from-gray-50 via-white to-primary/5 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="w-full">
        {/* Header */}
        <div className="text-center mb-16 px-4">
          <h2 className="text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent" data-testid="pricing-title">
            💰 EHostelz Pricing Plans
          </h2>
          <p className="text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8" data-testid="pricing-subtitle">
            Choose the perfect plan for your hostel management needs
          </p>

          {/* Billing Toggle */}
          <div className="flex justify-center mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-2 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="flex space-x-1">
                {[
                  { key: 'monthly', label: 'Monthly' },
                  { key: '6months', label: '6 Months', badge: '10% OFF' },
                  { key: 'yearly', label: '1 Year', badge: '20% OFF' }
                ].map((option) => (
                  <button
                    key={option.key}
                    onClick={() => setBillingPeriod(option.key)}
                    className={`relative px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                      billingPeriod === option.key
                        ? 'bg-primary text-white shadow-lg'
                        : 'text-gray-600 dark:text-gray-400 hover:text-primary'
                    }`}
                  >
                    {option.label}
                    {option.badge && (
                      <span className="absolute -top-2 -right-2 bg-accent text-white text-xs px-2 py-1 rounded-full">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 max-w-7xl mx-auto">
          {plans.map((plan, index) => {
            const IconComponent = plan.icon;
            const price = calculatePrice(plan.monthlyPrice, billingPeriod);
            
            return (
              <Card 
                key={index} 
                className={`relative overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
                  plan.popular 
                    ? 'border-2 border-primary shadow-2xl ring-4 ring-primary/20' 
                    : 'border border-gray-200 dark:border-gray-700 shadow-lg'
                }`}
                data-testid={`pricing-card-${index}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <span className="bg-gradient-to-r from-primary to-accent text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                      ⭐ Most Popular
                    </span>
                  </div>
                )}

                {/* Gradient Header */}
                <div className={`bg-gradient-to-r ${plan.color} p-6 text-white`}>
                  <div className="flex items-center justify-between mb-4">
                    <IconComponent className="w-8 h-8" />
                    {getDiscountLabel(billingPeriod) && (
                      <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-bold">
                        {getDiscountLabel(billingPeriod)}
                      </span>
                    )}
                  </div>
                  <h3 className="text-2xl font-bold mb-2" data-testid={`plan-name-${index}`}>
                    {plan.name}
                  </h3>
                  <p className="text-white/90 mb-4" data-testid={`plan-description-${index}`}>
                    {plan.description}
                  </p>
                  
                  {/* Price */}
                  <div className="text-center">
                    {plan.isCustom ? (
                      <div className="text-3xl font-bold">Contact Us</div>
                    ) : (
                      <div>
                        <div className="text-4xl font-bold" data-testid={`plan-price-${index}`}>
                          Rs {price?.toLocaleString()}
                          <span className="text-lg text-white/80">{getPeriodLabel(billingPeriod)}</span>
                        </div>
                        {billingPeriod !== 'monthly' && (
                          <div className="text-sm text-white/70 mt-1">
                            Save Rs {((plan.monthlyPrice! * (billingPeriod === '6months' ? 6 : 12)) - price!).toLocaleString()}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <CardContent className="p-8">
                  {/* Key Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{plan.hostels}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Hostels</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-accent">{plan.seats}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Seats</div>
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start" data-testid={`feature-${index}-${featureIndex}`}>
                        <Check className="text-green-500 mr-3 h-5 w-5 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Button 
                    className={`w-full py-4 text-lg font-semibold transition-all duration-300 ${
                      plan.popular 
                        ? 'bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:scale-105' 
                        : plan.isCustom
                        ? 'bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800'
                        : ''
                    }`}
                    variant={plan.popular ? 'default' : plan.isCustom ? 'default' : 'outline'}
                    data-testid={`plan-button-${index}`}
                  >
                    {plan.isCustom ? '📞 Contact Sales' : '🚀 Get Started'}
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
