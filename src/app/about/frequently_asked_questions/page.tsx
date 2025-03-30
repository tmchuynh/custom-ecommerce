"use client";

import { Button } from "@/components/ui/button";
import {
  CreditCard,
  HelpCircle,
  MessageSquare,
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
          "To place an order, browse our products, select the item you'd like to purchase, and add it to your shopping cart. Once you're ready to checkout, go to your cart and follow the on-screen prompts to complete your order. You'll need to enter your shipping information and payment details, and you'll receive an order confirmation email once your order is placed.",
      },
      {
        question: "Can I modify or cancel my order after it's placed?",
        answer:
          "If you need to modify or cancel your order, please contact us as soon as possible. We process orders quickly, and once the order has been shipped, we may not be able to make changes. If your order hasn’t been shipped yet, we will do our best to accommodate your request. For assistance, please reach out to our customer support team immediately.",
      },
      {
        question: "Do I need an account to make a purchase?",
        answer:
          "You can check out as a guest, but creating an account allows you to track your orders, save your shipping information for faster checkout, and take advantage of our loyalty rewards program. An account also enables you to manage your personal details and preferences more easily.",
      },
      {
        question: "Can I place an order over the phone?",
        answer:
          "At this time, we only accept online orders through our website. However, our customer support team is available to help guide you through the online ordering process if you need assistance.",
      },
      {
        question: "Can I change my shipping address after placing an order?",
        answer:
          "If you need to change your shipping address, please contact us as soon as possible. If the order has not yet been processed or shipped, we may be able to update the shipping address. Once the order is shipped, we cannot make any changes to the address.",
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
          "We accept all major credit cards, including Visa, MasterCard, and American Express, as well as PayPal, Apple Pay, and Google Pay. All payments are securely processed to ensure your personal and financial information is kept safe.",
      },
      {
        question: "How do I apply a discount code?",
        answer:
          "During checkout, you will see an option to enter a promo code. Simply type or paste the code into the provided field and click 'Apply'. The discount will be reflected in your order total. Please ensure the promo code is entered correctly and that it’s valid for the items in your cart. Some codes may have terms and conditions, such as minimum purchase requirements or expiration dates.",
      },
      {
        question: "Do you charge sales tax?",
        answer:
          "Yes, sales tax is applied based on the shipping address provided during checkout. The exact amount will be calculated and displayed before you finalize your order. Sales tax is determined by state and local regulations and may vary depending on your location.",
      },
      {
        question: "Can I use multiple discount codes on one order?",
        answer:
          "Unfortunately, only one discount code can be applied per order. If you have multiple codes, you will need to choose the one that provides the best discount. Keep an eye out for our special promotions that allow you to stack discounts on select items.",
      },
      {
        question: "Do you offer gift cards?",
        answer:
          "Yes, we offer digital gift cards in various denominations. You can purchase a gift card on our website and send it to a recipient via email. The gift card can be used to make purchases on our site just like any other payment method.",
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
          "You can track your order by entering your tracking number on our 'Track Order' page. Once your order ships, you will receive a tracking email with the carrier and tracking number details. You can use these details to follow your shipment's progress and estimated delivery date.",
      },
      {
        question: "How long will shipping take?",
        answer:
          "Standard shipping typically takes 3-7 business days, depending on your location. For faster delivery, we offer express shipping options that usually take 1-3 business days. Delivery times may vary based on the shipping method and your location, and we will provide estimated delivery dates at checkout.",
      },
      {
        question: "Do you offer international shipping?",
        answer:
          "Yes! We offer international shipping to select countries. Shipping costs and delivery times vary depending on your location. During checkout, you will be able to see the shipping options and the estimated delivery time for your country. Please note that international orders may be subject to customs duties and taxes, which are the responsibility of the customer.",
      },
      {
        question: "Can I change my shipping address after placing my order?",
        answer:
          "If you need to change the shipping address, please contact us immediately. We can update the shipping address if the order has not yet been processed or shipped. Unfortunately, once the order is shipped, we cannot change the shipping address.",
      },
      {
        question: "Do you offer expedited shipping options?",
        answer:
          "Yes, we offer expedited shipping options such as 2-day and next-day delivery for select regions. These options are available at checkout and vary by your location. The shipping fee will be calculated based on your shipping address and selected method.",
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
          "Yes, we offer a 30-day return policy for most items. To return an item, it must be in its original condition and packaging. Some items, such as sale or clearance products, may not be eligible for return. For full details, please refer to our Return Policy page.",
      },
      {
        question: "How do I start a return?",
        answer:
          "To start a return, log into your account and navigate to your order history. Select the order that contains the item(s) you wish to return and follow the on-screen instructions to initiate the return. If you need help, our customer support team is available to guide you through the process.",
      },
      {
        question: "How long do refunds take to process?",
        answer:
          "Refunds are processed within 3-5 business days after we receive and inspect the returned item(s). Once your refund is processed, the funds will typically appear in your account within 5-10 business days, depending on your payment method and financial institution.",
      },
      {
        question: "Can I exchange an item instead of returning it?",
        answer:
          "We currently do not offer direct exchanges. If you wish to exchange an item, please return it and place a new order for the replacement item. This allows you to select the correct size, color, or style.",
      },
      {
        question: "Do I have to pay for return shipping?",
        answer:
          "If the return is due to an error on our part (e.g., damaged or incorrect item), we will cover the return shipping costs. For all other returns, customers are responsible for the return shipping fees. We recommend using a trackable shipping service for returns to ensure the item arrives safely.",
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
          "To create an account, click the 'Sign Up' button located in the top right corner of our website. Enter your email address, create a password, and follow the prompts to complete the registration. Once your account is created, you'll have access to personalized recommendations, order tracking, and more.",
      },
      {
        question: "How do you protect my personal information?",
        answer:
          "We take your privacy seriously and use industry-standard encryption and security measures to protect your personal information. For more details on how we safeguard your data, please read our Privacy Policy.",
      },
      {
        question: "I forgot my password. How do I reset it?",
        answer:
          "If you’ve forgotten your password, click on 'Login' and then select 'Forgot Password'. Enter your email address, and we’ll send you instructions to reset your password. Make sure to check your spam or junk folder if you don't see the email in your inbox.",
      },
      {
        question: "How do I update my account information?",
        answer:
          "To update your account information, log into your account, go to your profile settings, and make the necessary changes. You can update your contact details, address, and other preferences. If you need assistance, please contact our customer service team.",
      },
      {
        question: "How do I delete my account?",
        answer:
          "If you wish to delete your account, please contact our customer support team. We can assist you with deactivating your account and removing your personal information from our systems. Please note that once your account is deleted, it cannot be restored.",
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
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            Find answers to common questions about our products, services, and
            policies.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-7 gap-8">
          {/* Table of Contents Sidebar */}
          <div className="lg:col-span-2">
            <div className="sticky top-8 rounded-xl border shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">Content</h2>
              <ul className="space-y-2">
                {faqCategories.map((category) => (
                  <li key={category.id}>
                    <button
                      onClick={() => scrollToSection(category.id)}
                      className={`flex items-center w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        activeCategory === category.id
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-secondary hover:text-secondary-foreground"
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

              <div className="mt-8 p-4 bg-muted rounded-lg space-y-2">
                <h3 className="font-medium flex items-center">
                  <HelpCircle className="h-4 w-4 mr-2" />
                  Need More Help?
                </h3>
                <p className="text-sm">
                  Can't find what you're looking for? Our customer service team
                  is available to assist you.
                </p>
                <div className="mt-4 flex flex-col space-y-2">
                  <Link href="/customer_service" className="w-full">
                    <Button className="w-full">
                      <MessageSquare className="h-4 w-4 mr-2" /> Contact Support
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Main FAQ Content */}
          <div className="lg:col-span-5 space-y-8">
            {faqCategories.map((category) => (
              <div
                key={category.id}
                ref={(el) => {
                  sectionRefs.current[category.id] = el;
                }}
                className="rounded-xl shadow-md overflow-hidden border"
              >
                <div className="w-full flex items-center justify-between p-6">
                  <div className="flex items-center">
                    {category.icon}
                    <h2 className="text-2xl font-semibold ml-3">
                      {category.title}
                    </h2>
                  </div>
                </div>
                <div className="border-t">
                  {category.questions.map((faq, index) => (
                    <div key={index} className="border-b last:border-b-0">
                      <button
                        onClick={() => toggleQuestion(category.id, index)}
                        className="w-full flex items-center justify-between p-4 text-left focus:outline-none"
                      >
                        <h3 className="text-lg font-medium">{faq.question}</h3>
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
                        <div className="p-4 pt-0">
                          <p className="">{faq.answer}</p>
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
    </div>
  );
};

export default FAQPage;
