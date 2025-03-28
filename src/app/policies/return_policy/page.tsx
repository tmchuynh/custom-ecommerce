"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Clock,
  CheckCircle,
  XCircle,
  RefreshCw,
  DollarSign,
  Truck,
  AlertTriangle,
  Phone,
} from "lucide-react";

const ReturnPolicy = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

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
      id: "timeframe",
      title: "Return Timeframe",
      icon: <Clock className="h-5 w-5" />,
    },
    {
      id: "eligibility",
      title: "Eligibility for Return",
      icon: <CheckCircle className="h-5 w-5" />,
    },
    {
      id: "non-returnable",
      title: "Non-Returnable Items",
      icon: <XCircle className="h-5 w-5" />,
    },
    {
      id: "process",
      title: "How to Return an Item",
      icon: <RefreshCw className="h-5 w-5" />,
    },
    {
      id: "refunds",
      title: "Refunds and Exchanges",
      icon: <DollarSign className="h-5 w-5" />,
    },
    {
      id: "shipping",
      title: "Return Shipping Costs",
      icon: <Truck className="h-5 w-5" />,
    },
    {
      id: "damaged",
      title: "Damaged or Defective Items",
      icon: <AlertTriangle className="h-5 w-5" />,
    },
    { id: "contact", title: "Contact Us", icon: <Phone className="h-5 w-5" /> },
  ];

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

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Table of Contents Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">Contents</h2>
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
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
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
                  <p className="">
                    We understand that shopping online can sometimes lead to
                    products not meeting your expectations. That's why we offer
                    a comprehensive return policy to make sure you're completely
                    satisfied with your purchase.
                  </p>
                </div>
              )}
            </div>

            {/* Render all other sections */}
            {sections.slice(1).map((section) => (
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
                    {section.icon}
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
                        <p className=" mb-4">
                          All returns must be initiated within 30 days from the
                          date of purchase. If 30 days have passed since your
                          purchase, unfortunately, we cannot offer you a refund
                          or exchange.
                        </p>
                        <p className="">
                          In some cases, we may extend the return period, such
                          as for seasonal sales, holidays, or special
                          promotions. Please check the return instructions for
                          specific timeframes related to your order.
                        </p>
                      </>
                    )}

                    {section.id === "eligibility" && (
                      <>
                        <p className=" mb-4">
                          To be eligible for a return, the item must meet the
                          following criteria:
                        </p>
                        <ul className="list-disc list-inside  space-y-2">
                          <li>
                            Items must be unused and in the same condition as
                            when you received them.
                          </li>
                          <li>
                            Items must be in their original packaging, including
                            tags and labels attached.
                          </li>
                          <li>
                            Items must not be damaged, worn, or altered in any
                            way.
                          </li>
                          <li>
                            For clothing and apparel, items should not have been
                            washed or worn.
                          </li>
                          <li>
                            For hygiene products (e.g., swimwear,
                            undergarments), returns are only accepted if the
                            item is unopened and in original condition.
                          </li>
                          <li>
                            Sale or clearance items are non-refundable unless
                            specified in the promotion or sale terms.
                          </li>
                        </ul>
                      </>
                    )}

                    {section.id === "non-returnable" && (
                      <>
                        <p className=" mb-4">
                          We are unable to accept returns for the following
                          types of products:
                        </p>
                        <ul className="list-disc list-inside  space-y-2">
                          <li>Gift cards</li>
                          <li>Downloadable software products</li>
                          <li>
                            Items marked as "Final Sale" or "Non-returnable" on
                            the product page
                          </li>
                          <li>Custom-made or personalized items</li>
                          <li>Perishable goods (e.g., food items, flowers)</li>
                        </ul>
                      </>
                    )}

                    {section.id === "process" && (
                      <>
                        <p className=" mb-4">
                          To initiate a return, follow these simple steps:
                        </p>
                        <ol className="list-decimal list-inside  space-y-2">
                          <li>
                            Log into your account on our website or use the
                            return portal link provided in your order
                            confirmation email.
                          </li>
                          <li>
                            Select the items you wish to return and provide a
                            reason for the return.
                          </li>
                          <li>
                            Print the return shipping label provided (if
                            applicable) and include the return form in your
                            package.
                          </li>
                          <li>
                            Ship the items back to us using the return label (if
                            provided) or your preferred shipping method.
                          </li>
                          <li>
                            Once we receive your return, we will process your
                            refund or exchange within 5-7 business days.
                          </li>
                        </ol>
                        <p className=" mt-4">
                          Please note that you are responsible for the shipping
                          costs associated with returns unless the return is due
                          to a mistake on our part (e.g., incorrect or defective
                          item).
                        </p>
                      </>
                    )}

                    {section.id === "refunds" && (
                      <>
                        <p className=" mb-4">
                          Once your return is processed, we will notify you via
                          email about your refund or exchange. You can expect:
                        </p>
                        <ul className="list-disc list-inside  space-y-2">
                          <li>
                            <span className="font-medium">Refunds:</span>{" "}
                            Refunds will be issued to the original payment
                            method. Please allow 5-7 business days for the
                            refund to appear on your account, depending on your
                            payment provider.
                          </li>
                          <li>
                            <span className="font-medium">Exchanges:</span> If
                            you requested an exchange, we will ship the new
                            item(s) to you once we receive the returned
                            product(s). You will not be charged additional
                            shipping fees for exchanges, except for any price
                            differences.
                          </li>
                          <li>
                            <span className="font-medium">Store Credit:</span>{" "}
                            If you prefer store credit instead of a refund, you
                            can opt for an e-gift card, which will be sent to
                            your email after processing.
                          </li>
                        </ul>
                      </>
                    )}

                    {section.id === "shipping" && (
                      <>
                        <p className=" mb-4">
                          Unless the return is due to an error on our part
                          (e.g., wrong item shipped or damaged goods), the
                          return shipping cost is the responsibility of the
                          customer. We recommend using a trackable shipping
                          service for returns as we cannot guarantee receipt of
                          your returned item.
                        </p>
                        <p className="">
                          If the return is due to our error, we will cover the
                          return shipping cost and provide a prepaid shipping
                          label.
                        </p>
                      </>
                    )}

                    {section.id === "damaged" && (
                      <>
                        <p className=" mb-4">
                          If you receive a damaged or defective item, please
                          contact us immediately at our customer service email,
                          and we will arrange for a return or replacement at no
                          additional cost to you.
                        </p>
                        <p className="">
                          To help us process your claim faster, please include
                          photos of the damaged item and the packaging.
                        </p>
                      </>
                    )}

                    {section.id === "contact" && (
                      <>
                        <p className="">
                          If you have any questions or concerns regarding our
                          return policy, please don't hesitate to contact us:
                        </p>
                        <div className="mt-4 p-4 rounded-lg">
                          <p className="">
                            Email:{" "}
                            <a
                              className="hover:underline"
                              href="mailto:support@yourcompany.com"
                            >
                              support@yourcompany.com
                            </a>
                          </p>
                          <p className=" mt-2">Phone: +1 (555) 123-4567</p>
                        </div>
                      </>
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
