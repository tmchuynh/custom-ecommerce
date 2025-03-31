"use client";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";

import { terms_and_conditions_sections } from "@/lib/constants/informationDetails";
import { scrollToSection, toggleAccordionSection } from "@/lib/utils/utils";
import { FaBookOpen, FaMailBulk, FaPhone } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { useRouter } from "next/navigation";

/**
 * A comprehensive Terms and Conditions page component that displays legal information in an accordion format.
 *
 * @component
 * @description
 * This component renders a responsive Terms and Conditions page with the following features:
 * - A sticky table of contents sidebar for easy navigation
 * - Collapsible terms_and_conditions_sections with icons for different legal topics
 * - Interactive accordion functionality for showing/hiding content
 * - Smooth scrolling to selected terms_and_conditions_sections
 * - Responsive layout that adapts to different screen sizes
 *
 * The component uses:
 * - useState to manage the active accordion section
 * - useRef to store references to section elements
 * - Custom scroll and toggle functions for navigation
 * - Lucide icons for visual elements
 *
 * @example
 * ```tsx
 * <TermsAndConditions />
 * ```
 *
 * @returns A React component that renders the Terms and Conditions page with
 * multiple terms_and_conditions_sections including Introduction, Use of Site, Account Registration,
 * Product Information, and more.
 */
const TermsAndConditions = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});
  const router = useRouter();

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

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold mb-4">Terms and Conditions</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Please read these Terms and Conditions carefully before using our
            website or making a purchase.
          </p>
          <p className="text-sm mt-2">Last Updated: June 10, 2023</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-7 gap-8">
          {/* Table of Contents Sidebar */}
          <div className="lg:col-span-2">
            <div className="sticky top-8 rounded-xl border shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">Contents</h2>
              <ul className="space-y-2">
                {terms_and_conditions_sections.map((section) => (
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
            {/* Introduction */}
            <div
              ref={(el) => {
                sectionRefs.current["introduction"] = el;
              }}
              className="border text-muted-foreground rounded-xl shadow-md overflow-hidden"
            >
              <button
                onClick={() => toggleSection("introduction")}
                className="w-full flex items-center justify-between p-6 focus:outline-none"
              >
                <div className="flex items-center">
                  <FaBookOpen className="h-6 w-6 dark:text-foreground text-secondary" />
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
                  <p>
                    These Terms and Conditions ("Terms", "Terms and Conditions")
                    govern your use of our website ("Site"), the services we
                    provide, and any purchases you make through the Site. By
                    accessing, browsing, or using our Site, and by making any
                    purchases or engaging with our services, you agree to comply
                    with these Terms in full. These Terms serve as a binding
                    agreement between you and our company. If you do not agree
                    with any part of these Terms or if you are not authorized to
                    comply with them, you should not access or use our Site or
                    services. We encourage you to read these Terms carefully
                    before proceeding with any interactions on our Site.
                  </p>
                </div>
              )}
            </div>

            {/* Render all other terms_and_conditions_sections similarly */}
            {terms_and_conditions_sections.slice(1).map((section) => (
              <div
                key={section.id}
                ref={(el) => {
                  sectionRefs.current[section.id] = el;
                }}
                className="rounded-xl border shadow-md overflow-hidden"
              >
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full flex items-center justify-between p-6 focus:outline-none"
                >
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
                    {section.id === "use" && (
                      <>
                        <p className="mb-4">
                          You may use our Site only for lawful purposes and in a
                          manner consistent with these Terms and Conditions. By
                          accessing or using our Site, you agree to comply with
                          all applicable laws, regulations, and guidelines. Your
                          use of the Site should not interfere with the rights
                          of others or disrupt the operation or security of the
                          Site itself.
                        </p>
                        <ul className="list-disc list-outside mx-5 space-y-2">
                          <li>
                            You agree not to engage in any fraudulent, unlawful,
                            or harmful activities, including but not limited to
                            identity theft, scams, or any actions intended to
                            deceive others or disrupt the operation of the Site.
                            This includes attempting to bypass security measures
                            or unauthorized access to our system.
                          </li>
                          <li>
                            You agree not to violate any applicable local,
                            state, national, or international laws while using
                            the Site. This includes but is not limited to
                            respecting copyright laws, data protection laws, and
                            any other relevant legal frameworks.
                          </li>
                          <li>
                            You agree not to interfere with the proper
                            functioning of the Site or its security features.
                            This includes actions such as uploading malware,
                            attempting to bypass security measures, or engaging
                            in any activity that could negatively impact the
                            Site’s performance or availability.
                          </li>
                          <li>
                            You agree not to upload, post, or transmit any
                            content that is harmful, discriminatory, offensive,
                            or infringes upon others’ rights. This includes
                            content that is obscene, defamatory, harassing, or
                            violates privacy or intellectual property rights.
                          </li>
                        </ul>
                      </>
                    )}

                    {section.id === "product" && (
                      <>
                        <p className="mb-4">
                          We strive to ensure that product information,
                          including descriptions, prices, availability, and
                          images, are accurate and up-to-date. However, due to
                          the dynamic nature of our inventory and external
                          factors, we cannot guarantee the absolute accuracy or
                          reliability of this information. Discrepancies may
                          occur due to typographical errors, pricing updates, or
                          changes in product availability. Prices are subject to
                          change without notice, and we reserve the right to
                          adjust prices at any time.
                        </p>
                        <ul className="list-disc list-outside mx-5 space-y-2">
                          <li>
                            We reserve the right to modify or discontinue any
                            product or service offered on our website without
                            prior notice. This includes changes in product
                            specifications, availability, or pricing. While we
                            strive to maintain a wide range of products, some
                            items may be discontinued or temporarily out of
                            stock.
                          </li>
                          <li>
                            If a product is incorrectly priced on our website,
                            we will notify you as soon as we are aware of the
                            error. We will offer you the option to either cancel
                            your order or proceed with the corrected price. We
                            aim to resolve any pricing discrepancies promptly
                            and fairly, ensuring transparency in your shopping
                            experience.
                          </li>
                        </ul>
                      </>
                    )}

                    {section.id === "order" && (
                      <>
                        <p className="mb-4">
                          Once you place an order on our Site, you will receive
                          an order confirmation email detailing your purchase.
                          Please review the order details carefully to ensure
                          that all information is correct, including items,
                          quantities, and shipping details. If you notice any
                          discrepancies or issues, please contact us promptly. A
                          contract between you and us will only be formed when
                          the order is dispatched for shipping. Until then, we
                          reserve the right to modify or cancel the order if
                          necessary.
                        </p>
                        <p>
                          You can track your orders through{" "}
                          <a href="/customer_service/track_order">
                            Order Tracking
                          </a>
                        </p>
                        <ul className="list-disc list-outside mx-5 space-y-2">
                          <li>
                            We reserve the right to reject or cancel any order
                            due to issues such as product availability, pricing
                            errors, or suspected fraudulent activity. If your
                            order is canceled, we will notify you promptly and
                            provide an explanation.
                          </li>
                          <li>
                            In some cases, we may need to request additional
                            information from you to process your order, such as
                            proof of identity or billing address verification.
                            This helps ensure that the transaction is legitimate
                            and secure.
                          </li>
                          <li>
                            If we cancel your order for any reason, you will
                            receive a full refund to your original payment
                            method. Please note that it may take a few business
                            days for the refund to appear in your account,
                            depending on your bank or payment provider.
                          </li>
                        </ul>
                      </>
                    )}

                    {section.id === "payments" && (
                      <>
                        <p className="mb-4">
                          We accept various payment methods, including
                          credit/debit cards, PayPal, and other secure payment
                          providers, offering flexibility and convenience during
                          checkout. All payments will be processed securely
                          using encryption technology to protect your financial
                          data. We do not store sensitive payment details,
                          ensuring that your personal and financial information
                          remains secure.
                        </p>
                        <p>
                          For full details on Payment Security or Privacy
                          Policy, including any exclusions or restrictions,
                          please refer to our{" "}
                          <a
                            href="/policies/payment_security"
                            className="text-blue-600 hover:underline"
                          >
                            Payment Security
                          </a>{" "}
                          and{" "}
                          <a
                            href="/policies/privacy_policy"
                            className="text-blue-600 hover:underline"
                          >
                            Privacy Policy
                          </a>{" "}
                          for all necessary information.
                        </p>
                        <ul className="list-disc list-outside mx-5 space-y-2">
                          <li>
                            By providing your payment information, you authorize
                            us to charge the full amount of your order,
                            including taxes, shipping fees, and any applicable
                            discounts.
                          </li>
                          <li>
                            For security reasons, we may verify your payment
                            details before processing your order. This
                            verification helps prevent fraud and ensures the
                            accuracy of your payment information.
                          </li>
                          <li>
                            If a payment is declined for any reason, we will
                            notify you via email or on-site messaging. Your
                            order will not be processed or shipped until a valid
                            payment method is provided. You will have the
                            opportunity to update your payment information and
                            complete the transaction.
                          </li>
                        </ul>
                      </>
                    )}

                    {section.id === "shipping" && (
                      <>
                        <p className="mb-4">
                          We offer shipping within [Country/Region] and
                          internationally, providing convenient delivery options
                          for our customers worldwide. Shipping costs and
                          delivery times may vary depending on factors such as
                          your location, items purchased, and the shipping
                          method selected during checkout. Delivery times are
                          estimates and may be subject to delays due to factors
                          outside of our control.
                        </p>
                        <ul className="list-disc list-outside mx-5 space-y-2">
                          <li>
                            We are not responsible for delays caused by
                            third-party carriers, customs processing, or
                            unforeseen circumstances like weather conditions or
                            natural disasters. While we strive to ensure timely
                            delivery, these factors may affect the arrival time
                            of your order.
                          </li>
                          <li>
                            Shipping charges are calculated during checkout
                            based on your selected shipping method and delivery
                            location. You will be able to review the shipping
                            cost before completing your purchase.
                          </li>
                          <li>
                            If your order is lost or damaged during shipment,
                            please contact us within 7 days of receiving your
                            tracking information. We will help you file a claim
                            with the carrier and resolve the issue by offering a
                            replacement or refund.
                          </li>
                        </ul>
                      </>
                    )}

                    {section.id === "returns" && (
                      <p>
                        If you're not completely satisfied with your purchase,
                        we accept returns and exchanges under specific
                        conditions. We want to ensure you're happy with your
                        purchase, so if for any reason you’re not, we offer an
                        easy process to return or exchange items. For full
                        details on our return and exchange policy, including any
                        exclusions or restrictions, please refer to our{" "}
                        <a
                          href="/policies/return_policy"
                          className="text-blue-600 hover:underline"
                        >
                          Return Policy
                        </a>{" "}
                        for more information.
                      </p>
                    )}

                    {section.id === "liability" && (
                      <p>
                        We are not liable for any indirect, incidental, special,
                        or consequential damages arising from your use of our
                        Site, products, or services, including but not limited
                        to loss of profits, data, or business opportunities,
                        even if we have been advised of the possibility of such
                        damages. Our liability is limited to the amount paid by
                        you for the specific product or service in question.
                        This limitation applies to the fullest extent permitted
                        by law and is intended to protect us from unforeseen
                        financial responsibility.
                      </p>
                    )}

                    {section.id === "intellectual" && (
                      <p>
                        All content on our website, including images, graphics,
                        text, logos, trademarks, and other materials, are the
                        exclusive property of our company or our licensors. This
                        content is protected by copyright, trademark, and other
                        intellectual property laws. You may not use, reproduce,
                        modify, distribute, or display any content from our Site
                        without obtaining express written permission.
                        Unauthorized use of our content is a violation of our
                        intellectual property rights and may lead to legal
                        action.
                      </p>
                    )}

                    {section.id === "privacy" && (
                      <p>
                        Your use of our Site is also governed by our{" "}
                        <a
                          href="/policies/privacy_policy"
                          className="text-blue-600 hover:underline"
                        >
                          Privacy Policy
                        </a>
                        , which explains how we collect, use, store, and protect
                        your personal information. Our Privacy Policy details
                        the types of data we collect, how we use it to improve
                        your experience, and how we safeguard your personal
                        information. Please take a moment to review our Privacy
                        Policy for more information on how we protect your data.
                      </p>
                    )}

                    {section.id === "changes" && (
                      <p>
                        We reserve the right to update, modify, or change these
                        Terms and Conditions at any time to reflect changes in
                        our practices, improve our services, or comply with
                        legal, operational, or regulatory requirements. Updates
                        will be posted on this page with a new "Last Updated"
                        date. We encourage you to review this page regularly to
                        stay informed. Continued use of the Site after changes
                        are posted constitutes acceptance of the updated Terms
                        and Conditions.
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

export default TermsAndConditions;
