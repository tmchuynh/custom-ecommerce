"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Briefcase,
  Brush,
  Clock,
  Coffee,
  DollarSign,
  Globe,
  GraduationCap,
  Heart,
  Home,
  MapPin,
  Star,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { FaHelmetSafety } from "react-icons/fa6";
import { IoLogoDesignernews } from "react-icons/io";

export default function CareersPage() {
  const benefits = [
    {
      icon: <Heart className="w-6 h-6 text-red-500" />,
      title: "Health & Wellness",
      description: "Comprehensive health insurance and wellness programs",
    },
    {
      icon: <Home className="w-6 h-6 text-blue-500" />,
      title: "Work-Life Balance",
      description: "Flexible hours and remote work opportunities",
    },
    {
      icon: <GraduationCap className="w-6 h-6 text-green-500" />,
      title: "Learning & Development",
      description: "Continuous learning opportunities and skill development",
    },
    {
      icon: <DollarSign className="w-6 h-6 text-yellow-500" />,
      title: "Competitive Compensation",
      description: "Competitive salary and performance-based bonuses",
    },
    {
      icon: <Coffee className="w-6 h-6 text-purple-500" />,
      title: "Great Environment",
      description: "Modern workspace with free snacks and drinks",
    },
    {
      icon: <Globe className="w-6 h-6 text-indigo-500" />,
      title: "Global Impact",
      description: "Work on projects that reach customers worldwide",
    },
  ];

  const positions = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      department: "Engineering",
      location: "Remote / San Francisco",
      type: "Full-time",
      experience: "5+ years",
      salary: "$120k - $180k",
      description:
        "Build and maintain our customer-facing applications using React, TypeScript, and modern web technologies.",
      requirements: [
        "5+ years of frontend development experience",
        "Expertise in React, TypeScript, and modern CSS",
        "Experience with state management and testing",
        "Strong problem-solving skills",
      ],
    },
    {
      id: 2,
      title: "Product Manager",
      department: "Product",
      location: "San Francisco / New York",
      type: "Full-time",
      experience: "3+ years",
      salary: "$130k - $200k",
      description:
        "Drive product strategy and roadmap for our e-commerce platform, working closely with engineering and design teams.",
      requirements: [
        "3+ years of product management experience",
        "Experience with e-commerce platforms",
        "Strong analytical and communication skills",
        "Bachelor's degree in relevant field",
      ],
    },
    {
      id: 3,
      title: "UX/UI Designer",
      department: "Design",
      location: "Remote / San Francisco",
      type: "Full-time",
      experience: "3+ years",
      salary: "$90k - $140k",
      description:
        "Create intuitive and beautiful user experiences for our customers across web and mobile platforms.",
      requirements: [
        "3+ years of UX/UI design experience",
        "Proficiency in Figma, Sketch, or similar tools",
        "Experience with design systems",
        "Portfolio demonstrating strong design skills",
      ],
    },
    {
      id: 4,
      title: "DevOps Engineer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      experience: "4+ years",
      salary: "$110k - $160k",
      description:
        "Manage and optimize our cloud infrastructure, CI/CD pipelines, and deployment processes.",
      requirements: [
        "4+ years of DevOps experience",
        "Experience with AWS, Docker, and Kubernetes",
        "Knowledge of CI/CD tools and practices",
        "Strong scripting and automation skills",
      ],
    },
    {
      id: 5,
      title: "Customer Success Manager",
      department: "Customer Success",
      location: "Austin / Remote",
      type: "Full-time",
      experience: "2+ years",
      salary: "$70k - $100k",
      description:
        "Help our customers achieve success with our platform through onboarding, training, and ongoing support.",
      requirements: [
        "2+ years in customer success or account management",
        "Excellent communication and interpersonal skills",
        "Experience with CRM and customer success tools",
        "Problem-solving mindset",
      ],
    },
    {
      id: 6,
      title: "Marketing Specialist",
      department: "Marketing",
      location: "New York / Remote",
      type: "Full-time",
      experience: "2+ years",
      salary: "$60k - $90k",
      description:
        "Develop and execute marketing campaigns to drive customer acquisition and brand awareness.",
      requirements: [
        "2+ years of digital marketing experience",
        "Experience with social media and content marketing",
        "Knowledge of analytics and marketing tools",
        "Creative thinking and attention to detail",
      ],
    },
  ];

  const departments = [
    {
      name: "Engineering",
      count: 12,
      description: "Build the future of e-commerce",
      color: "bg-blue-500",
      icon: <FaHelmetSafety className="w-6 h-6" />,
    },
    {
      name: "Product",
      count: 5,
      description: "Shape user experiences",
      color: "bg-green-500",
      icon: <IoLogoDesignernews className="w-6 h-6" />,
    },
    {
      name: "Design",
      count: 4,
      description: "Create beautiful interfaces",
      color: "bg-purple-500",
      icon: <Brush className="w-6 h-6" />,
    },
    {
      name: "Marketing",
      count: 6,
      description: "Tell our story to the world",
      color: "bg-red-500",
      icon: <Globe className="w-6 h-6" />,
    },
    {
      name: "Customer Success",
      count: 8,
      description: "Help customers succeed",
      color: "bg-yellow-500",
      icon: <Heart className="w-6 h-6" />,
    },
    {
      name: "Operations",
      count: 7,
      description: "Keep everything running smoothly",
      color: "bg-indigo-500",
      icon: <Home className="w-6 h-6" />,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20">
        <div className="mx-auto px-6 lg:px-8 max-w-7xl">
          <div className="mx-auto text-center">
            <Badge className="mb-4" variant={"glassSuccess"}>
              Gear Up. Stand Out.
            </Badge>
            <h1 className="mb-6 font-bold text-4xl md:text-6xl">
              Build the Future of E-Commerce
            </h1>
            <p className="opacity-90 mb-8 text-lg md:text-xl">
              Join a team of passionate individuals working to revolutionize
              online shopping and create amazing experiences for millions of
              customers.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto px-6 lg:px-8 py-16 max-w-7xl">
        {/* Why Work Here */}
        <section className="mb-16">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-bold text-3xl">
              Fynix. Where Everything Connects.
            </h2>
            <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
              We believe in creating an environment where talented people can do
              their best work and grow their careers.
            </p>
          </div>
          <div className="gap-6 grid md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    {benefit.icon}
                    <h3 className="font-semibold text-lg">{benefit.title}</h3>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Departments */}
        <section className="mb-16">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-bold text-3xl">Our Departments</h2>
            <p className="text-lg text-muted-foreground">
              Explore opportunities across different teams
            </p>
          </div>
          <div className="gap-6 grid sm:grid-cols-2 lg:grid-cols-3">
            {departments.map((dept, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Badge className="mb-4 rounded-full w-12 h-12">
                      <div> {dept.icon}</div>
                    </Badge>
                    <div>
                      <h3 className="font-semibold">{dept.name}</h3>
                      <p className="text-muted-foreground text-sm">
                        {dept.count} open positions
                      </p>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    {dept.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Open Positions */}
        <section className="mb-16">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-bold text-3xl">Open Positions</h2>
            <p className="text-lg text-muted-foreground">
              Find your next opportunity with us
            </p>
          </div>
          <div className="space-y-6">
            {positions.map((position) => (
              <Card
                key={position.id}
                className="hover:shadow-md transition-shadow"
              >
                <CardHeader>
                  <div className="flex lg:flex-row flex-col justify-between items-start lg:items-center gap-4">
                    <div>
                      <CardTitle className="flex items-center gap-2 mb-2">
                        <Briefcase className="w-5 h-5" />
                        {position.title}
                      </CardTitle>
                      <div className="flex flex-wrap gap-2 text-muted-foreground text-sm">
                        <Badge variant="outline">{position.department}</Badge>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {position.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {position.type}
                        </span>
                        <span className="flex items-center gap-1">
                          <TrendingUp className="w-4 h-4" />
                          {position.experience}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-green-600 text-lg">
                        {position.salary}
                      </div>
                      <Button size="sm">Apply Now</Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      {position.description}
                    </p>
                    <div>
                      <h4 className="mb-2 font-medium">Requirements:</h4>
                      <ul className="space-y-1 text-muted-foreground text-sm">
                        {position.requirements.map((req, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <Star className="mt-0.5 w-4 h-4 text-primary shrink-0" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Application Process */}
        <section className="mb-16">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-bold text-3xl">Application Process</h2>
            <p className="text-lg text-muted-foreground">
              Our hiring process is designed to be fair, efficient, and
              comprehensive
            </p>
          </div>
          <div className="gap-6 grid md:grid-cols-4">
            {[
              {
                step: "1",
                title: "Apply Online",
                description:
                  "Submit your application and resume through our portal",
              },
              {
                step: "2",
                title: "Initial Screening",
                description: "Phone or video call with our recruiting team",
              },
              {
                step: "3",
                title: "Technical Interview",
                description: "Meet with the hiring manager and team members",
              },
              {
                step: "4",
                title: "Final Decision",
                description: "Reference checks and offer discussion",
              },
            ].map((step, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className="flex justify-center items-center bg-primary mx-auto mb-4 rounded-full w-12 h-12 font-bold text-lg text-primary-foreground">
                    {step.step}
                  </div>
                  <h3 className="mb-2 font-semibold">{step.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <Card className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
            <CardContent className="p-12">
              <h2 className="mb-4 font-bold text-3xl">Ready to Join Us?</h2>
              <p className="opacity-90 mx-auto mb-8 max-w-2xl text-lg">
                Don't see a position that fits? We're always looking for
                talented individuals to join our team.
              </p>
              <div className="flex sm:flex-row flex-col justify-center gap-4">
                <Button size="lg" variant="outline">
                  View All Positions
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/contact-us">Send General Inquiry</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
