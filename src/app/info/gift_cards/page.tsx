"use client";
import { Button } from "@/components/ui/button";
import { giftCardFAQs } from "@/lib/constants/faqs";
import { giftCardsSections } from "@/lib/constants/informationDetails";
import { scrollToSection } from "@/lib/utils/utils";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { FaMailBulk, FaPhone } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";

/**
 * A React component that renders a comprehensive gift cards information page.
 *
 * @component
 * @description This component displays detailed information about gift cards including
 * sections for overview, usage instructions, limitations, e-gift vs physical cards,
 * sending options, FAQs and contact information. It features:
 * - A sticky table of contents sidebar for easy navigation
 * - Expandable/collapsible content sections
 * - Interactive buttons for section navigation
 * - Comprehensive FAQ section with common questions and answers
 * - Contact information with multiple support channels
 *
 * @example
 * ```tsx
 * <GiftCardsPage />
 * ```
 *
 * @returns {JSX.Element} A responsive page layout with gift card information sections
 *
 * @see {@link giftCardsSections} for section content configuration
 * @see {@link giftCardFAQs} for FAQ content configuration
 *
 * @state {string | null} activeSection - Tracks which content section is currently active/expanded
 * @state {React.RefObject} sectionRefs - Stores references to section DOM elements for scrolling
 */
const GiftCardsPage = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});
  const router = useRouter();

  const handleScrollToSection = (sectionId: string) => {
    scrollToSection(sectionId, sectionRefs, setActiveSection);
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold mb-4">Gift Cards</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Learn more about our gift cards and how to use them.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-7 gap-8">
          {/* Table of Contents Sidebar */}
          <div className="lg:col-span-2">
            <div className="sticky top-18 rounded-xl border shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">Contents</h2>
              <ul className="space-y-2">
                {giftCardsSections.map((section) => (
                  <li key={section.id}>
                    <button
                      onClick={() => handleScrollToSection(section.id)}
                      className={`flex items-center w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        activeSection === section.id
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-secondary hover:text-secondary-foreground"
                      }`}
                    >
                      <section.icon className="h-6 w-6" />
                      <span className="ml-2 text-sm font-medium">
                        {section.title}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-5 space-y-8">
            {giftCardsSections.map((section) => (
              <div
                key={section.id}
                ref={(el) => {
                  sectionRefs.current[section.id] = el;
                }}
                className="rounded-xl border shadow-md overflow-hidden"
              >
                <button className="w-full flex items-center justify-between p-6 focus:outline-none">
                  <div className="flex items-center">
                    <section.icon className="h-6 w-6" />
                    <h2 className="text-2xl font-semibold ml-3">
                      {section.title}
                    </h2>
                  </div>
                  <svg
                    className={`w-6 h-6 transform transition-transform ${
                      activeSection === section.id ? "rotate-180" : ""
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
                {activeSection === section.id && (
                  <div className="p-6 border-t">
                    {section.id === "overview" && (
                      <div>
                        <p>
                          Our gift cards are the perfect way to give the gift of
                          choice. They provide incredible flexibility, allowing
                          the recipient to handpick their favorite items from
                          our store. This makes our gift cards an ideal option
                          for any occasion—whether it’s a birthday, anniversary,
                          holiday, or simply as a thoughtful gesture to show
                          appreciation to someone special.
                        </p>

                        <p>
                          Gift cards can be used to purchase any product
                          available in our online store, including discounted
                          sale items and exclusive clearance offers. This means
                          that the recipient can select from a wide variety of
                          products, from the latest arrivals to one-of-a-kind
                          exclusive items that may not be available in physical
                          stores. Whether they prefer trendy new collections or
                          timeless classics, the choice is entirely theirs.
                        </p>

                        <p>
                          We offer our gift cards in a variety of denominations,
                          making it easy to choose the perfect amount based on
                          your budget and the recipient's preferences. Whether
                          you’re gifting a small token of appreciation or a
                          larger, more generous present, we have a range of
                          values to suit every occasion and recipient.
                        </p>

                        <p>
                          If you have any questions about how to purchase,
                          redeem, or troubleshoot issues with a gift card, our
                          dedicated customer service team is always available to
                          help. You can reach us via email, phone, or live chat,
                          and we will be happy to assist you with any inquiries
                          or concerns you may have.
                        </p>
                      </div>
                    )}

                    {section.id === "how_to_use" && (
                      <div>
                        <p>
                          The balance on the gift card can be used across
                          multiple transactions, giving the recipient the
                          flexibility to shop at their own pace. This means that
                          they can make partial purchases and use the remaining
                          balance for future orders. If there is any leftover
                          balance on the card, it will stay on the card for
                          future use until the full amount is used up. What's
                          more, our gift cards do not have expiration dates, so
                          there’s no rush to use the entire balance right
                          away—allowing for a more thoughtful shopping
                          experience over time.
                        </p>

                        <p>
                          Redeeming your gift card is easy—just enter the unique
                          code provided during the checkout process on our
                          website. The value of the card will be applied to your
                          total purchase, and any remaining balance will be
                          stored for future use.
                        </p>
                      </div>
                    )}

                    {section.id === "limitations" && (
                      <p>
                        Gift cards cannot be purchased for amounts exceeding
                        $500. Additionally, please note that gift cards cannot
                        be redeemed for cash unless required by law. This is in
                        accordance with our company policy and applicable
                        financial regulations. We encourage customers to review
                        their gift card purchase carefully to ensure that the
                        correct amount is chosen based on their intended gift
                        value.
                      </p>
                    )}

                    {section.id === "e_vs_physical" && (
                      <div>
                        <p>
                          We offer two convenient options for gifting: e-gift
                          cards, which are delivered electronically via email,
                          and physical gift cards, which are sent through the
                          mail to the address of your choice. Both options
                          provide an easy and thoughtful way to give a gift
                          that’s guaranteed to be appreciated.
                        </p>

                        <p>
                          E-gift cards are delivered almost instantly via email,
                          making them an ideal choice for last-minute gifts or
                          digital-only options. They are a perfect fit for
                          occasions where speed and convenience are important.
                          On the other hand, physical gift cards are a tangible,
                          traditional option that can be delivered directly to
                          the recipient’s address or to yours, allowing for a
                          more personal and physical gift-giving experience.
                        </p>

                        <p>
                          The process of purchasing a gift card is quick and
                          simple. You can buy either an e-gift card or a
                          physical gift card online, and once the order is
                          processed, it will be sent out according to your
                          preferred delivery method. Whether you opt for email
                          delivery or postal mail, the gift card will be sent
                          promptly, ensuring your gift reaches the recipient
                          without unnecessary delays.
                        </p>

                        <p>
                          Sending a gift card to a friend is straightforward.
                          For e-gift cards, simply provide the recipient's email
                          address during checkout. For physical gift cards,
                          provide their shipping address. You can also send it
                          directly to yourself and gift it in person if you
                          prefer. Either way, it's a quick and easy way to show
                          you care.
                        </p>
                      </div>
                    )}

                    {section.id === "send_to_friend" && (
                      <p>
                        Sending a gift card to a friend is simple and
                        hassle-free. All you need to do is enter the recipient's
                        email address for e-gift cards or their shipping address
                        for physical gift cards during the checkout process.
                        Once the purchase is complete, your gift will be on its
                        way, allowing you to brighten someone's day with just a
                        few clicks.
                      </p>
                    )}

                    {section.id === "faq" && (
                      <div className="p-6 border-t">
                        <p className="mb-6">
                          Below are some of the most common questions we receive
                          from customers. If your question is not answered here,
                          please don't hesitate to reach out to us directly.
                        </p>

                        <div className="space-y-6">
                          {giftCardFAQs.map((faq, index) => (
                            <div key={index} className="p-4 rounded-lg">
                              <h3 className="text-lg font-medium mb-2 flex items-start">
                                <span className="mr-2">Q:</span>
                                {faq.question}
                              </h3>
                              <div className="ml-6">
                                {typeof faq.answer === "string" ? (
                                  <p>{faq.answer}</p>
                                ) : (
                                  faq.answer
                                )}
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="mt-6 flex justify-center">
                          <Button
                            onClick={() => handleScrollToSection("contact")}
                          >
                            Still have questions? Contact us
                          </Button>
                        </div>
                      </div>
                    )}

                    {section.id === "contact" && (
                      <div className="p-6">
                        <div className="space-y-6">
                          <div className="flex items-start">
                            <FaMailBulk className="h-6 w-6 mt-1 mr-4 flex-shrink-0" />
                            <div>
                              <h3 className="text-lg font-medium mb-2">
                                Email Support
                              </h3>
                              <p className="mb-2">
                                For general inquiries, product questions, or
                                issues with your order, please contact us at:
                              </p>
                              <Button
                                variant={"link"}
                                onClick={() =>
                                  router.push("mailto:support@yourcompany.com")
                                }
                                className="p-0 h-auto font-medium"
                              >
                                support@yourcompany.com
                              </Button>
                              <p className="text-sm mt-1">
                                We typically respond to emails within 24-48
                                hours during business days.
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start">
                            <FaPhone className="h-6 w-6 mt-1 mr-4 flex-shrink-0" />
                            <div>
                              <h3 className="text-lg font-medium mb-2">
                                Phone Support
                              </h3>
                              <p className="mb-2">
                                Our customer service team is available to take
                                your call at:
                              </p>
                              <a
                                href="tel:+15551234567"
                                className="font-medium"
                              >
                                +1 (555) 123-4567
                              </a>
                              <p className="text-sm mt-1">
                                Please check our business hours below for
                                availability.
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start">
                            <FaMessage className="h-6 w-6 mt-1 mr-4 flex-shrink-0" />
                            <div>
                              <h3 className="text-lg font-medium mb-2">
                                Live Chat
                              </h3>
                              <p className="mb-2">
                                If you'd prefer to chat with a representative in
                                real-time, you can reach us using the live chat
                                feature on our website.
                              </p>
                              <Button>Start Live Chat</Button>
                              <p className="text-sm mt-1">
                                Live chat is available during business hours
                                only.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GiftCardsPage;
