"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Clock,
  Globe,
  Headphones,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  Shield,
  Users,
} from "lucide-react";
import { useState } from "react";

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      category: "",
      message: "",
    });
    alert("Thank you for your message! We'll get back to you soon.");
  };

  const contactMethods = [
    {
      icon: <Phone className="w-8 h-8 text-blue-500" />,
      title: "Phone Support",
      description: "Speak directly with our support team",
      contact: "+1 (555) 123-4567",
      availability: "Mon-Fri, 9AM-6PM EST",
    },
    {
      icon: <Mail className="w-8 h-8 text-green-500" />,
      title: "Email Support",
      description: "Send us a message anytime",
      contact: "support@ecommerce.com",
      availability: "24/7 - Response within 24 hours",
    },
    {
      icon: <MessageCircle className="w-8 h-8 text-purple-500" />,
      title: "Live Chat",
      description: "Get instant help through chat",
      contact: "Available on website",
      availability: "Mon-Fri, 8AM-8PM EST",
    },
    {
      icon: <Headphones className="w-8 h-8 text-orange-500" />,
      title: "Premium Support",
      description: "Priority support for members",
      contact: "members@ecommerce.com",
      availability: "24/7 for premium members",
    },
  ];

  const officeLocations = [
    {
      city: "San Francisco",
      address: "123 Market Street, Suite 400\nSan Francisco, CA 94105",
      phone: "+1 (555) 123-4567",
      isHeadquarters: true,
    },
    {
      city: "New York",
      address: "456 Broadway, Floor 20\nNew York, NY 10013",
      phone: "+1 (555) 234-5678",
      isHeadquarters: false,
    },
    {
      city: "Austin",
      address: "789 Congress Ave, Building 2\nAustin, TX 78701",
      phone: "+1 (555) 345-6789",
      isHeadquarters: false,
    },
  ];

  const faqCategories = [
    {
      title: "Orders & Shipping",
      description: "Questions about your orders, shipping, and delivery",
      icon: <Globe className="w-6 h-6" />,
    },
    {
      title: "Account & Membership",
      description: "Help with your account settings and membership benefits",
      icon: <Users className="w-6 h-6" />,
    },
    {
      title: "Returns & Refunds",
      description: "Information about returns, exchanges, and refunds",
      icon: <Shield className="w-6 h-6" />,
    },
    {
      title: "Technical Support",
      description: "Website issues and technical troubleshooting",
      icon: <Headphones className="w-6 h-6" />,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary to-primary/80 py-20 text-primary-foreground">
        <div className="mx-auto px-6 lg:px-8 max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="bg-white/20 mb-4 border-white/30 text-white">
              Get in Touch
            </Badge>
            <h1 className="mb-6 font-bold text-4xl md:text-6xl">
              We're Here to Help
            </h1>
            <p className="opacity-90 mb-8 text-lg md:text-xl">
              Have questions, feedback, or need assistance? Our friendly support
              team is ready to help you with anything you need.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto px-6 lg:px-8 py-16 max-w-7xl">
        {/* Contact Methods */}
        <section className="mb-16">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-bold text-3xl">Contact Methods</h2>
            <p className="text-lg text-muted-foreground">
              Choose the way that works best for you
            </p>
          </div>
          <div className="gap-6 grid md:grid-cols-2 lg:grid-cols-4">
            {contactMethods.map((method, index) => (
              <Card
                key={index}
                className="hover:shadow-md text-center transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">{method.icon}</div>
                  <h3 className="mb-2 font-semibold text-lg">{method.title}</h3>
                  <p className="mb-3 text-muted-foreground text-sm">
                    {method.description}
                  </p>
                  <div className="space-y-1">
                    <p className="font-medium text-sm">{method.contact}</p>
                    <p className="text-muted-foreground text-xs">
                      {method.availability}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Contact Form and Quick Help */}
        <section className="mb-16">
          <div className="gap-8 grid lg:grid-cols-2">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Send className="w-5 h-5" />
                  Send Us a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="gap-4 grid sm:grid-cols-2">
                    <div>
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="category">Category</Label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="flex bg-background px-3 py-2 border border-input rounded-md focus-visible:ring-2 focus-visible:ring-ring ring-offset-background focus-visible:ring-offset-2 w-full h-10 text-sm placeholder:text-muted-foreground focus-visible:outline-none"
                    >
                      <option value="">Select a category</option>
                      <option value="orders">Orders & Shipping</option>
                      <option value="account">Account & Membership</option>
                      <option value="returns">Returns & Refunds</option>
                      <option value="technical">Technical Support</option>
                      <option value="general">General Inquiry</option>
                      <option value="feedback">Feedback</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      placeholder="Brief description of your inquiry"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      placeholder="Please provide details about your inquiry..."
                      rows={6}
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    <Send className="mr-2 w-4 h-4" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Quick Help */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Help</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {faqCategories.map((category, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 hover:bg-muted/50 p-3 border rounded-lg transition-colors cursor-pointer"
                    >
                      <div className="flex justify-center items-center bg-primary/10 rounded-lg w-10 h-10">
                        {category.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">
                          {category.title}
                        </h4>
                        <p className="text-muted-foreground text-xs">
                          {category.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Support Hours
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-sm">Phone Support</span>
                    <span className="font-medium text-sm">
                      Mon-Fri, 9AM-6PM EST
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-sm">Live Chat</span>
                    <span className="font-medium text-sm">
                      Mon-Fri, 8AM-8PM EST
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-sm">Email Support</span>
                    <span className="font-medium text-sm">24/7</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm">Premium Support</span>
                    <span className="font-medium text-sm">
                      24/7 for Members
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Office Locations */}
        <section className="mb-16">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-bold text-3xl">Our Offices</h2>
            <p className="text-lg text-muted-foreground">
              Visit us at one of our locations
            </p>
          </div>
          <div className="gap-6 grid md:grid-cols-3">
            {officeLocations.map((office, index) => (
              <Card key={index} className="relative">
                {office.isHeadquarters && (
                  <Badge className="top-4 right-4 absolute">Headquarters</Badge>
                )}
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    {office.city}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-muted-foreground text-sm whitespace-pre-line">
                      {office.address}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{office.phone}</span>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    Get Directions
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Emergency Contact */}
        <section>
          <Card className="bg-gradient-to-r from-red-50 dark:from-red-950/20 to-orange-50 dark:to-orange-950/20 border-red-200 dark:border-red-800">
            <CardContent className="p-8 text-center">
              <Shield className="mx-auto mb-4 w-12 h-12 text-red-500" />
              <h2 className="mb-4 font-bold text-2xl">Emergency Support</h2>
              <p className="mb-6 text-muted-foreground">
                For urgent issues outside business hours, please contact our
                emergency support line.
              </p>
              <div className="flex sm:flex-row flex-col justify-center gap-4">
                <Button variant="destructive" size="lg">
                  <Phone className="mr-2 w-4 h-4" />
                  Emergency: +1 (555) 999-0000
                </Button>
                <Button variant="outline" size="lg">
                  <Mail className="mr-2 w-4 h-4" />
                  urgent@ecommerce.com
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
