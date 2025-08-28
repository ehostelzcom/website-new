import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Basic Plan",
    description: "Perfect for small hostels",
    price: 29,
    features: [
      "Up to 1 hostel",
      "Up to 50 students",
      "Basic reporting",
      "Email support"
    ],
    popular: false
  },
  {
    name: "Professional Plan",
    description: "For medium hostels with multiple branches",
    price: 79,
    features: [
      "Up to 5 hostels",
      "Up to 500 students",
      "Advanced reporting & analytics",
      "Priority support",
      "Student portal"
    ],
    popular: true
  },
  {
    name: "Enterprise Plan",
    description: "For hostel groups with unlimited hostels",
    price: 199,
    features: [
      "Unlimited hostels",
      "Unlimited students",
      "Custom reporting",
      "24/7 phone support",
      "API access",
      "Custom integrations"
    ],
    popular: false
  }
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4" data-testid="pricing-title">
            Choose the Perfect Plan
          </h2>
          <p className="text-xl text-muted-foreground" data-testid="pricing-subtitle">
            Scalable pricing for hostels of all sizes
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative ${plan.popular ? 'border-2 border-primary' : ''}`}
              data-testid={`pricing-card-${index}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2" data-testid={`plan-name-${index}`}>
                    {plan.name}
                  </h3>
                  <p className="text-muted-foreground mb-4" data-testid={`plan-description-${index}`}>
                    {plan.description}
                  </p>
                  <div className="text-4xl font-bold" data-testid={`plan-price-${index}`}>
                    ${plan.price}
                    <span className="text-lg text-muted-foreground">/month</span>
                  </div>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center" data-testid={`feature-${index}-${featureIndex}`}>
                      <Check className="text-green-500 mr-3 h-4 w-4" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className={`w-full ${plan.popular ? '' : 'variant-outline'}`}
                  variant={plan.popular ? 'default' : 'outline'}
                  data-testid={`plan-button-${index}`}
                >
                  {index === 2 ? 'Contact Sales' : 'Get Started'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
