"use client";

import { Button } from "@/components/ui/button";
import {
  CreditCard,
  HelpCircle,
  Mail,
  MessageSquare,
  Phone,
  RefreshCw,
  ShoppingBag,
  Truck,
  User,
} from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";

const faqCategories = [
  {
    id: "ordering",
    title: "Ordering",
    icon: <ShoppingBag className="h-5 w-5" />,
    questions: [
      {
        question: "How do I place an order?",
        answer:
          "To place an order, browse our products, select the item you'd like to purchase, and add it to your cart. Once you're ready, go to your cart and follow the checkout process.",
      },
      {
        question: "Can I modify or cancel my order after it's placed?",
        answer:
          "If you need to change or cancel your order, please contact us as soon as possible. Once your order has been shipped, we may not be able to make changes.",
      },
      {
        question: "Do I need an account to make a purchase?",
        answer:
          "While you can check out as a guest, creating an account allows you to track your orders, save your shipping information, and take advantage of our loyalty program.",
      },
    ],
  },
  {
    id: "payment",
    title: "Payment & Pricing",
    icon: <CreditCard className="h-5 w-5" />,
    questions: [
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept all major credit cards, PayPal, Apple Pay, and Google Pay for secure payments.",
      },
      {
        question: "How do I apply a discount code?",
        answer:
          "During checkout, there will be an option to enter a promo code. Simply enter the code, and the discount will be applied to your order total.",
      },
      {
        question: "Do you charge sales tax?",
        answer:
          "Yes, sales tax is applied according to state and local regulations. The exact amount will be calculated during checkout based on your shipping address.",
      },
    ],
  },
  {
    id: "shipping",
    title: "Shipping & Delivery",
    icon: <Truck className="h-5 w-5" />,
    questions: [
      {
        question: "How can I track my order?",
        answer:
          "You can track your order by entering your tracking number on our 'Track Order' page. You will receive an email with your tracking details once your order ships.",
      },
      {
        question: "How long will shipping take?",
        answer:
          "Standard shipping typically takes 3-7 business days. Express shipping takes 1-3 business days, depending on your location.",
      },
      {
        question: "Do you offer international shipping?",
        answer:
          "Yes! We offer international shipping to most countries. Shipping costs and delivery times will vary depending on your location.",
      },
    ],
  },
  {
    id: "returns",
    title: "Returns & Refunds",
    icon: <RefreshCw className="h-5 w-5" />,
    questions: [
      {
        question: "Can I return an item?",
        answer:
          "Yes, we offer a 30-day return policy. You can return items that are in original condition and packaging for a full refund or exchange.",
      },
      {
        question: "How do I start a return?",
        answer:
          "To initiate a return, log into your account, go to your order history, select the order with the item you wish to return, and follow the return instructions. You can also contact our customer support team for assistance.",
      },
      {
        question: "How long do refunds take to process?",
        answer:
          "Once we receive your returned item, we'll inspect it and process your refund within 3-5 business days. It may take an additional 5-10 business days for the funds to appear in your account, depending on your payment method.",
      },
    ],
  },
  {
    id: "account",
    title: "Account & Privacy",
    icon: <User className="h-5 w-5" />,
    questions: [
      {
        question: "How do I create an account?",
        answer:
          "You can create an account by clicking the 'Sign Up' button in the top right corner of our website. You'll need to provide your email address and create a password.",
      },
      {
        question: "How do you protect my personal information?",
        answer:
          "We use industry-standard encryption and security measures to protect your data. For more information, please see our Privacy Policy.",
      },
      {
        question: "I forgot my password. How do I reset it?",
        answer:
          "Click on 'Login' and then select 'Forgot password'. Enter your email address, and we'll send you instructions to reset your password.",
      },
    ],
  },
  {
    id: "support",
    title: "Customer Support",
    icon: <MessageSquare className="h-5 w-5" />,
    questions: [
      {
        question: "How do I contact customer support?",
        answer:
          "If you need assistance, please visit our 'Customer Service' page for contact details, including email and phone support.",
      },
      {
        question: "What are your customer service hours?",
        answer:
          "Our customer service team is available Monday through Friday from 9:00 AM to 6:00 PM EST, and Saturday from 10:00 AM to 4:00 PM EST.",
      },
      {
        question: "Do you offer size guidance for clothing items?",
        answer:
          "Yes, each product page includes a size chart. If you need additional assistance, our customer service team can help with sizing recommendations.",
      },
    ],
  },
];

const FAQPage = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(
    "ordering"
  );
  const [expandedQuestions, setExpandedQuestions] = useState<{
    [key: string]: boolean;
  }>({});
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  const scrollToSection = (sectionId: string) => {
    setActiveCategory(sectionId);
    sectionRefs.current[sectionId]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const toggleQuestion = (categoryId: string, questionIndex: number) => {
    const key = `${categoryId}-${questionIndex}`;
    setExpandedQuestions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const isQuestionExpanded = (categoryId: string, questionIndex: number) => {
    const key = `${categoryId}-${questionIndex}`;
    return expandedQuestions[key] || false;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-800 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our products, services, and
            policies.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Table of Contents Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-800">
                FAQ Categories
              </h2>
              <ul className="space-y-2">
                {faqCategories.map((category) => (
                  <li key={category.id}>
                    <button
                      onClick={() => scrollToSection(category.id)}
                      className={`flex items-center w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        activeCategory === category.id
                          ? "bg-blue-100 text-blue-700"
                          : "hover:bg-gray-100 text-gray-700"
                      }`}
                    >
                      {category.icon}
                      <span className="ml-2 text-sm font-medium">
                        {category.title}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>

              <div className="mt-8 bg-blue-50 p-4 rounded-lg space-y-2">
                <h3 className="font-medium text-blue-800 flex items-center">
                  <HelpCircle className="h-4 w-4 mr-2" />
                  Need More Help?
                </h3>
                <p className="text-sm text-gray-700">
                  Can't find what you're looking for? Our customer service team
                  is available to assist you.
                </p>
                <div className="mt-4 flex flex-col space-y-2">
                  <Link href="/customer_service" className="w-full">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                      <MessageSquare className="h-4 w-4 mr-2" /> Contact Support
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Main FAQ Content */}
          <div className="lg:col-span-3 space-y-8">
            {faqCategories.map((category) => (
              <div
                key={category.id}
                ref={(el) => {
                  sectionRefs.current[category.id] = el;
                }}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <div className="w-full flex items-center justify-between p-6 bg-white">
                  <div className="flex items-center">
                    {category.icon}
                    <h2 className="text-2xl font-semibold ml-3 text-gray-800">
                      {category.title}
                    </h2>
                  </div>
                </div>
                <div className="border-t border-gray-200">
                  {category.questions.map((faq, index) => (
                    <div
                      key={index}
                      className="border-b border-gray-100 last:border-b-0"
                    >
                      <button
                        onClick={() => toggleQuestion(category.id, index)}
                        className="w-full flex items-center justify-between p-4 text-left focus:outline-none"
                      >
                        <h3 className="text-lg font-medium text-gray-800">
                          {faq.question}
                        </h3>
                        <svg
                          className={`w-5 h-5 transform transition-transform ${
                            isQuestionExpanded(category.id, index)
                              ? "rotate-180"
                              : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                      {isQuestionExpanded(category.id, index) && (
                        <div className="p-4 pt-0 bg-gray-50">
                          <p className="text-gray-700">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fixed Contact Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-md p-4 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <p className="text-sm text-gray-600">
            Can't find what you're looking for? We're here to help.
          </p>
          <div className="flex space-x-3">
            <a
              href="mailto:support@yourcompany.com"
              className="inline-flex items-center bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-md"
            >
              <Mail className="h-4 w-4 mr-2" /> Email Us
            </a>
            <a
              href="tel:+15551234567"
              className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
            >
              <Phone className="h-4 w-4 mr-2" /> Call Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
