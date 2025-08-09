"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  Users, 
  Building2, 
  DollarSign, 
  Globe,
  Award,
  Clock,
  Shield,
  Star,
  CheckCircle,
  Target
} from "lucide-react";

const stats = [
  {
    icon: Building2,
    value: "2,500+",
    label: "Properties Listed",
    description: "Premium properties across DR",
    color: "text-blue-600"
  },
  {
    icon: Users,
    value: "15,000+",
    label: "Active Investors",
    description: "From 50+ countries",
    color: "text-green-600"
  },
  {
    icon: DollarSign,
    value: "$1.2B+",
    label: "Total Investment",
    description: "Facilitated through platform",
    color: "text-purple-600"
  },
  {
    icon: TrendingUp,
    value: "12.5%",
    label: "Average ROI",
    description: "Annual returns for investors",
    color: "text-orange-600"
  }
];

const achievements = [
  {
    icon: Award,
    title: "Best Real Estate Platform 2024",
    description: "Awarded by Caribbean Real Estate Association"
  },
  {
    icon: Globe,
    title: "International Recognition",
    description: "Featured in Forbes, Bloomberg, and Wall Street Journal"
  },
  {
    icon: Shield,
    title: "100% Secure Transactions",
    description: "Bank-level security for all investments"
  },
  {
    icon: Star,
    title: "4.9/5 Customer Rating",
    description: "Based on 3,500+ verified reviews"
  }
];

const testimonials = [
  {
    name: "Carlos Rodriguez",
    location: "Miami, USA",
    text: "Meridian helped me invest in a luxury condo in Punta Cana. The process was smooth and the returns exceeded my expectations.",
    investment: "$450,000",
    roi: "14.2%"
  },
  {
    name: "Sarah Johnson",
    location: "Toronto, Canada",
    text: "As a first-time international investor, Meridian made the entire process transparent and secure. Highly recommended!",
    investment: "$280,000",
    roi: "11.8%"
  },
  {
    name: "Miguel Santos",
    location: "Madrid, Spain",
    text: "The tax incentives guidance was invaluable. I'm now enjoying excellent returns on my commercial property investment.",
    investment: "$750,000",
    roi: "13.5%"
  }
];

export function Stats() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Platform Excellence
          </h2>
          <p className="text-xl text-muted-foreground">
            Trusted by thousands of investors worldwide for Dominican Republic real estate investments
          </p>
        </div>

        {/* Main Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon className={`h-6 w-6 text-yellow-500 dark:text-yellow-400`} />
                  </div>
                  <div className={`text-3xl font-bold mb-2 ${stat.color}`}>
                    {stat.value}
                  </div>
                  <div className="font-semibold mb-1">{stat.label}</div>
                  <div className="text-sm text-muted-foreground">
                    {stat.description}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Achievements */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">Why Choose Meridian</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <Card key={index} className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-6 w-6 text-yellow-500 dark:text-yellow-400" />
                    </div>
                    <h4 className="font-semibold mb-2">{achievement.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {achievement.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">Success Stories</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle className="h-5 w-5 text-yellow-500 dark:text-yellow-400" />
                    <span className="text-sm font-medium text-green-600">Verified Investor</span>
                  </div>
                  <p className="text-muted-foreground mb-4 italic">
                    "{testimonial.text}"
                  </p>
                  <div className="border-t pt-4">
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground mb-2">
                      {testimonial.location}
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Investment:</span>
                      <span className="font-semibold">${testimonial.investment}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">ROI:</span>
                      <span className="font-semibold text-green-600">{testimonial.roi}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Platform Metrics */}
        <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Clock className="h-5 w-5 text-yellow-500 dark:text-yellow-400" />
                <span className="font-semibold">Quick Processing</span>
              </div>
              <div className="text-2xl font-bold text-primary">24-48 hours</div>
              <div className="text-sm text-muted-foreground">Average verification time</div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Target className="h-5 w-5 text-yellow-500 dark:text-yellow-400" />
                <span className="font-semibold">Success Rate</span>
              </div>
              <div className="text-2xl font-bold text-primary">96%</div>
              <div className="text-sm text-muted-foreground">Investment success rate</div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Users className="h-5 w-5 text-yellow-500 dark:text-yellow-400" />
                <span className="font-semibold">Expert Network</span>
              </div>
              <div className="text-2xl font-bold text-primary">200+</div>
              <div className="text-sm text-muted-foreground">Real estate professionals</div>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <Button size="lg" className="mr-4">
              Join 15,000+ Investors
            </Button>
            <Button size="lg" variant="outline">
              View Full Report
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}