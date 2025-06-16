"use client";

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
  AlertCircle,
  Calendar,
  CheckCircle,
  CreditCard,
  FileText,
  Package,
  RefreshCw,
  Shield,
  Truck,
  User,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function ReturnsExchangesPage() {
  const [returnForm, setReturnForm] = useState({
    orderNumber: "",
    email: "",
    returnReason: "",
    itemCondition: "",
    comments: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setReturnForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string) => (value: string) => {
    setReturnForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle return request submission
    console.log("Return request:", returnForm);
    alert("Return request submitted successfully!");
  };

  const returnReasons = [
    { value: "wrong-size", label: "Wrong Size/Fit" },
    { value: "wrong-color", label: "Wrong Color/Style" },
    { value: "defective", label: "Defective/Damaged" },
    { value: "not-as-described", label: "Not as Described" },
    { value: "quality-issues", label: "Quality Issues" },
    { value: "changed-mind", label: "Changed Mind" },
    { value: "other", label: "Other" },
  ];

  const itemConditions = [
    { value: "new-unused", label: "New/Unused with Tags" },
    { value: "like-new", label: "Like New (no tags)" },
    { value: "gently-used", label: "Gently Used" },
    { value: "damaged", label: "Damaged/Defective" },
  ];

  const returnSteps = [
    {
      step: 1,
      title: "Submit Request",
      description: "Fill out the return form with your order details",
      icon: <FileText className="w-6 h-6" />,
      status: "active",
    },
    {
      step: 2,
      title: "Review & Approval",
      description: "We'll review your request within 24 hours",
      icon: <CheckCircle className="w-6 h-6" />,
      status: "pending",
    },
    {
      step: 3,
      title: "Ship Items Back",
      description: "Print return label and ship items back to us",
      icon: <Package className="w-6 h-6" />,
      status: "pending",
    },
    {
      step: 4,
      title: "Refund Processing",
      description: "Refund processed within 5-7 business days",
      icon: <CreditCard className="w-6 h-6" />,
      status: "pending",
    },
  ];

  const policies = [
    {
      title: "30-Day Return Window",
      description: "Items can be returned within 30 days of delivery",
      icon: <Calendar className="w-5 h-5" />,
    },
    {
      title: "Original Condition",
      description: "Items must be in original condition with tags attached",
      icon: <Package className="w-5 h-5" />,
    },
    {
      title: "Free Return Shipping",
      description: "We provide prepaid return labels for most returns",
      icon: <Truck className="w-5 h-5" />,
    },
    {
      title: "Full Refund",
      description: "Receive full refund to original payment method",
      icon: <CreditCard className="w-5 h-5" />,
    },
  ];

  const faqItems = [
    {
      question: "How long does the return process take?",
      answer:
        "Once we receive your returned item, we typically process refunds within 5-7 business days. You'll receive an email confirmation when your refund has been processed.",
    },
    {
      question: "Can I exchange an item instead of returning it?",
      answer:
        "Yes! You can request an exchange for a different size or color. Simply select 'Exchange' when filling out the return form and specify your preferred replacement.",
    },
    {
      question: "What items cannot be returned?",
      answer:
        "Final sale items, personalized/custom items, intimate apparel, and items damaged by normal wear cannot be returned. Gift cards are also non-refundable.",
    },
    {
      question: "Do I have to pay for return shipping?",
      answer:
        "For most returns, we provide free prepaid return labels. However, if you're returning an item due to a change of mind, standard return shipping fees may apply.",
    },
    {
      question: "Can I return items purchased with a discount or promo code?",
      answer:
        "Yes, but the refund amount will reflect the actual amount paid after discounts. Promo codes cannot be reused on future orders.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="py-16">
        <div className="mx-auto px-6 lg:px-8 max-w-7xl">
          <div className="max-w-3xl">
            <h1 className="mb-4 font-bold text-4xl md:text-5xl">
              Returns & Exchanges
            </h1>
            <p className="opacity-90 text-lg">
              Easy returns and exchanges with our hassle-free policy. Get your
              money back or exchange for the perfect fit.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl">
        {/* Return Process Steps */}
        <section className="mb-16">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-bold text-3xl">How Returns Work</h2>
            <p className="text-lg text-muted-foreground">
              Simple 4-step process to get your refund or exchange
            </p>
          </div>
          <div className="gap-6 grid md:grid-cols-2 lg:grid-cols-4">
            {returnSteps.map((step) => (
              <Card key={step.step} className="text-center">
                <CardContent className="p-6">
                  <Badge className="flex justify-center items-center mx-auto mb-4 rounded-full w-12 h-12">
                    {step.icon}
                  </Badge>
                  <div className="mb-2 font-semibold text-sm">
                    Step {step.step}
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

        {/* Return Policies */}
        <section className="mb-16">
          <div className="mb-8 text-center">
            <h2 className="mb-4 font-bold text-3xl">Return Policy</h2>
            <p className="text-lg text-muted-foreground">
              Know what to expect with our customer-friendly policies
            </p>
          </div>
          <div className="gap-6 grid sm:grid-cols-2 lg:grid-cols-4">
            {policies.map((policy, index) => (
              <Card key={index}>
                <CardContent className="p-6 text-center">
                  <Badge className="flex justify-center items-center mx-auto mb-4 rounded-full w-12 h-12">
                    {policy.icon}
                  </Badge>
                  <h3 className="mb-2 font-semibold text-sm">{policy.title}</h3>
                  <p className="text-muted-foreground text-xs">
                    {policy.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Return Form and Quick Actions */}
        <section className="mb-16">
          <div className="gap-8 grid lg:grid-cols-2">
            {/* Return Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <RefreshCw className="w-5 h-5" />
                  Submit Return Request
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="orderNumber">Order Number *</Label>
                    <Input
                      id="orderNumber"
                      name="orderNumber"
                      value={returnForm.orderNumber}
                      onChange={handleInputChange}
                      placeholder="e.g., ORD-123456"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={returnForm.email}
                      onChange={handleInputChange}
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="returnReason">Reason for Return *</Label>
                    <Select
                      value={returnForm.returnReason}
                      onValueChange={handleSelectChange("returnReason")}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a reason" />
                      </SelectTrigger>
                      <SelectContent>
                        {returnReasons.map((reason) => (
                          <SelectItem key={reason.value} value={reason.value}>
                            {reason.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="itemCondition">Item Condition *</Label>
                    <Select
                      value={returnForm.itemCondition}
                      onValueChange={handleSelectChange("itemCondition")}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                      <SelectContent>
                        {itemConditions.map((condition) => (
                          <SelectItem
                            key={condition.value}
                            value={condition.value}
                          >
                            {condition.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="comments">Additional Comments</Label>
                    <Textarea
                      id="comments"
                      name="comments"
                      value={returnForm.comments}
                      onChange={handleInputChange}
                      placeholder="Any additional details about your return..."
                      rows={4}
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    Submit Return Request
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Need Help?
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 border rounded-lg">
                    <h4 className="mb-2 font-medium text-sm">
                      Track Your Return
                    </h4>
                    <p className="mb-3 text-muted-foreground text-xs">
                      Check the status of your existing return requests
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      asChild
                    >
                      <Link href="/track-order">Track Return</Link>
                    </Button>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="mb-2 font-medium text-sm">
                      Contact Support
                    </h4>
                    <p className="mb-3 text-muted-foreground text-xs">
                      Get personalized help with your return
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      asChild
                    >
                      <Link href="/contact-us">Contact Us</Link>
                    </Button>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="mb-2 font-medium text-sm">Return Center</h4>
                    <p className="mb-3 text-muted-foreground text-xs">
                      Manage all your returns in one place
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      asChild
                    >
                      <Link href="/orders">View Orders</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <Shield className="mt-0.5 w-5 h-5 text-primary" />
                    <div>
                      <h4 className="mb-2 font-semibold text-sm">
                        Return Guarantee
                      </h4>
                      <p className="text-muted-foreground text-xs">
                        We stand behind our products. If you're not completely
                        satisfied, we'll make it right with a full refund or
                        exchange.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section>
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-bold text-3xl">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground">
              Quick answers to common return questions
            </p>
          </div>
          <div className="gap-6 grid md:grid-cols-2">
            {faqItems.map((faq, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-start gap-2 text-base">
                    <AlertCircle className="mt-0.5 w-5 h-5 text-primary shrink-0" />
                    {faq.question}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
