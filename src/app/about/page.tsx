"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Heart, Shield, Star, Truck, Users, Zap } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  const milestones = [
    {
      year: "2020",
      title: "Company Founded",
      description: "Started with a vision to revolutionize e-commerce",
    },
    {
      year: "2021",
      title: "First 1000 Customers",
      description: "Reached our first major milestone",
    },
    {
      year: "2022",
      title: "Nationwide Expansion",
      description: "Expanded shipping to all 50 states",
    },
    {
      year: "2023",
      title: "Premium Service Launch",
      description: "Introduced membership tiers and premium benefits",
    },
    {
      year: "2024",
      title: "1 Million Products",
      description: "Achieved catalog milestone with diverse offerings",
    },
  ];

  const values = [
    {
      icon: <Heart className="w-8 h-8 text-red-500" />,
      title: "Customer First",
      description:
        "Every decision we make starts with our customers. Their satisfaction is our top priority.",
    },
    {
      icon: <Shield className="w-8 h-8 text-blue-500" />,
      title: "Trust & Security",
      description:
        "We maintain the highest standards of security and transparency in all our operations.",
    },
    {
      icon: <Zap className="w-8 h-8 text-yellow-500" />,
      title: "Innovation",
      description:
        "We continuously evolve and improve our platform to deliver the best shopping experience.",
    },
    {
      icon: <Users className="w-8 h-8 text-green-500" />,
      title: "Community",
      description:
        "We believe in building a community where everyone feels valued and connected.",
    },
  ];

  const features = [
    {
      icon: <Truck className="w-6 h-6" />,
      title: "Fast Shipping",
      description: "Free 2-day shipping on orders over $50",
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Premium Quality",
      description: "Curated products from trusted brands",
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "Member Benefits",
      description: "Exclusive discounts and early access",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure Shopping",
      description: "Protected payments and data security",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20">
        <div className="mx-auto px-6 lg:px-8 max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <Badge>About Our Story</Badge>
            <h1 className="mb-6 font-bold text-4xl md:text-6xl">
              Redefining Your Shopping Experience
            </h1>
            <p className="opacity-90 mb-8 text-lg md:text-xl">
              We're passionate about connecting customers with quality products
              while delivering exceptional service that exceeds expectations.
            </p>
            <div className="flex sm:flex-row flex-col justify-center gap-4">
              <Button size="lg" variant="default">
                <Link href="/shopping">Shop Now</Link>
              </Button>
              <Button size="lg" variant="outline">
                <Link href="/contact-us">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto px-6 lg:px-8 py-16 max-w-7xl">
        {/* Mission Statement */}
        <section className="mb-16 text-center">
          <h2 className="mb-6 font-bold text-3xl">Our Mission</h2>
          <div className="mx-auto max-w-3xl">
            <p className="mb-6 text-lg text-muted-foreground">
              To create a seamless, enjoyable, and trustworthy shopping
              experience that brings high-quality products directly to your
              doorstep while building lasting relationships with our community.
            </p>
            <Card className="bg-gradient-to-r from-blue-50 dark:from-blue-950/50 to-purple-50 dark:to-purple-950/50">
              <CardContent className="p-8">
                <blockquote className="text-lg italic">
                  "We believe that shopping should be more than a transaction—it
                  should be an experience that delights, inspires, and connects
                  people with the products they love."
                </blockquote>
                <cite className="block mt-4 font-medium text-sm">
                  — Our Founding Team
                </cite>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Core Values */}
        <section className="mb-16">
          <h2 className="mb-8 font-bold text-3xl text-center">Our Values</h2>
          <div className="gap-8 grid md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">{value.icon}</div>
                  <h3 className="mb-3 font-semibold text-xl">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Company Timeline */}
        <section className="mb-16">
          <h2 className="mb-8 font-bold text-3xl text-center">Our Journey</h2>
          <div className="space-y-6 mx-auto max-w-4xl">
            {milestones.map((milestone, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex md:flex-row flex-col items-start gap-4">
                    <Badge className="bg-primary px-4 py-2 text-lg">
                      {milestone.year}
                    </Badge>
                    <div className="flex-1">
                      <h3 className="mb-2 font-semibold text-xl">
                        {milestone.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Features Grid */}
        <section className="mb-16">
          <h2 className="mb-8 font-bold text-3xl text-center">
            Why Shop With Us
          </h2>
          <div className="gap-6 grid sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className="flex justify-center items-center bg-primary/10 mx-auto mb-4 rounded-full w-12 h-12">
                    {feature.icon}
                  </div>
                  <h3 className="mb-2 font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Statistics */}
        <section className="mb-16">
          <Card className=" ">
            <CardContent className="p-8">
              <h2 className="mb-8 font-bold text-3xl text-center">
                Our Impact in Numbers
              </h2>
              <div className="gap-8 grid sm:grid-cols-2 lg:grid-cols-4 text-center">
                <div>
                  <div className="mb-2 font-bold text-4xl">1M+</div>
                  <div>Products Available</div>
                </div>
                <div>
                  <div className="mb-2 font-bold text-4xl">500K+</div>
                  <div>Happy Customers</div>
                </div>
                <div>
                  <div className="mb-2 font-bold text-4xl">50</div>
                  <div>States Served</div>
                </div>
                <div>
                  <div className="mb-2 font-bold text-4xl">99.8%</div>
                  <div>Customer Satisfaction</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <h2 className="mb-4 font-bold text-3xl">Ready to Start Shopping?</h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
            Join our community of satisfied customers and discover why we're the
            preferred choice for online shopping.
          </p>
          <div className="flex sm:flex-row flex-col justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/shopping">Browse Products</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/membership">View Memberships</Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
