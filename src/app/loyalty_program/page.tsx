"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { perks } from "@/lib/constants";
import {
  BookOpen,
  Award,
  Star,
  Gift,
  ShoppingBag,
  CreditCard,
  TrendingUp,
  HelpCircle,
} from "lucide-react";

const LoyaltyProgram = () => {
  const [points, setPoints] = useState(0);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  const earnPoints = () => {
    setPoints(points + 100); // Example: Add 100 points on button click
  };

  const [expandedQuestions, setExpandedQuestions] = useState<{
    [key: string]: boolean;
  }>({});

  const toggleSection = (sectionId: string) => {
    setActiveSection(activeSection === sectionId ? null : sectionId);
    if (activeSection !== sectionId) {
      sectionRefs.current[sectionId]?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    sectionRefs.current[sectionId]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const sections = [
    {
      id: "introduction",
      title: "Introduction",
      icon: <BookOpen className="h-5 w-5" />,
    },
    {
      id: "how-it-works",
      title: "How It Works",
      icon: <Award className="h-5 w-5" />,
    },
    {
      id: "benefits",
      title: "Program Benefits",
      icon: <Gift className="h-5 w-5" />,
    },
    {
      id: "earning",
      title: "Earning Points",
      icon: <Star className="h-5 w-5" />,
    },
    {
      id: "redeeming",
      title: "Redeeming Points",
      icon: <ShoppingBag className="h-5 w-5" />,
    },
    {
      id: "tiers",
      title: "Membership Tiers",
      icon: <TrendingUp className="h-5 w-5" />,
    },
    {
      id: "faqs",
      title: "FAQs",
      icon: <HelpCircle className="h-5 w-5" />,
    },
  ];

  const loyaltyFaqs = [
    {
      question: "How do I join the loyalty program?",
      answer:
        "You can join by creating an account on our website or signing up during checkout.",
    },
    {
      question: "Do points expire?",
      answer:
        "Yes, points expire 12 months after they were earned if not redeemed.",
    },
    {
      question: "Can I earn points on sale items?",
      answer: "Yes, you earn points on all purchases, including sale items.",
    },
    {
      question: "How do I check my points balance?",
      answer:
        "Your points balance is visible in your account dashboard after logging in.",
    },
    {
      question: "Can I transfer my points to someone else?",
      answer:
        "No, points are non-transferable and can only be used by the account holder.",
    },
    {
      question: "What happens to my points if I return an item?",
      answer:
        "When you return an item, the points earned from that purchase will be deducted from your balance.",
    },
  ];

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

  const [expandedFaqs, setExpandedFaqs] = useState<{ [key: number]: boolean }>(
    {}
  );

  const toggleFaq = (index: number) => {
    setExpandedFaqs((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold mb-4">Loyalty Program</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Join our loyalty program and start earning points for every
            purchase!
          </p>
          <div className="mt-4 text-blue-700 py-2 px-4 rounded-full inline-flex items-center">
            <CreditCard className="h-5 w-5 mr-2" />
            <span className="font-medium">Your Current Points: {points}</span>
          </div>
        </div>

        {/* Perks Section */}
        <section aria-labelledby="perks-heading" className="mb-12">
          <h2 id="perks-heading" className="sr-only">
            Our perks
          </h2>

          <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-0">
            {perks.map((perk) => (
              <div
                key={perk.name}
                className="text-center md:flex md:items-start md:text-left lg:block lg:text-center p-6 rounded-xl shadow-md border"
              >
                <div className="md:shrink-0">
                  <div className="flow-root">
                    <Image
                      alt=""
                      src={perk.imageUrl}
                      className="mx-auto -my-1 h-24 w-auto"
                      width={96}
                      height={96}
                    />
                  </div>
                </div>
                <div className="mt-6 md:mt-0 md:ml-4 lg:mt-6 lg:ml-0">
                  <h3 className="text-xl font-semibold">{perk.name}</h3>
                  <p className="mt-3">{perk.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-8">
          {/* Table of Contents Sidebar */}
          <div className="lg:col-span-2">
            <div className="sticky top-8 rounded-xl border shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">Program Details</h2>
              <ul className="space-y-2">
                {sections.map((section) => (
                  <li key={section.id}>
                    <button
                      onClick={() => scrollToSection(section.id)}
                      className={`flex items-center w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        activeSection === section.id
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-secondary hover:text-secondary-foreground"
                      }`}
                    >
                      {section.icon}
                      <span className="ml-2 text-sm font-medium">
                        {section.title}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-6 border-t">
                <Button onClick={earnPoints} className="w-full">
                  Enroll Now
                </Button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-5 space-y-8">
            {/* Introduction */}
            <div
              ref={(el) => {
                sectionRefs.current["introduction"] = el;
              }}
              className="rounded-xl shadow-md overflow-hidden border"
            >
              <button
                onClick={() => toggleSection("introduction")}
                className="w-full flex items-center justify-between p-6 focus:outline-none"
              >
                <div className="flex items-center">
                  <BookOpen className="h-6 w-6" />
                  <h2 className="text-2xl font-semibold ml-3">Introduction</h2>
                </div>
                <svg
                  className={`w-6 h-6 transform transition-transform ${
                    activeSection === "introduction" ? "rotate-180" : ""
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
              {activeSection === "introduction" && (
                <div className="p-6 border-t">
                  <p className="mb-4">
                    Welcome to our Loyalty Rewards Program! We value your
                    business and want to thank you for your continued support
                    with exclusive benefits and rewards.
                  </p>
                  <p className="">
                    Our program is designed to enhance your shopping experience
                    by providing you with opportunities to earn points on every
                    purchase, which can be redeemed for discounts, special
                    offers, and more.
                  </p>
                </div>
              )}
            </div>

            {/* How It Works */}
            <div
              ref={(el) => {
                sectionRefs.current["how-it-works"] = el;
              }}
              className="rounded-xl shadow-md overflow-hidden border"
            >
              <button
                onClick={() => toggleSection("how-it-works")}
                className="w-full flex items-center justify-between p-6 focus:outline-none"
              >
                <div className="flex items-center">
                  <Award className="h-6 w-6" />
                  <h2 className="text-2xl font-semibold ml-3">How It Works</h2>
                </div>
                <svg
                  className={`w-6 h-6 transform transition-transform ${
                    activeSection === "how-it-works" ? "rotate-180" : ""
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
              {activeSection === "how-it-works" && (
                <div className="p-6 border-t">
                  <p className="mb-4">
                    Earn points for every purchase you make. Redeem your points
                    for discounts, exclusive offers, and more! The more you
                    shop, the more you earn!
                  </p>
                  <div className="p-4 rounded-lg space-y-4 mb-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 rounded-full p-2">
                        <Star className="h-5 w-5" />
                      </div>
                      <p className="ml-4 font-medium">
                        Earn 1 point for every $1 spent
                      </p>
                    </div>
                    <div className="flex items-center">
                      <div className="flex-shrink-0 rounded-full p-2">
                        <Gift className="h-5 w-5" />
                      </div>
                      <p className="ml-4 font-medium">
                        Redeem points for discounts
                      </p>
                    </div>
                    <div className="flex items-center">
                      <div className="flex-shrink-0 rounded-full p-2">
                        <TrendingUp className="h-5 w-5" />
                      </div>
                      <p className="ml-4 font-medium">
                        Reach higher tiers for better rewards
                      </p>
                    </div>
                  </div>
                  <p className="">
                    Simply create an account and start earning points
                    automatically with every purchase. Your points balance is
                    visible in your account dashboard.
                  </p>
                </div>
              )}
            </div>

            {/* Program Benefits */}
            <div
              ref={(el) => {
                sectionRefs.current["benefits"] = el;
              }}
              className="rounded-xl shadow-md overflow-hidden border"
            >
              <button
                onClick={() => toggleSection("benefits")}
                className="w-full flex items-center justify-between p-6 focus:outline-none"
              >
                <div className="flex items-center">
                  <Gift className="h-6 w-6" />
                  <h2 className="text-2xl font-semibold ml-3">
                    Program Benefits
                  </h2>
                </div>
                <svg
                  className={`w-6 h-6 transform transition-transform ${
                    activeSection === "benefits" ? "rotate-180" : ""
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
              {activeSection === "benefits" && (
                <div className="p-6 border-t">
                  <p className="mb-4">
                    As a loyalty member, you'll receive exclusive perks and
                    rewards! Here are some of the benefits:
                  </p>
                  <ul className="list-disc list-inside space-y-3">
                    <li>Exclusive discounts on select products</li>
                    <li>Early access to sales and new arrivals</li>
                    <li>Birthday rewards and special promotions</li>
                    <li>Free shipping on orders over $50</li>
                    <li>Member-only events and product previews</li>
                    <li>Personalized product recommendations</li>
                  </ul>
                </div>
              )}
            </div>

            {/* Earning Points */}
            <div
              ref={(el) => {
                sectionRefs.current["earning"] = el;
              }}
              className="rounded-xl shadow-md overflow-hidden border"
            >
              <button
                onClick={() => toggleSection("earning")}
                className="w-full flex items-center justify-between p-6 focus:outline-none"
              >
                <div className="flex items-center">
                  <Star className="h-6 w-6" />
                  <h2 className="text-2xl font-semibold ml-3">
                    Earning Points
                  </h2>
                </div>
                <svg
                  className={`w-6 h-6 transform transition-transform ${
                    activeSection === "earning" ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {activeSection === "earning" && (
                <div className="p-6 border-t">
                  <p className="mb-4">
                    There are multiple ways to earn points in our loyalty
                    program:
                  </p>
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg">
                      <h3 className="font-medium mb-2">Standard Purchases</h3>
                      <p className="">
                        Earn 1 point for every $1 spent on regular-priced items.
                      </p>
                    </div>
                    <div className="p-4 rounded-lg">
                      <h3 className="font-medium mb-2">Bonus Point Events</h3>
                      <p className="">
                        Throughout the year, we offer special events where you
                        can earn double or triple points on your purchases.
                      </p>
                    </div>
                    <div className="p-4 rounded-lg">
                      <h3 className="font-medium mb-2">Referrals</h3>
                      <p className="">
                        Earn 500 points for each friend you refer who makes
                        their first purchase.
                      </p>
                    </div>
                    <div className="p-4 rounded-lg">
                      <h3 className="font-medium mb-2">
                        Social Media Engagement
                      </h3>
                      <p className="">
                        Earn 100 points when you follow us on social media
                        platforms and tag us in your posts featuring our
                        products.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Redeeming Points */}
            <div
              ref={(el) => {
                sectionRefs.current["redeeming"] = el;
              }}
              className="rounded-xl shadow-md overflow-hidden border"
            >
              <button
                onClick={() => toggleSection("redeeming")}
                className="w-full flex items-center justify-between p-6 focus:outline-none"
              >
                <div className="flex items-center">
                  <ShoppingBag className="h-6 w-6" />
                  <h2 className="text-2xl font-semibold ml-3">
                    Redeeming Points
                  </h2>
                </div>
                <svg
                  className={`w-6 h-6 transform transition-transform ${
                    activeSection === "redeeming" ? "rotate-180" : ""
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
              {activeSection === "redeeming" && (
                <div className="p-6 border-t">
                  <p className="mb-4">
                    You can redeem your points for various rewards at checkout:
                  </p>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y mb-4">
                      <thead className="">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                          >
                            Points
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                          >
                            Reward
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm ">
                            500
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm ">
                            $5 off your purchase
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm ">
                            1,000
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm ">
                            $10 off your purchase
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm ">
                            2,500
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm ">
                            $25 off your purchase
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm ">
                            5,000
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm ">
                            $50 off your purchase
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm ">
                            10,000
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm ">
                            Free product (up to $100 value)
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="">
                    To redeem points, simply select the reward you want during
                    checkout. Your available points and eligible rewards will be
                    displayed in your cart.
                  </p>
                </div>
              )}
            </div>

            {/* Membership Tiers */}
            <div
              ref={(el) => {
                sectionRefs.current["tiers"] = el;
              }}
              className="rounded-xl shadow-md overflow-hidden border"
            >
              <button
                onClick={() => toggleSection("tiers")}
                className="w-full flex items-center justify-between p-6 focus:outline-none"
              >
                <div className="flex items-center">
                  <TrendingUp className="h-6 w-6" />
                  <h2 className="text-2xl font-semibold ml-3">
                    Membership Tiers
                  </h2>
                </div>
                <svg
                  className={`w-6 h-6 transform transition-transform ${
                    activeSection === "tiers" ? "rotate-180" : ""
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
              {activeSection === "tiers" && (
                <div className="p-6 border-t">
                  <p className="mb-4">
                    Our loyalty program features different tiers based on your
                    annual spending. The higher your tier, the more benefits you
                    receive:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="p-4 rounded-lg border">
                      <h3 className="font-medium mb-2 flex items-center">
                        <Star className="h-4 w-4 mr-1" />
                        Standard
                      </h3>
                      <p className="text-sm mb-2">$0 - $500 annually</p>
                      <ul className="text-sm space-y-1">
                        <li>• Basic earning rate (1 point per $1)</li>
                        <li>• Access to member-only sales</li>
                        <li>• Birthday reward</li>
                      </ul>
                    </div>
                    <div className="p-4 rounded-lg border">
                      <h3 className="font-medium mb-2 flex items-center">
                        <Star className="h-4 w-4 mr-1" />
                        <Star className="h-4 w-4 mr-1" />
                        Silver
                      </h3>
                      <p className="text-sm mb-2">$501 - $1,000 annually</p>
                      <ul className="text-sm space-y-1">
                        <li>• 1.25 points per $1 spent</li>
                        <li>• Free shipping on orders over $35</li>
                        <li>• Early access to new products</li>
                        <li>• All Standard benefits</li>
                      </ul>
                    </div>
                    <div className="p-4 rounded-lg border">
                      <h3 className="font-medium mb-2 flex items-center">
                        <Star className="h-4 w-4 mr-1" />
                        <Star className="h-4 w-4 mr-1" />
                        <Star className="h-4 w-4 mr-1" />
                        Gold
                      </h3>
                      <p className="text-sm mb-2">$1,001+ annually</p>
                      <ul className="text-sm space-y-1">
                        <li>• 1.5 points per $1 spent</li>
                        <li>• Free shipping on all orders</li>
                        <li>• Exclusive seasonal gifts</li>
                        <li>• Dedicated customer service</li>
                        <li>• All Silver benefits</li>
                      </ul>
                    </div>
                  </div>
                  <p className="">
                    Your tier is evaluated annually based on your spending
                    during the previous 12 months. Once you reach a tier, you
                    maintain that status for the remainder of the current year
                    and all of the following year.
                  </p>
                </div>
              )}
            </div>

            {/* FAQs */}
            <div
              ref={(el) => {
                sectionRefs.current["faqs"] = el;
              }}
              className="rounded-xl shadow-md overflow-hidden border"
            >
              <button
                onClick={() => toggleSection("faqs")}
                className="w-full flex items-center justify-between p-6 focus:outline-none"
              >
                <div className="flex items-center">
                  <HelpCircle className="h-6 w-6" />
                  <h2 className="text-2xl font-semibold ml-3">
                    Frequently Asked Questions
                  </h2>
                </div>
                <svg
                  className={`w-6 h-6 transform transition-transform ${
                    activeSection === "faqs" ? "rotate-180" : ""
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
              {activeSection === "faqs" && (
                <div className="p-6 border-t">
                  <div className="space-y-4">
                    {loyaltyFaqs.map((faq, index) => (
                      <div key={index} className="border-b last:border-b-0">
                        <button
                          onClick={() => toggleFaq(index)}
                          className="w-full flex items-center justify-between p-4 text-left focus:outline-none"
                        >
                          <h3 className="text-lg font-medium">
                            {faq.question}
                          </h3>
                          <svg
                            className={`w-5 h-5 transform transition-transform ${
                              expandedFaqs[index] ? "rotate-180" : ""
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
                        {expandedFaqs[index] && (
                          <div className="p-4 pt-0">
                            <p className="">{faq.answer}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoyaltyProgram;
