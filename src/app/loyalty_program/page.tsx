"use client";
import { Button } from "@/components/ui/button";
import { perks } from "@/lib/constants/constants";
import { loyaltyFaqs } from "@/lib/constants/faqs";
import { loyalty_program_sections } from "@/lib/constants/informationDetails";
import { scrollToSection, toggleAccordionSection } from "@/lib/utils";
import Image from "next/image";
import { useRef, useState } from "react";
import { FaRegCreditCard, FaShoppingBag } from "react-icons/fa";
import { FaAward, FaBookOpen, FaGift, FaStar } from "react-icons/fa6";
import { IoIosHelpCircleOutline, IoIosTrendingUp } from "react-icons/io";

/**
 * A comprehensive loyalty program component that displays membership details, points system, and program benefits.
 *
 * @component
 * @example
 * ```tsx
 * <LoyaltyProgram />
 * ```
 *
 * @remarks
 * This component manages a loyalty program interface with the following features:
 * - Points tracking and management
 * - Collapsible loyalty_program_sections for program details
 * - Table of contents navigation
 * - Program tiers and benefits explanation
 * - FAQ section with expandable answers
 *
 * @returns A complex layout containing:
 * - Current points display
 * - Program perks section
 * - Sidebar navigation
 * - Detailed loyalty_program_sections including:
 *   - Introduction
 *   - How It Works
 *   - Program Benefits
 *   - Earning Points
 *   - Redeeming Points
 *   - Membership Tiers
 *   - FAQs
 *
 * @state
 * - points: number - Tracks the user's current point balance
 * - activeSection: string | null - Controls which section is currently expanded
 * - expandedFaqs: { [key: number]: boolean } - Tracks which FAQ items are expanded
 *
 * @hooks
 * - useRef - For section references and scroll functionality
 * - useState - For managing component state
 */
const LoyaltyProgram = () => {
  const [points, setPoints] = useState(0);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  const earnPoints = () => {
    setPoints(points + 100); // Example: Add 100 points on button click
  };

  const toggleSection = (sectionId: string) => {
    toggleAccordionSection(
      sectionId,
      activeSection,
      setActiveSection,
      sectionRefs.current[sectionId]
    );
  };

  const handleScrollToSection = (sectionId: string) => {
    scrollToSection(sectionId, sectionRefs, setActiveSection);
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
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-7xl">
        <div className="mb-12 text-center">
          <h1 className="mb-4 font-extrabold text-5xl">Loyalty Program</h1>
          <p className="mx-auto max-w-2xl text-xl">
            Join our loyalty program and start earning points for every
            purchase!
          </p>
          <div className="inline-flex items-center mt-4 px-4 py-2 rounded-full text-blue-700">
            <FaRegCreditCard className="mr-2 w-5 h-5" />
            <strong>Your Current Points: {points}</strong>
          </div>
        </div>

        {/* Perks Section */}
        <section aria-labelledby="perks-heading" className="mb-12">
          <h2 id="perks-heading" className="sr-only">
            Our perks
          </h2>

          <div className="gap-y-12 sm:gap-x-6 lg:gap-x-8 lg:gap-y-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {perks.map((perk) => (
              <div
                key={perk.name}
                className="lg:block md:flex md:items-start shadow-md p-6 border rounded-xl text-center md:text-left lg:text-center"
              >
                <div className="md:shrink-0">
                  <div className="flow-root">
                    <Image
                      alt=""
                      src={perk.imageUrl}
                      className="mx-auto -my-1 w-auto h-24"
                      width={96}
                      height={96}
                    />
                  </div>
                </div>
                <div className="mt-6 md:mt-0 lg:mt-6 md:ml-4 lg:ml-0">
                  <h3 className="font-semibold text-xl">{perk.name}</h3>
                  <p className="mt-3">{perk.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        <div className="gap-8 grid grid-cols-1 lg:grid-cols-7">
          {/* Table of Contents Sidebar */}
          <div className="lg:col-span-2">
            <div className="top-18 sticky shadow-md p-6 border rounded-xl">
              <h2 className="mb-4 font-bold text-xl">Program Details</h2>
              <ul className="space-y-2">
                {loyalty_program_sections.map((section) => (
                  <li key={section.id}>
                    <button
                      onClick={() => handleScrollToSection(section.id)}
                      className={`flex items-center w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        activeSection === section.id
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-secondary hover:text-secondary-foreground"
                      }`}
                    >
                      <section.icon className="w-6 h-6" />
                      <span className="ml-2 font-medium text-sm">
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
          <div className="space-y-8 lg:col-span-5">
            {/* Introduction */}
            <div
              ref={(el) => {
                sectionRefs.current["introduction"] = el;
              }}
              className="shadow-md border rounded-xl overflow-hidden"
            >
              <button
                onClick={() => toggleSection("introduction")}
                className="flex justify-between items-center p-6 w-full focus:outline-none"
              >
                <div className="flex items-center">
                  <FaBookOpen className="w-6 h-6" />
                  <h2 className="ml-3 font-semibold text-2xl">Introduction</h2>
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
                    Welcome to our Loyalty Rewards Program! We truly value your
                    business and are excited to thank you for your continued
                    support with exclusive benefits and rewards. As a member of
                    our program, you will enjoy special perks designed to
                    enhance your shopping experience and make every purchase
                    even more rewarding.
                  </p>
                  <p>
                    Our program is designed to provide you with valuable
                    opportunities to earn points with every purchase you make.
                    These points can be redeemed for a variety of rewards,
                    including discounts on future purchases, access to exclusive
                    special offers, early notifications about sales or
                    promotions, and even free gifts or personalized rewards
                    tailored to your preferences. The more you shop, the more
                    you earn—giving you the chance to save more and enjoy
                    additional perks with each purchase.
                  </p>
                </div>
              )}
            </div>

            {/* How It Works */}
            <div
              ref={(el) => {
                sectionRefs.current["how-it-works"] = el;
              }}
              className="shadow-md border rounded-xl overflow-hidden"
            >
              <button
                onClick={() => toggleSection("how-it-works")}
                className="flex justify-between items-center p-6 w-full focus:outline-none"
              >
                <div className="flex items-center">
                  <FaAward className="w-6 h-6" />
                  <h2 className="ml-3 font-semibold text-2xl">How It Works</h2>
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
                    Earn points with every purchase you make and unlock
                    exclusive rewards, discounts, and offers! The more you shop,
                    the more points you earn, bringing you closer to even
                    greater perks and savings. It’s our way of saying thank you
                    for choosing us. Here’s how it works:
                  </p>
                  <div className="space-y-4 mb-4 p-4 rounded-lg">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 p-2 rounded-full">
                        <FaStar className="w-5 h-5" />
                      </div>
                      <p className="ml-4 font-medium">
                        Earn <strong>1 point</strong> for every{" "}
                        <strong>$1</strong> spent on eligible purchases.
                      </p>
                    </div>
                    <div className="flex items-center">
                      <div className="flex-shrink-0 p-2 rounded-full">
                        <FaGift className="w-5 h-5" />
                      </div>
                      <p className="ml-4 font-medium">
                        Redeem your accumulated points for discounts, exclusive
                        offers, and special promotions.
                      </p>
                    </div>
                    <div className="flex items-center">
                      <div className="flex-shrink-0 p-2 rounded-full">
                        <IoIosTrendingUp className="w-5 h-5" />
                      </div>
                      <p className="ml-4 font-medium">
                        Reach higher tiers in the program for even better
                        rewards, such as early access to sales, personalized
                        offers, or additional discounts.
                      </p>
                    </div>
                  </div>
                  <p>
                    Simply create an account, and you'll start earning points
                    automatically with every purchase you make. Your points
                    balance will be updated in real time and is always visible
                    in your account dashboard, so you can easily track your
                    progress towards the next reward. Plus, with each purchase,
                    you'll unlock new opportunities to redeem your points for
                    even more savings.
                  </p>
                </div>
              )}
            </div>

            {/* Program Benefits */}
            <div
              ref={(el) => {
                sectionRefs.current["benefits"] = el;
              }}
              className="shadow-md border rounded-xl overflow-hidden"
            >
              <button
                onClick={() => toggleSection("benefits")}
                className="flex justify-between items-center p-6 w-full focus:outline-none"
              >
                <div className="flex items-center">
                  <FaGift className="w-6 h-6" />
                  <h2 className="ml-3 font-semibold text-2xl">
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
                    As a valued loyalty member, you'll receive a variety of
                    exclusive perks and rewards that are designed to enhance
                    your shopping experience and give you more value with every
                    purchase. Here are some of the amazing benefits you’ll enjoy
                    as part of our Loyalty Rewards Program:
                  </p>
                  <ul className="space-y-3 mx-5 list-disc list-outside">
                    <li>
                      <strong>Exclusive discounts on select products:</strong>{" "}
                      Enjoy special discounts on a curated selection of
                      products, available only to loyalty members. These
                      discounts provide you with the opportunity to save more on
                      your favorite items.
                    </li>
                    <li>
                      <strong>Early access to sales and new arrivals:</strong>{" "}
                      Be the first to know about upcoming sales, promotions, and
                      new product releases. Get early access to the best deals
                      and secure your favorite items before they sell out.
                    </li>
                    <li>
                      <strong>Birthday rewards and special promotions:</strong>{" "}
                      Celebrate your special day with a birthday reward! As a
                      loyalty member, you’ll receive exclusive birthday gifts
                      and promotions as a token of appreciation for being a part
                      of our community.
                    </li>
                    <li>
                      <strong>Free shipping on orders over $50:</strong> Enjoy
                      free standard shipping on all orders over $50 as a loyalty
                      member. It’s our way of making sure you save on delivery
                      costs while enjoying a seamless shopping experience.
                    </li>
                    <li>
                      <strong>Member-only events and product previews:</strong>{" "}
                      Gain access to exclusive member-only events, product
                      launches, and previews. You’ll be the first to see our new
                      collections and participate in special events designed
                      just for you.
                    </li>
                    <li>
                      <strong>Personalized product recommendations:</strong>{" "}
                      Based on your shopping history and preferences, we’ll
                      provide tailored product recommendations to make your
                      shopping experience even more enjoyable and convenient.
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Earning Points */}
            <div
              ref={(el) => {
                sectionRefs.current["earning"] = el;
              }}
              className="shadow-md border rounded-xl overflow-hidden"
            >
              <button
                onClick={() => toggleSection("earning")}
                className="flex justify-between items-center p-6 w-full focus:outline-none"
              >
                <div className="flex items-center">
                  <FaStar className="w-6 h-6" />
                  <h2 className="ml-3 font-semibold text-2xl">
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
                    program, allowing you to accumulate rewards faster and enjoy
                    even more benefits. Here are the key ways you can start
                    earning points:
                  </p>
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg">
                      <h3 className="mb-2 font-medium">Standard Purchases</h3>
                      <p>
                        Earn <strong>1 point</strong> for every{" "}
                        <strong>$1</strong> spent on regular-priced items. The
                        more you shop, the more points you earn! These points
                        can then be redeemed for discounts, special offers, and
                        more.
                      </p>
                    </div>
                    <div className="p-4 rounded-lg">
                      <h3 className="mb-2 font-medium">Bonus Point Events</h3>
                      <p>
                        Throughout the year, we host special events where you
                        can earn <strong>double</strong> or even{" "}
                        <strong>triple points</strong> on your purchases. Be
                        sure to check our website and subscribe to our
                        newsletter so you never miss an opportunity to earn
                        extra points during these events!
                      </p>
                    </div>
                    <div className="p-4 rounded-lg">
                      <h3 className="mb-2 font-medium">Referrals</h3>
                      <p>
                        Earn <strong>500 points</strong> for each friend you
                        refer who makes their first purchase. The more friends
                        you refer, the more points you collect. It’s a win-win –
                        your friends get to enjoy our products, and you get
                        rewarded for spreading the word!
                      </p>
                    </div>
                    <div className="p-4 rounded-lg">
                      <h3 className="mb-2 font-medium">
                        Social Media Engagement
                      </h3>
                      <p>
                        Earn <strong>100 points</strong> when you follow us on
                        social media platforms like Instagram, Facebook, or
                        Twitter. Plus, tag us in your posts featuring our
                        products, and you’ll earn even more points. Show off
                        your favorite products, and we’ll reward you for it!
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
              className="shadow-md border rounded-xl overflow-hidden"
            >
              <button
                onClick={() => toggleSection("redeeming")}
                className="flex justify-between items-center p-6 w-full focus:outline-none"
              >
                <div className="flex items-center">
                  <FaShoppingBag className="w-6 h-6" />
                  <h2 className="ml-3 font-semibold text-2xl">
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
                    You can redeem your loyalty points for a variety of rewards
                    at checkout! The more points you accumulate, the better the
                    rewards you can claim. Below are some of the rewards you can
                    unlock by using your points:
                  </p>
                  <div className="overflow-x-auto">
                    <table className="mb-4 divide-y min-w-full">
                      <thead>
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 font-medium text-left text-xs uppercase tracking-wider"
                          >
                            Points
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 font-medium text-left text-xs uppercase tracking-wider"
                          >
                            Reward
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        <tr>
                          <td className="px-6 py-4 text-sm whitespace-nowrap">
                            500
                          </td>
                          <td className="px-6 py-4 text-sm whitespace-nowrap">
                            $5 off your purchase
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 text-sm whitespace-nowrap">
                            1,000
                          </td>
                          <td className="px-6 py-4 text-sm whitespace-nowrap">
                            $10 off your purchase
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 text-sm whitespace-nowrap">
                            2,500
                          </td>
                          <td className="px-6 py-4 text-sm whitespace-nowrap">
                            $25 off your purchase
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 text-sm whitespace-nowrap">
                            5,000
                          </td>
                          <td className="px-6 py-4 text-sm whitespace-nowrap">
                            $50 off your purchase
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 text-sm whitespace-nowrap">
                            10,000
                          </td>
                          <td className="px-6 py-4 text-sm whitespace-nowrap">
                            Free product (up to $100 value)
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p>
                    To redeem your points, simply select the reward you'd like
                    to use during checkout. When you add items to your cart,
                    your available points and eligible rewards will be
                    displayed, allowing you to easily choose the one you want to
                    apply. The points will be automatically deducted from your
                    total, and the corresponding discount or free product will
                    be applied to your order. It’s a simple and rewarding way to
                    save as you shop!
                  </p>
                </div>
              )}
            </div>

            {/* Membership Tiers */}
            <div
              ref={(el) => {
                sectionRefs.current["tiers"] = el;
              }}
              className="shadow-md border rounded-xl overflow-hidden"
            >
              <button
                onClick={() => toggleSection("tiers")}
                className="flex justify-between items-center p-6 w-full focus:outline-none"
              >
                <div className="flex items-center">
                  <IoIosTrendingUp className="w-6 h-6" />
                  <h2 className="ml-3 font-semibold text-2xl">
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
                    annual spending. The higher your tier, the more exclusive
                    benefits you’ll receive, including better rewards, faster
                    point accumulation, and special perks. Here's a breakdown of
                    the tiers and their associated benefits:
                  </p>
                  <div className="gap-4 grid grid-cols-1 md:grid-cols-3 mb-4">
                    <div className="p-4 border rounded-lg">
                      <h3 className="flex items-center mb-2 font-medium">
                        <FaStar className="mr-1 w-4 h-4" />
                        Standard
                      </h3>
                      <p className="mb-2 text-sm">$0 - $500 annually</p>
                      <ul className="space-y-1 text-sm">
                        <li>Basic earning rate (1 point per $1 spent)</li>
                        <li>Access to member-only sales and promotions</li>
                        <li>Birthday reward to celebrate your special day</li>
                      </ul>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h3 className="flex items-center mb-2 font-medium">
                        <FaStar className="mr-1 w-4 h-4" />
                        <FaStar className="mr-1 w-4 h-4" />
                        Silver
                      </h3>
                      <p className="mb-2 text-sm">$501 - $1,000 annually</p>
                      <ul className="space-y-1 text-sm">
                        <li>Earn 1.25 points per $1 spent</li>
                        <li>Free shipping on orders over $35</li>
                        <li>Early access to new product releases</li>
                        <li>All Standard benefits, plus extra rewards</li>
                      </ul>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h3 className="flex items-center mb-2 font-medium">
                        <FaStar className="mr-1 w-4 h-4" />
                        <FaStar className="mr-1 w-4 h-4" />
                        <FaStar className="mr-1 w-4 h-4" />
                        Gold
                      </h3>
                      <p className="mb-2 text-sm">$1,001+ annually</p>
                      <ul className="space-y-1 text-sm">
                        <li>Earn 1.5 points per $1 spent</li>
                        <li>Free shipping on all orders, no minimum</li>
                        <li>Exclusive seasonal gifts as a thank you</li>
                        <li>
                          Dedicated customer service for a personalized
                          experience
                        </li>
                        <li>All Silver benefits, plus additional VIP perks</li>
                      </ul>
                    </div>
                  </div>
                  <p>
                    Your tier is evaluated annually based on your spending
                    during the previous 12 months. Once you achieve a tier,
                    you’ll maintain that status for the remainder of the current
                    year and the entire following year, ensuring you get the
                    most value for your loyalty. As you continue to shop and
                    earn more points, you can move up to higher tiers for even
                    better rewards and benefits.
                  </p>
                </div>
              )}
            </div>

            {/* FAQs */}
            <div
              ref={(el) => {
                sectionRefs.current["faqs"] = el;
              }}
              className="shadow-md border rounded-xl overflow-hidden"
            >
              <button
                onClick={() => toggleSection("faqs")}
                className="flex justify-between items-center p-6 w-full focus:outline-none"
              >
                <div className="flex items-center">
                  <IoIosHelpCircleOutline className="w-6 h-6" />
                  <h2 className="ml-3 font-semibold text-2xl">
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
                          className="flex justify-between items-center p-4 w-full text-left focus:outline-none"
                        >
                          <h3 className="font-medium text-lg">
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
                            <p>{faq.answer}</p>
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
