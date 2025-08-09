"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Zap, Building, Users, Crown } from "lucide-react";

const plans = [
  {
    id: "initial",
    name: "Initial",
    description: "Individual Owners",
    price: 0,
    originalPrice: 49,
    discount: "100% OFF",
    billing: "month",
    icon: Users,
    color: "bg-gray-100 text-gray-900",
    popular: false,
    features: [
      "1 User",
      "1 Active Property",
      "12 Photos (expandable)",
      "Basic Buyer Verification",
      "Manual Contract Templates",
      "Email Support"
    ],
    limits: {
      users: 1,
      properties: 1,
      photos: 12
    }
  },
  {
    id: "team",
    name: "Team",
    description: "Small Agencies or Families",
    price: 97,
    originalPrice: 147,
    discount: "34% OFF",
    billing: "month",
    icon: Building,
    color: "bg-blue-50 text-blue-900",
    popular: true,
    features: [
      "3 Users",
      "100 Shared Properties",
      "12 Photos per Property",
      "Advanced Verification (ID + Income)",
      "0.05% Commission",
      "Digital Contract Generator",
      "Lead Scoring System",
      "Commission Protection for 365 Days",
      "24/7 Chat Support"
    ],
    limits: {
      users: 3,
      properties: 100,
      photos: 12
    }
  },
  {
    id: "company-lite",
    name: "Company Lite",
    description: "Growing Brokerages",
    price: 499,
    originalPrice: 697,
    discount: "28.6% OFF",
    billing: "month",
    icon: Zap,
    color: "bg-purple-50 text-purple-900",
    popular: false,
    features: [
      "12 Users",
      "600 Properties",
      "18 Photos per Property",
      "Biometric Buyer Verification",
      "0% Commission",
      "Auto-Renewable Smart Contracts",
      "Integration with Escrow Services",
      "Commission Protection for 180 Days",
      "Dedicated Account Manager",
      "$58 for additional users up to 25"
    ],
    limits: {
      users: 12,
      properties: 600,
      photos: 18
    }
  },
  {
    id: "unlimited",
    name: "Unlimited",
    description: "Large Institutions",
    price: 199,
    originalPrice: null,
    discount: null,
    billing: "month",
    icon: Crown,
    color: "bg-gradient-to-br from-yellow-50 to-orange-50 text-orange-900",
    popular: false,
    features: [
      "Custom Users",
      "Unlimited Properties",
      "Unlimited Transfers",
      "24 Photos per Property",
      "0% Commission",
      "AI Verification (Anti-Money Laundering)",
      "Lifetime Commission Protection",
      "Customizable Contracts and Branding",
      "24/7 Legal/Technical Support",
      "$7.50/user for 1-100 users"
    ],
    limits: {
      users: -1,
      properties: -1,
      photos: 24
    }
  }
];

const additionalPackages = [
  {
    name: "Essential Exposure",
    description: "Basic Package",
    price: 399,
    features: [
      "25 Professionally Edited Photos",
      "90-second HD Video Tour",
      "5 Drone Photos",
      "SEO Optimization"
    ]
  },
  {
    name: "Premium Presentation",
    description: "Professional Package",
    price: 899,
    features: [
      "50 Advanced Edited Photos",
      "3-minute Cinematic Video",
      "15 Drone Photos"
    ]
  },
  {
    name: "Maximum Exposure",
    description: "Concierge Package",
    price: 1999,
    features: [
      "75+ Magazine-Style Photos",
      "5-minute Cinematic Video",
      "Global Distribution on Luxury Portals"
    ]
  }
];

export function SubscriptionPlans() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
    // Here you would integrate with Stripe checkout
    console.log(`Selected plan: ${planId}`);
  };

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Perfect Plan
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Start with our free tier for the first 10,000 users, or get 50% off with our limited-time coupon for the first 1,000 users.
          </p>
          <div className="mt-6 flex justify-center">
            <Badge variant="secondary" className="bg-green-100 text-green-800 px-4 py-2">
              🎉 50% Discount Available - First 1,000 Users Only!
            </Badge>
          </div>
        </div>

        {/* Subscription Plans */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {plans.map((plan) => {
            const IconComponent = plan.icon;
            return (
              <Card 
                key={plan.id} 
                className={`relative ${plan.popular ? 'ring-2 ring-blue-500 shadow-lg' : ''} hover:shadow-xl transition-all duration-300`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-500 text-white px-4 py-1">
                      <Star className="w-4 h-4 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center">
                  <div className={`w-16 h-16 mx-auto rounded-full ${plan.color} flex items-center justify-center mb-4`}>
                    <IconComponent className="w-8 h-8" />
                  </div>
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <CardDescription className="text-gray-600">{plan.description}</CardDescription>
                  
                  <div className="mt-4">
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-4xl font-bold text-gray-900">
                        ${plan.price}
                      </span>
                      <span className="text-gray-600">/{plan.billing}</span>
                    </div>
                    
                    {plan.originalPrice && (
                      <div className="flex items-center justify-center gap-2 mt-2">
                        <span className="text-lg text-gray-500 line-through">
                          ${plan.originalPrice}
                        </span>
                        <Badge variant="destructive" className="text-xs">
                          {plan.discount}
                        </Badge>
                      </div>
                    )}
                  </div>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter>
                  <Button 
                    className="w-full" 
                    variant={plan.popular ? "default" : "outline"}
                    onClick={() => handleSelectPlan(plan.id)}
                  >
                    {plan.price === 0 ? "Start Free" : "Get Started"}
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        {/* Additional Packages */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Additional Packages
            </h3>
            <p className="text-lg text-gray-600">
              Enhance your property listings with professional photography and marketing
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {additionalPackages.map((pkg, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="text-center">
                  <CardTitle className="text-xl font-bold">{pkg.name}</CardTitle>
                  <CardDescription>{pkg.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-3xl font-bold text-gray-900">
                      ${pkg.price}
                    </span>
                    <span className="text-gray-600">/property</span>
                  </div>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-2">
                    {pkg.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <Check className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Add Package
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        {/* Special Terms */}
        <div className="mt-16 bg-blue-50 rounded-lg p-8">
          <h4 className="text-xl font-bold text-gray-900 mb-4">Special Terms & Benefits</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-700">
            <div>
              <h5 className="font-semibold mb-2">Key Metrics:</h5>
              <ul className="space-y-1">
                <li>• Team Level: 16.7% less than Initial</li>
                <li>• Company Lite: Reduces verification time by 73%</li>
                <li>• Security: 99.98% fraud prevention rate for Unlimited tier</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-2">Terms:</h5>
              <ul className="space-y-1">
                <li>• Discounts applicable for annual payments only</li>
                <li>• Promotional pricing guaranteed for 24 months</li>
                <li>• Unique implementation fee of $99 applies</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}