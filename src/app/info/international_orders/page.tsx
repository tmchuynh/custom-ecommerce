"use client";
import { Button } from "@/components/ui/button";
import { internationalOrderReturnsFAQs } from "@/lib/constants/faqs";
import { internationalOrdersSections } from "@/lib/constants/informationDetails";
import { scrollToSection } from "@/lib/utils/utils";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { FaMailBulk, FaPhone } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";

/**
 * A React component that renders the International Orders page.
 * This page provides comprehensive information about international shipping policies,
 * customs, payments, returns, language support, FAQs, and contact information.
 *
 * @component
 * @example
 * ```tsx
 * <InternationalOrdersPage />
 * ```
 *
 * @remarks
 * The component uses the following features:
 * - Sticky sidebar navigation with section highlighting
 * - Collapsible content sections
 * - Dynamic content rendering based on section IDs
 * - Smooth scrolling to sections
 *
 * @state
 * - activeSection: string | null - Tracks the currently active/expanded section
 *
 * @hooks
 * - useRef - Stores references to section elements for scrolling
 * - useRouter - Handles navigation for contact options
 *
 * @returns A responsive page layout with a navigation sidebar and expandable content sections
 * covering international order policies and information
 */
const InternationalOrdersPage = () => {
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
          <h1 className="text-5xl font-extrabold mb-4">International Orders</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Learn about our international shipping policies and payment options.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-7 gap-8">
          {/* Table of Contents Sidebar */}
          <div className="lg:col-span-2">
            <div className="sticky top-8 rounded-xl border shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">Contents</h2>
              <ul className="space-y-2">
                {internationalOrdersSections.map((section) => (
                  <li key={section.id}>
                    <button
                      onClick={() => handleScrollToSection(section.id)}
                      className={`flex items-center w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        activeSection === section.id
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-secondary hover:text-secondary-foreground"
                      }`}
                    >
                      <section.icon />
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
            {internationalOrdersSections.map((section) => (
              <div
                key={section.id}
                ref={(el) => {
                  sectionRefs.current[section.id] = el;
                }}
                className="rounded-xl border shadow-md overflow-hidden"
              >
                <button className="w-full flex items-center justify-between p-6 focus:outline-none">
                  <div className="flex items-center">
                    <section.icon />
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
                    {section.id === "shipping" && (
                      <div>
                        <p>
                          We are pleased to offer international shipping to many
                          countries around the world. Our goal is to provide
                          fast and reliable delivery options, ensuring that our
                          customers receive their orders in a timely manner.
                          However, please note that delivery times and costs
                          vary depending on the destination country and the
                          shipping method chosen.
                        </p>

                        <p>
                          Shipping costs are calculated during checkout based on
                          the shipping address and the weight of the items in
                          your order. To get an accurate estimate of delivery
                          times and costs, please enter your shipping details at
                          checkout. While we aim to provide competitive rates,
                          international shipping may take longer than domestic
                          deliveries due to customs processing and transit
                          times.
                        </p>

                        <p>
                          If you need more specific information about
                          international shipping or would like assistance with
                          selecting the best shipping option for your location,
                          feel free to contact our customer service team for
                          further guidance.
                        </p>
                      </div>
                    )}

                    {section.id === "customs" && (
                      <div>
                        <p>
                          As an international customer, you should be aware that
                          you may be subject to customs duties, taxes, and other
                          import fees imposed by your country. These charges are
                          the responsibility of the customer and are not
                          included in the cost of the product or shipping fees
                          at checkout.
                        </p>

                        <p>
                          The exact amount of customs duties or taxes varies
                          depending on the laws and regulations of the
                          destination country. We recommend contacting your
                          local customs office for more information about the
                          specific duties and taxes that may apply to your
                          order.
                        </p>

                        <p>
                          Please note that in some cases, customs procedures may
                          cause delays in the delivery of your order. We are not
                          responsible for any customs delays or charges incurred
                          during the shipping process.
                        </p>
                      </div>
                    )}

                    {section.id === "payment" && (
                      <div>
                        <p>
                          We accept a variety of payment options to make your
                          shopping experience as convenient as possible. Our
                          payment methods include major international credit
                          cards such as Visa, MasterCard, and American Express,
                          as well as PayPal, providing flexibility for customers
                          around the world.
                        </p>

                        <p>
                          For added security, all payment transactions are
                          processed through trusted and secure payment gateways
                          to protect your sensitive information. We also offer
                          currency conversion options at checkout for
                          international customers, allowing you to view and pay
                          in your preferred currency.
                        </p>

                        <p>
                          If you encounter any issues with payment processing or
                          if you have questions about the payment options
                          available in your region, our customer support team is
                          available to assist you.
                        </p>
                      </div>
                    )}

                    {section.id === "returns" && (
                      <div>
                        <p>
                          Our international returns policy allows you to return
                          items within 60 days of receipt. We strive to make
                          returns as easy as possible, but please note that the
                          customer is responsible for the return shipping costs.
                          We recommend using a reliable and trackable shipping
                          method to ensure that your return reaches us safely.
                        </p>

                        <p>
                          To initiate a return, please contact our customer
                          service team to obtain a return authorization. Returns
                          must be made in accordance with our return policy,
                          which includes ensuring that the items are in their
                          original condition and packaging. Once your return is
                          processed, we will issue a refund or exchange based on
                          your preference.
                        </p>

                        <p>
                          Unfortunately, we cannot cover the cost of return
                          shipping for international orders, and we recommend
                          that you check with your local carrier for the most
                          cost-effective shipping options for returning products
                          to us.
                        </p>
                      </div>
                    )}

                    {section.id === "language" && (
                      <div>
                        <p>
                          We are committed to providing excellent customer
                          service to our international customers. To assist with
                          this, we offer support in multiple languages. Our team
                          can help you with product inquiries, order issues, and
                          general questions in various languages.
                        </p>

                        <p>
                          If you require assistance in a language other than
                          English, please don't hesitate to contact us. Simply
                          let us know your preferred language, and we will
                          ensure that our team communicates with you effectively
                          in your chosen language.
                        </p>

                        <p>
                          For more details about the languages we support or if
                          you need help with anything specific, please reach out
                          to our customer service team, and we will be happy to
                          assist you.
                        </p>
                      </div>
                    )}

                    {section.id === "faq" && (
                      <div className="p-6 border-t">
                        <p className="mb-6">
                          Below are some of the most common questions we receive
                          from customers. If your question is not answered here,
                          please don't hesitate to reach out to us directly.
                        </p>

                        <div className="space-y-6">
                          {internationalOrderReturnsFAQs.map((faq, index) => (
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

export default InternationalOrdersPage;
