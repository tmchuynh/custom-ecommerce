"use client";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";

import { return_policy_sections } from "@/lib/constants/informationDetails";
import { scrollToSection, toggleAccordionSection } from "@/lib/utils/utils";
import { useRouter } from "next/navigation";
import { FaMailBulk } from "react-icons/fa";
import { FaBookOpen, FaMessage, FaPhone } from "react-icons/fa6";

/**
 * ReturnPolicy Component
 *
 * A comprehensive return policy page component that displays detailed information about the company's return process
 * through an interactive accordion-style interface with a sticky table of contents sidebar.
 *
 * @component
 *
 * @example
 * ```tsx
 * <ReturnPolicy />
 * ```
 *
 * @state
 * - activeSection: string | null - Tracks which policy section is currently expanded
 * - sectionRefs: { [key: string]: HTMLElement | null } - Stores references to section DOM elements for scrolling
 *
 * @functions
 * - toggleSection(sectionId: string) - Handles expanding/collapsing individual policy return_policy_sections
 * - handleScrollToSection(sectionId: string) - Handles smooth scrolling to selected policy return_policy_sections
 *
 * @features
 * - Responsive layout with sidebar navigation on larger screens
 * - Collapsible accordion return_policy_sections for easy content digestion
 * - Smooth scroll functionality when selecting return_policy_sections
 * - Visual indicators for active return_policy_sections
 * - Icon-based navigation for improved UX
 * - Detailed policy information organized into logical return_policy_sections
 *
 * @return_policy_sections
 * - Introduction
 * - Return Timeframe
 * - Eligibility for Return
 * - Non-Returnable Items
 * - How to Return an Item
 * - Refunds and Exchanges
 * - Return Shipping Costs
 * - Damaged or Defective Items
 * - Contact Information
 *
 * @returns A fully styled and interactive return policy page component
 */
const ReturnPolicy = () => {
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
    <div className="min-h-screen relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold">Return Policy</h1>
          <p className="text-xl mx-auto">
            We want you to be completely satisfied with your purchase. If you're
            not happy with an item, please read through our return policy for
            full details.
          </p>
          <p className="text-sm mt-2">Last Updated: June 10, 2023</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-7 gap-8">
          {/* Table of Contents Sidebar */}
          <div className="lg:col-span-2">
            <div className="sticky top-18 rounded-xl shadow-md border p-6">
              <h2 className="text-xl font-bold mb-4">Contents</h2>
              <ul className="space-y-2">
                {return_policy_sections.map((section) => (
                  <li key={section.id}>
                    <button
                      onClick={() => handleScrollToSection(section.id)}
                      className={`flex items-center w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        activeSection === section.id
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-secondary hover:text-secondary-foreground"
                      }`}
                    >
                      <section.icon size={20} />
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
              className="rounded-xl shadow-md overflow-hidden border-2"
            >
              <button
                onClick={() => toggleSection("introduction")}
                className="w-full flex items-center justify-between p-6 focus:outline-none"
              >
                <div className="flex items-center">
                  <FaBookOpen className="h-6 w-6" />
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
                    We understand that shopping online can sometimes lead to
                    products not meeting your expectations, whether due to fit,
                    appearance, or other factors. That's why we offer a
                    comprehensive and customer-friendly return policy designed
                    to ensure you are completely satisfied with your purchase.
                    If for any reason you're not happy with the product you've
                    received, we provide a straightforward process for returns
                    or exchanges, allowing you to return the item within a
                    specified period and receive a refund or replacement. Our
                    goal is to make your shopping experience as smooth and
                    hassle-free as possible, and we are committed to resolving
                    any issues to your satisfaction.
                  </p>
                </div>
              )}
            </div>

            {/* Render all other return_policy_sections */}
            {return_policy_sections.slice(1).map((section) => (
              <div
                key={section.id}
                ref={(el) => {
                  sectionRefs.current[section.id] = el;
                }}
                className="rounded-xl shadow-md overflow-hidden border-2"
              >
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full flex items-center justify-between p-6 focus:outline-none"
                >
                  <div className="flex items-center">
                    <section.icon size={20} />
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
                    {section.id === "timeframe" && (
                      <>
                        <p className="mb-4">
                          All returns must be initiated within 30 days from the
                          date of purchase. If 30 days have passed since your
                          purchase, unfortunately, we cannot offer you a refund
                          or exchange. We encourage you to review your order as
                          soon as possible to ensure you are satisfied with your
                          items. After the 30-day window, we are unable to
                          process any returns or exchanges.
                        </p>
                        <p>
                          In some cases, we may extend the return period, such
                          as during seasonal sales, holidays, or special
                          promotions. This extension allows for additional time
                          to return items purchased during these periods. Please
                          make sure to review the specific return instructions
                          or any promotional terms associated with your order,
                          as extended return periods may apply to certain
                          purchases. Always check the return policy or contact
                          customer support for the most up-to-date information
                          on return timeframes for your order.
                        </p>
                      </>
                    )}

                    {section.id === "eligibility" && (
                      <>
                        <p className="mb-4">
                          To be eligible for a return, the item must meet the
                          following criteria. These conditions are in place to
                          ensure that returned items are in a resellable
                          condition and to protect both the customer and the
                          business. Please review the requirements carefully
                          before initiating a return.
                        </p>
                        <ul className="list-disc list-outside mx-5 space-y-2">
                          <li>
                            Items must be unused and in the same condition as
                            when you received them. This includes no signs of
                            wear, use, or damage. We cannot accept returned
                            items that have been used or are no longer in new
                            condition.
                          </li>
                          <li>
                            Items must be in their original packaging, including
                            all tags, labels, and accessories that were included
                            at the time of purchase. Returned items that are
                            missing original packaging or tags may be rejected.
                          </li>
                          <li>
                            Items must not be damaged, worn, or altered in any
                            way. This includes any modifications, stains, tears,
                            or other changes that prevent the item from being
                            resold or reused.
                          </li>
                          <li>
                            For clothing and apparel, items should not have been
                            washed, worn, or have any signs of use. This
                            includes removal of hygiene seals on clothing and
                            apparel.
                          </li>
                          <li>
                            For hygiene products (e.g., swimwear,
                            undergarments), returns are only accepted if the
                            item is unopened, unused, and in its original
                            condition. Due to hygiene reasons, once the seal is
                            broken or the product has been used, we cannot
                            accept returns.
                          </li>
                          <li>
                            Sale or clearance items are non-refundable unless
                            specifically stated in the promotion or sale terms.
                            Please check the sale or promotional conditions
                            before making your purchase, as these items often
                            have different return policies.
                          </li>
                        </ul>
                      </>
                    )}

                    {section.id === "non-returnable" && (
                      <>
                        <p className="mb-4">
                          We are unable to accept returns for the following
                          types of products. These items are either
                          non-refundable due to their nature or have specific
                          terms and conditions that make returns impossible.
                          Please review the list below to ensure you are aware
                          of these exceptions before making your purchase.
                        </p>
                        <ul className="list-disc list-outside mx-5 space-y-2">
                          <li>
                            <strong>Gift cards:</strong> Gift cards are not
                            eligible for return or refund, as they are
                            considered a form of currency. Once purchased, they
                            cannot be returned or exchanged for cash or credit.
                          </li>
                          <li>
                            <strong>Downloadable software products:</strong> Due
                            to the nature of digital goods, downloadable
                            software is non-returnable once it has been accessed
                            or downloaded. Please ensure compatibility before
                            purchasing.
                          </li>
                          <li>
                            <strong>
                              Items marked as "Final Sale" or "Non-returnable"
                              on the product page:
                            </strong>{" "}
                            Certain items may be marked as "Final Sale" or
                            "Non-returnable" at the time of purchase. These
                            items cannot be returned under any circumstances, so
                            please carefully review product descriptions before
                            buying.
                          </li>
                          <li>
                            <strong>Custom-made or personalized items:</strong>{" "}
                            Custom or personalized items, such as engraved
                            jewelry or made-to-order products, cannot be
                            returned due to their unique nature. We encourage
                            you to confirm details and specifications before
                            finalizing your purchase.
                          </li>
                          <li>
                            <strong>Perishable goods:</strong> Perishable items
                            such as food, flowers, or other products with a
                            limited shelf life cannot be returned once shipped,
                            for health and safety reasons.
                          </li>
                        </ul>
                      </>
                    )}

                    {section.id === "process" && (
                      <>
                        <p className="mb-4">
                          To initiate a return, please follow these simple steps
                          to ensure your return is processed smoothly and
                          efficiently:
                        </p>
                        <ol className="list-decimal list-outside mx-5 space-y-2">
                          <li>
                            Log into your account on our website or use the
                            return portal link provided in your order
                            confirmation email. If you don't have an account,
                            you can still initiate the return through the return
                            portal using your order details.
                          </li>
                          <li>
                            Select the items you wish to return and provide a
                            reason for the return. This helps us improve our
                            services and better understand why the items didn't
                            meet your expectations.
                          </li>
                          <li>
                            Print the return shipping label provided (if
                            applicable) and include the return form in your
                            package. This form will help us process your return
                            quickly and accurately. If a return label is not
                            provided, you may use your preferred shipping
                            method.
                          </li>
                          <li>
                            Ship the items back to us using the return label (if
                            provided) or your preferred shipping method. Make
                            sure the items are securely packaged to prevent
                            damage during transit.
                          </li>
                          <li>
                            Once we receive your return, we will process your
                            refund or exchange within 5-7 business days. You
                            will receive an email notification once your return
                            has been processed, and the refund will be credited
                            to your original payment method or exchanged item.
                          </li>
                        </ol>
                        <p className="mt-4">
                          Please note that you are responsible for the shipping
                          costs associated with returns unless the return is due
                          to a mistake on our part (e.g., incorrect or defective
                          item). If you are returning an item due to an error on
                          our part, please contact our customer support team to
                          arrange a prepaid return label.
                        </p>
                      </>
                    )}

                    {section.id === "refunds" && (
                      <>
                        <p className="mb-4">
                          Once your return is processed, we will notify you via
                          email regarding the status of your refund or exchange.
                          Depending on your preference and the nature of your
                          return, you can expect the following outcomes:
                        </p>
                        <ul className="list-disc list-outside mx-5 space-y-2">
                          <li>
                            <strong>Refunds:</strong> Refunds will be issued to
                            the original payment method used at the time of
                            purchase. Once we process your return, please allow
                            5-7 business days for the refund to reflect in your
                            account. The exact timing depends on your payment
                            provider and bank processing times. You will receive
                            a notification once your refund has been completed.
                          </li>
                          <li>
                            <strong>Exchanges:</strong> If you requested an
                            exchange, we will ship the new item(s) to you once
                            we receive the returned product(s) and verify the
                            condition of the return. You will not be charged
                            additional shipping fees for exchanges, except in
                            cases where there are price differences between the
                            exchanged items. If the exchanged item costs more,
                            you will be notified of the difference, which will
                            be charged. If the new item is of lesser value, we
                            will process a refund for the difference.
                          </li>
                          <li>
                            <strong>Store Credit:</strong> If you prefer store
                            credit instead of a refund, you can choose to
                            receive an e-gift card. The e-gift card will be sent
                            to your email after your return has been processed.
                            This option allows you to shop for new items at your
                            convenience, and the card will remain valid until
                            fully used. Please ensure that your email address is
                            correct when opting for store credit to ensure
                            timely delivery of your e-gift card.
                          </li>
                        </ul>
                      </>
                    )}

                    {section.id === "shipping" && (
                      <>
                        <p className="mb-4">
                          Unless the return is due to an error on our part
                          (e.g., wrong item shipped, defective or damaged
                          goods), the return shipping cost will be the
                          responsibility of the customer. We recommend using a
                          trackable shipping service or purchasing shipping
                          insurance for the return, as we cannot guarantee
                          receipt of your returned item. It’s important to
                          retain the tracking number and proof of shipment in
                          case any issues arise with the return process.
                        </p>
                        <p>
                          If the return is due to our error, such as receiving
                          the wrong item or a damaged product, we will cover the
                          return shipping cost. In these cases, we will provide
                          you with a prepaid return shipping label to ensure a
                          smooth and cost-free return process. Please contact
                          our customer support team to arrange the return and
                          receive the prepaid label.
                        </p>
                      </>
                    )}

                    {section.id === "damaged" && (
                      <>
                        <p className="mb-4">
                          If you receive a damaged or defective item, please
                          contact us immediately at our customer service email.
                          We will arrange for a return or replacement at no
                          additional cost to you. We understand how frustrating
                          this can be and will work to resolve the issue as
                          quickly as possible to ensure your satisfaction.
                        </p>
                        <p>
                          To help us process your claim faster and accurately,
                          please include clear photos of the damaged item as
                          well as the packaging. These images will assist us in
                          verifying the issue and expedite the process of
                          issuing a return or replacement. The more detailed the
                          photos, the quicker we can resolve the matter. Please
                          ensure that the photos clearly show the damaged area
                          of the product and any visible damage to the
                          packaging.
                        </p>
                      </>
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

export default ReturnPolicy;
