"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  sanitizeContactForm,
  validateContactField,
  validateContactForm,
  type ContactFormData,
  type ContactValidationError,
} from "@/lib/utils/contact";
import {
  AlertCircle,
  CheckCircle,
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
import { useCallback, useState } from "react";

export default function ContactUsPage() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    category: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<keyof ContactFormData, string>>({
    name: "",
    email: "",
    subject: "",
    category: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  // Real-time field validation
  const validateField = useCallback(
    (field: keyof ContactFormData, value: string) => {
      const error = validateContactField(field, value, formData);
      setErrors((prev) => ({
        ...prev,
        [field]: error || "",
      }));
      return !error;
    },
    [formData]
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const fieldName = name as keyof ContactFormData;

    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));

    // Validate field on blur or after user stops typing
    setTimeout(() => validateField(fieldName, value), 300);
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      category: value,
    }));
    validateField("category", value);
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    validateField(name as keyof ContactFormData, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    // Comprehensive form validation
    const validation = validateContactForm(formData);

    if (!validation.isValid) {
      // Set all validation errors
      const newErrors: Record<keyof ContactFormData, string> = {
        name: "",
        email: "",
        subject: "",
        category: "",
        message: "",
      };

      validation.errors.forEach((error: ContactValidationError) => {
        newErrors[error.field] = error.message;
      });

      setErrors(newErrors);
      setIsSubmitting(false);
      setSubmitStatus("error");
      return;
    }

    try {
      // Sanitize form data before submission
      const sanitizedData = sanitizeContactForm(formData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Form submitted:", sanitizedData);

      // Reset form on success
      setFormData({
        name: "",
        email: "",
        subject: "",
        category: "",
        message: "",
      });

      setErrors({
        name: "",
        email: "",
        subject: "",
        category: "",
        message: "",
      });

      setSubmitStatus("success");
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
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
      <section className="relative pt-20">
        <div className="mx-auto px-6 lg:px-8 max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-4">Get in Touch</Badge>
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
                {/* Form Status Messages */}
                {submitStatus === "success" && (
                  <Alert className="bg-green-50 dark:bg-green-950/20 mb-6 border-green-200">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <AlertDescription className="text-green-800 dark:text-green-200">
                      Thank you for your message! We'll get back to you within
                      24 hours.
                    </AlertDescription>
                  </Alert>
                )}

                {submitStatus === "error" && (
                  <Alert className="bg-red-50 dark:bg-red-950/20 mb-6 border-red-200">
                    <AlertCircle className="w-4 h-4 text-red-600" />
                    <AlertDescription className="text-red-800 dark:text-red-200">
                      Please fix the errors below and try again.
                    </AlertDescription>
                  </Alert>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="gap-4 grid sm:grid-cols-2">
                    <div>
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        required
                        placeholder="Your full name"
                        className={errors.name ? "border-red-500" : ""}
                      />
                      {errors.name && (
                        <p className="mt-1 text-red-600 text-sm">
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        required
                        placeholder="your.email@example.com"
                        className={errors.email ? "border-red-500" : ""}
                      />
                      {errors.email && (
                        <p className="mt-1 text-red-600 text-sm">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <Select
                      value={formData.category}
                      onValueChange={handleSelectChange}
                      required
                      name="category"
                    >
                      <SelectTrigger
                        className={`mt-2 ${
                          errors.category ? "border-red-500" : ""
                        }`}
                      >
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="orders">
                          Orders & Shipping
                        </SelectItem>
                        <SelectItem value="account">
                          Account & Membership
                        </SelectItem>
                        <SelectItem value="returns">
                          Returns & Refunds
                        </SelectItem>
                        <SelectItem value="technical">
                          Technical Support
                        </SelectItem>
                        <SelectItem value="general">General Inquiry</SelectItem>
                        <SelectItem value="feedback">Feedback</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.category && (
                      <p className="mt-1 text-red-600 text-sm">
                        {errors.category}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      required
                      placeholder="Brief description of your inquiry"
                      className={errors.subject ? "border-red-500" : ""}
                    />
                    {errors.subject && (
                      <p className="mt-1 text-red-600 text-sm">
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      required
                      placeholder="Please provide details about your inquiry..."
                      rows={6}
                      className={errors.message ? "border-red-500" : ""}
                    />
                    <div className="flex justify-between items-center mt-1">
                      {errors.message ? (
                        <p className="text-red-600 text-sm">{errors.message}</p>
                      ) : (
                        <p className="text-muted-foreground text-sm">
                          {formData.message.length}/5000 characters
                        </p>
                      )}
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="mr-2 border-2 border-white border-t-transparent rounded-full w-4 h-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 w-4 h-4" />
                        Send Message
                      </>
                    )}
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
                <CardContent>
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
