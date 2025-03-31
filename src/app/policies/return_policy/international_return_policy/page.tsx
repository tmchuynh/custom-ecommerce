"use client";
import { Button } from "@/components/ui/button";
import { internationalReturnPolicySections } from "@/lib/constants/informationDetails";
import { scrollToSection } from "@/lib/utils/utils";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { FaMailBulk, FaPhone } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";

/**
 * A component that displays the international return policy page.
 *
 * @component
 * @description This component renders a comprehensive international return policy page with interactive sections.
 * It includes a sticky table of contents sidebar and expandable content sections covering eligibility,
 * return process, shipping, refunds, non-returnable items, and contact information.
 *
 * @example
 * ```tsx
 * <InternationalReturnPolicyPage />
 * ```
 *
 * @returns A React component that displays the international return policy page with:
 * - A header with title and description
 * - A sticky sidebar with navigation links to different policy sections
 * - Expandable content sections with detailed policy information
 * - Contact information section with email, phone, and live chat options
 *
 * @state {string | null} activeSection - Tracks which policy section is currently active/expanded
 * @state {Record<string, HTMLElement | null>} sectionRefs - Refs for each policy section for scrolling
 *
 * @depends {@link useRouter} - Next.js router for navigation
 * @depends {@link scrollToSection} - Utility function for smooth scrolling to sections
 * @depends {@link internationalReturnPolicySections} - Configuration object for policy sections
 */
const InternationalReturnPolicyPage = () => {
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
                {internationalReturnPolicySections.map((section) => (
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
            {internationalReturnPolicySections.map((section) => (
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
                    {section.id === "eligibility" && (
                      <div>
                        <p>
                          Items must be returned within 60 days of receipt to be
                          eligible for a refund, exchange, or store credit.
                          Please ensure that all returns are made within this
                          timeframe, as any returns submitted after the 60-day
                          period may not be processed or may be subject to
                          different conditions as outlined in our return policy.
                        </p>

                        <p>
                          For a smooth return process, the products must be
                          unused and in their original, unopened packaging. We
                          cannot accept items that have been used, altered, or
                          damaged. All original accessories, documentation,
                          manuals, and packaging materials should be included
                          with the return. This ensures that the product can be
                          inspected, restocked, or resold in its original
                          condition.
                        </p>

                        <p>
                          If the returned item is not in its original condition,
                          or if any parts or accessories are missing, the return
                          may be rejected, or the item may be subject to a
                          restocking fee, or a partial refund may be issued
                          based on the condition of the product. We encourage
                          you to double-check that all items are securely
                          packaged and that no components are left out before
                          sending the product back.
                        </p>

                        <p>
                          We highly recommend that you retain your original
                          receipt and the tracking number for the return
                          shipment. This helps us verify your purchase and
                          ensure that the return is processed promptly. If there
                          is an issue with the return, having these documents on
                          hand will speed up the resolution process.
                        </p>

                        <p>
                          Returns should be shipped to the address provided on
                          your return authorization. Be sure to use a reliable
                          carrier and retain your proof of postage or tracking
                          number to ensure that the returned items are properly
                          tracked and delivered to us. Refunds or exchanges will
                          be processed once the returned items are received and
                          inspected.
                        </p>

                        <p>
                          If you have any questions about our return procedure,
                          need assistance with starting a return, or would like
                          to inquire about the status of an existing return,
                          please do not hesitate to contact our customer service
                          team. We are available via email, phone, or live chat,
                          and we will be happy to assist you with any concerns
                          or issues you may have.
                        </p>
                      </div>
                    )}
                    {section.id === "process" && (
                      <p>
                        To initiate a return, please contact our support team
                        with your order details. We will provide you with a
                        return authorization number and instructions for
                        shipping the item back to us.
                      </p>
                    )}
                    {section.id === "shipping" && (
                      <p>
                        Customers are responsible for return shipping costs. We
                        recommend using a trackable shipping service to ensure
                        the safe return of your items.
                      </p>
                    )}
                    {section.id === "refunds" && (
                      <p>
                        Once we receive and inspect your returned item, we will
                        process your refund. Refunds will be issued to the
                        original payment method within 7-10 business days.
                      </p>
                    )}
                    {section.id === "nonreturnable" && (
                      <p>
                        Certain items, such as perishable goods, personalized
                        products, or items marked as final sale, are not
                        eligible for return. Please review the product
                        description for details.
                      </p>
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

export default InternationalReturnPolicyPage;
