"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  ShieldCheck,
  User,
  ShoppingBag,
  CreditCard,
  Truck,
  RefreshCw,
  AlertTriangle,
  Copyright,
  Lock,
  Edit3,
  Phone,
} from "lucide-react";

const TermsAndConditions = () => {
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
      id: "use",
      title: "Use of the Site",
      icon: <ShieldCheck className="h-5 w-5" />,
    },
    {
      id: "account",
      title: "Account Registration",
      icon: <User className="h-5 w-5" />,
    },
    {
      id: "product",
      title: "Product Information",
      icon: <ShoppingBag className="h-5 w-5" />,
    },
    {
      id: "order",
      title: "Order Process",
      icon: <ShoppingBag className="h-5 w-5" />,
    },
    {
      id: "payments",
      title: "Payments",
      icon: <CreditCard className="h-5 w-5" />,
    },
    {
      id: "shipping",
      title: "Shipping and Delivery",
      icon: <Truck className="h-5 w-5" />,
    },
    {
      id: "returns",
      title: "Returns and Exchanges",
      icon: <RefreshCw className="h-5 w-5" />,
    },
    {
      id: "liability",
      title: "Limitation of Liability",
      icon: <AlertTriangle className="h-5 w-5" />,
    },
    {
      id: "intellectual",
      title: "Intellectual Property",
      icon: <Copyright className="h-5 w-5" />,
    },
    {
      id: "privacy",
      title: "Privacy Policy",
      icon: <Lock className="h-5 w-5" />,
    },
    {
      id: "changes",
      title: "Changes to Terms",
      icon: <Edit3 className="h-5 w-5" />,
    },
    { id: "contact", title: "Contact Us", icon: <Phone className="h-5 w-5" /> },
  ];

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
          <div className="lg:col-span-5 space-y-8">
            {/* Introduction */}
            <div
              ref={(el) => {
                sectionRefs.current["introduction"] = el;
              }}
              className="bg-muted text-muted-foreground rounded-xl shadow-md overflow-hidden"
            >
              <button
                onClick={() => toggleSection("introduction")}
                className="w-full flex items-center justify-between p-6 focus:outline-none"
              >
                <div className="flex items-center">
                  <BookOpen className="h-6 w-6 dark:text-foreground text-secondary" />
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
                    These Terms and Conditions ("Terms", "Terms and Conditions")
                    govern your use of our website ("Site"), the services we
                    provide, and any purchases you make through the website. By
                    using our Site and services, you agree to comply with these
                    Terms. If you do not agree with any part of these Terms, you
                    should not use our Site or services.
                  </p>
                </div>
              )}
            </div>

            {/* Render all other sections similarly */}
            {sections.slice(1).map((section) => (
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
                    {section.id === "use" && (
                      <>
                        <p className=" mb-4">
                          You may use our Site for lawful purposes only. By
                          using our Site, you agree:
                        </p>
                        <ul className="list-disc list-inside space-y-2">
                          <li>
                            Not to engage in any fraudulent, unlawful, or
                            harmful activities.
                          </li>
                          <li>
                            Not to violate any applicable laws or regulations.
                          </li>
                          <li>
                            Not to interfere with the proper functioning of the
                            Site or its security features.
                          </li>
                          <li>
                            Not to upload, post, or transmit any content that is
                            offensive, harmful, or infringes upon the rights of
                            others.
                          </li>
                        </ul>
                      </>
                    )}

                    {section.id === "account" && (
                      <>
                        <p className=" mb-4">
                          To make a purchase on our Site, you may need to create
                          an account. When registering, you agree to provide
                          accurate and up-to-date information, and you are
                          responsible for maintaining the confidentiality of
                          your login credentials.
                        </p>
                        <ul className="list-disc list-inside space-y-2">
                          <li>
                            You must notify us immediately if you believe your
                            account has been compromised.
                          </li>
                          <li>
                            We may suspend or terminate your account if we
                            suspect any unauthorized activity or violation of
                            these Terms.
                          </li>
                        </ul>
                      </>
                    )}

                    {section.id === "product" && (
                      <>
                        <p className=" mb-4">
                          We make every effort to ensure that product
                          information, including descriptions, prices, and
                          images, are accurate. However, we cannot guarantee the
                          accuracy, completeness, or reliability of such
                          information. All prices are subject to change without
                          notice.
                        </p>
                        <ul className="list-disc list-inside space-y-2">
                          <li>
                            We reserve the right to modify or discontinue any
                            product without prior notice.
                          </li>
                          <li>
                            If a product is incorrectly priced, we will notify
                            you and provide the option to cancel or proceed with
                            the corrected price.
                          </li>
                        </ul>
                      </>
                    )}

                    {section.id === "order" && (
                      <>
                        <p className="mb-4">
                          Once you place an order on our Site, you will receive
                          an order confirmation email. Please review the order
                          details to ensure accuracy. A contract between you and
                          us will only be formed when the order is dispatched
                          for shipping.
                        </p>
                        <ul className="list-disc list-inside space-y-2">
                          <li>
                            We reserve the right to reject or cancel any order
                            for reasons such as product availability or pricing
                            errors.
                          </li>
                          <li>
                            We may ask you for additional information to process
                            your order, such as proof of identity or address.
                          </li>
                          <li>
                            If we cancel your order, you will receive a full
                            refund to your original payment method.
                          </li>
                        </ul>
                      </>
                    )}

                    {section.id === "payments" && (
                      <>
                        <p className="mb-4">
                          We accept various forms of payment, including
                          credit/debit cards, PayPal, and other payment
                          providers. Payments will be processed securely, and we
                          do not store your sensitive payment information.
                        </p>
                        <ul className="list-disc list-inside space-y-2">
                          <li>
                            By providing your payment information, you authorize
                            us to charge the full amount of your order,
                            including taxes and shipping fees.
                          </li>
                          <li>
                            We may verify your payment details before processing
                            your order.
                          </li>
                          <li>
                            If a payment is declined, we will notify you, and
                            your order will not be processed until a valid
                            payment method is provided.
                          </li>
                        </ul>
                      </>
                    )}

                    {section.id === "shipping" && (
                      <>
                        <p className="mb-4">
                          We offer shipping within [Country/Region] and
                          internationally. Shipping costs and delivery times
                          vary depending on your location, the items purchased,
                          and the shipping method chosen.
                        </p>
                        <ul className="list-disc list-inside space-y-2">
                          <li>
                            We are not responsible for delays caused by
                            third-party carriers or customs processing.
                          </li>
                          <li>
                            Shipping charges will be added to your order during
                            the checkout process.
                          </li>
                          <li>
                            If your order is lost or damaged during shipment,
                            please contact us within 7 days of receiving your
                            tracking information for assistance.
                          </li>
                        </ul>
                      </>
                    )}

                    {section.id === "returns" && (
                      <p className="">
                        If you're not completely satisfied with your purchase,
                        we accept returns and exchanges under specific
                        conditions. Please refer to our{" "}
                        <a
                          href="/return-policy"
                          className="text-blue-600 hover:underline"
                        >
                          Return Policy
                        </a>{" "}
                        for full details.
                      </p>
                    )}

                    {section.id === "liability" && (
                      <p className="">
                        We are not liable for any indirect, incidental, or
                        consequential damages resulting from the use of our Site
                        or products. In no event will our liability exceed the
                        amount paid by you for the product in question.
                      </p>
                    )}

                    {section.id === "intellectual" && (
                      <p className="">
                        All content on our website, including images, graphics,
                        text, logos, and trademarks, are the property of our
                        company or our licensors. You may not use, reproduce, or
                        distribute our content without our express written
                        permission.
                      </p>
                    )}

                    {section.id === "privacy" && (
                      <p className="">
                        Your use of our Site is also governed by our{" "}
                        <a
                          href="/privacy-policy"
                          className="text-blue-600 hover:underline"
                        >
                          Privacy Policy
                        </a>
                        , which explains how we collect, use, and protect your
                        personal information.
                      </p>
                    )}

                    {section.id === "changes" && (
                      <p className="">
                        We reserve the right to update or change these Terms and
                        Conditions at any time. When changes are made, the
                        updated version will be posted on this page with a new
                        "Last Updated" date. Your continued use of the Site
                        after changes are posted constitutes acceptance of those
                        changes.
                      </p>
                    )}

                    {section.id === "contact" && (
                      <>
                        <p className="">
                          If you have any questions or concerns regarding these
                          Terms and Conditions, please contact us at:
                        </p>
                        <div className="mt-4 p-4 rounded-lg">
                          <p className="">
                            Email:{" "}
                            <a
                              className="text-blue-600 hover:underline"
                              href="mailto:support@yourcompany.com"
                            >
                              support@yourcompany.com
                            </a>
                          </p>
                          <p className="mt-2">Phone: +1 (555) 123-4567</p>
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

      {/* Fixed Accept Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-md p-4 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <p className="text-sm text-gray-600">
            By continuing to use our site, you agree to these terms.
          </p>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6">
            Accept Terms
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
