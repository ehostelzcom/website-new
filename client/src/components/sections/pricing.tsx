import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { useState } from "react";

const plans = [
  {
    name: "Starter",
    category: "Single Hostel",
    description: "Perfect for small single hostels just starting",
    monthlyPrice: 2500,
    seats: "1-100",
    hostels: 1,
    features: [
      "✅ 100% Cloud-Based Access",
      "🔒 Enterprise-Level Data Security",
      "📱 Mobile Responsive Design",
      "🎆 1-100 Active Seats Included",
      "👥 Unlimited Registered Users",
      "🎓 Student Portal",
      "🌐 Vacant Seats Display on Website",
      "⭐ Experience Rating System",
      "💰 Hostel Pricing Display",
      "🏨 Facilities & Amenities Showcase"
    ],
    popular: false
  },
  {
    name: "Growth",
    category: "Single Hostel",
    description: "For growing hostels with more students",
    monthlyPrice: 4000,
    seats: "101-250",
    hostels: 1,
    features: [
      "✅ 100% Cloud-Based Access",
      "🔒 Enterprise-Level Data Security",
      "📱 Mobile Responsive Design",
      "🎆 101-250 Active Seats Included",
      "👥 Unlimited Registered Users",
      "🎓 Student Portal",
      "🌐 Vacant Seats Display on Website",
      "⭐ Experience Rating System",
      "💰 Hostel Pricing Display",
      "🏨 Facilities & Amenities Showcase"
    ],
    popular: true
  },
  {
    name: "Scale",
    category: "Single Hostel",
    description: "For large hostels with high turnover",
    monthlyPrice: 10000,
    seats: "251-500",
    hostels: 1,
    features: [
      "✅ 100% Cloud-Based Access",
      "🔒 Enterprise-Level Data Security",
      "📱 Mobile Responsive Design",
      "🎆 251-500 Active Seats Included",
      "👥 Unlimited Registered Users",
      "🎓 Student Portal",
      "🌐 Vacant Seats Display on Website",
      "⭐ Experience Rating System",
      "💰 Hostel Pricing Display",
      "🏨 Facilities & Amenities Showcase"
    ],
    popular: false
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

  const handleGetStarted = (planName: string, price: number | null, period: string) => {
    let message = `Hi! I'm interested in the ${planName} plan for ehostelz.com. `;
    
    if (price) {
      message += `The pricing is Rs ${price.toLocaleString()}${getPeriodLabel(period)}. `;
    }
    
    message += `Can you help me get started and provide more details about the features?`;
    
    const whatsappUrl = `https://wa.me/923129409211?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleContactSales = () => {
    const message = `Hi! I'm interested in the Custom plan for ehostelz.com. I need unlimited hostels and would like to discuss pricing and custom features. Can you help me with a tailored solution?`;
    const whatsappUrl = `https://wa.me/923129409211?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="pricing" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white" data-testid="pricing-title">
            Pricing Plans
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8" data-testid="pricing-subtitle">
            Choose the perfect plan for your hostel management needs
          </p>

          {/* Billing Toggle */}
          <div className="flex justify-center mb-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full max-w-xl">
              {[
                { key: 'monthly', label: 'Monthly', description: 'Pay monthly', badge: null },
                { key: '6months', label: '6 Months', description: 'Save 10%', badge: '10% OFF' },
                { key: 'yearly', label: '1 Year', description: 'Best value', badge: '20% OFF' }
              ].map((option) => (
                <label
                  key={option.key}
                  className={`relative cursor-pointer group transition-all duration-300 ${
                    billingPeriod === option.key
                      ? 'transform scale-105'
                      : 'hover:scale-102'
                  }`}
                >
                  <input
                    type="radio"
                    name="billingPeriod"
                    value={option.key}
                    checked={billingPeriod === option.key}
                    onChange={(e) => setBillingPeriod(e.target.value)}
                    className="sr-only"
                  />
                  <div className={`relative p-4 rounded-lg border-2 text-center transition-all duration-300 ${
                    billingPeriod === option.key
                      ? 'border-primary bg-primary/5 shadow-lg ring-4 ring-primary/20'
                      : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-primary/50 hover:shadow-md'
                  }`}>
                    {option.badge && (
                      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                        <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-lg">
                          {option.badge}
                        </span>
                      </div>
                    )}
                    
                    <div className={`w-5 h-5 mx-auto mb-2 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                      billingPeriod === option.key
                        ? 'border-primary bg-primary'
                        : 'border-gray-300 dark:border-gray-600 group-hover:border-primary'
                    }`}>
                      {billingPeriod === option.key && (
                        <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                      )}
                    </div>
                    
                    <h3 className={`text-base font-bold mb-1 transition-colors ${
                      billingPeriod === option.key
                        ? 'text-primary'
                        : 'text-gray-900 dark:text-gray-100 group-hover:text-primary'
                    }`}>
                      {option.label}
                    </h3>
                    
                    <p className={`text-xs transition-colors ${
                      billingPeriod === option.key
                        ? 'text-primary/80'
                        : 'text-gray-600 dark:text-gray-400'
                    }`}>
                      {option.description}
                    </p>
                  </div>
                </label>
              ))}
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
                    <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white" data-testid={`plan-name-${index}`}>
                      {plan.name}
                    </h3>
                    <div className="mb-2">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        plan.category === 'Single Hostel' 
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                          : plan.category.includes('Both')
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                      }`}>
                        {plan.category}
                      </span>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg mb-4">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300" data-testid={`plan-description-${index}`}>
                        {plan.description}
                      </p>
                    </div>
                    
                    {/* Price */}
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
                  </div>

                  {/* Key Stats */}
                  <div className="grid grid-cols-2 gap-3 mb-6 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="text-center">
                      <div className="text-lg font-bold text-primary">{plan.hostels}</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Hostels</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-accent">{plan.seats}</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Active Seats</div>
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
                    className="w-full flex items-center justify-center gap-2"
                    variant={plan.popular ? 'default' : 'outline'}
                    onClick={() => handleGetStarted(plan.name, price, billingPeriod)}
                    data-testid={`plan-button-${index}`}
                  >
                    <FaWhatsapp className="h-4 w-4" />
                    Get Started
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
