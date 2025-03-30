"use client";

import { useState, useRef, JSX } from "react";
import { Button } from "@/components/ui/button";

import router from "next/router";
import { toggleAccordionSection, scrollToSection } from "@/lib/utils/utils";
import { InformationDetails } from "@/lib/interfaces";
import { FaFileAlt, FaKey, FaLock, FaMailBulk, FaPhone } from "react-icons/fa";
import { FaCreditCard, FaMessage, FaServer, FaShield } from "react-icons/fa6";
import { GoAlert, GoAlertFill } from "react-icons/go";

/**
 * PaymentSecurity Component
 *
 * A component that displays comprehensive information about payment security measures
 * through an interactive accordion-style interface.
 *
 * @component
 *
 * @state {string | null} activeSection - Tracks which security section is currently expanded
 * @state {React.RefObject<{ [key: string]: HTMLElement | null }>} sectionRefs - Holds references to section DOM elements
 *
 * @example
 * ```tsx
 * <PaymentSecurity />
 * ```
 *
 * Features:
 * - Responsive layout with sidebar navigation
 * - Accordion-style expandable sections
 * - Smooth scroll functionality to sections
 * - Detailed information about:
 *   - Security Overview
 *   - Data Encryption
 *   - Payment Processing
 *   - Authentication Methods
 *   - Security Compliance
 *   - Security Monitoring
 *   - Fraud Prevention
 *   - Contact Information
 *
 * @returns {JSX.Element} A payment security information page with interactive sections
 */
const PaymentSecurity = (): JSX.Element => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

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

  const sections: InformationDetails[] = [
    {
      id: "overview",
      title: "Security Overview",
      icon: FaShield,
    },
    {
      id: "encryption",
      title: "Data Encryption",
      icon: FaLock,
    },
    {
      id: "payment-processing",
      title: "Payment Processing",
      icon: FaCreditCard,
    },
    {
      id: "authentication",
      title: "Authentication Methods",
      icon: FaKey,
    },
    {
      id: "compliance",
      title: "Security Compliance",
      icon: FaFileAlt,
    },
    {
      id: "monitoring",
      title: "Security Monitoring",
      icon: FaServer,
    },
    {
      id: "fraud",
      title: "Fraud Prevention",
      icon: GoAlertFill,
    },
    {
      id: "contact",
      title: "Contact Security Team",
      icon: GoAlert,
    },
  ];

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold mb-4">Payment Security</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Learn how we protect your payment information and maintain the
            security of our payment processing systems.
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
              <div className="px-4 pt-3 flex justify-between items-center">
                <p className="text-sm">
                  By using our services, you acknowledge our security measures.
                </p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-5 space-y-8">
            {sections.map((section) => (
              <div
                key={section.id}
                ref={(el) => {
                  sectionRefs.current[section.id] = el;
                }}
                className="border rounded-xl shadow-md overflow-hidden"
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
                    {/* Add content for each section */}
                    {section.id === "overview" && (
                      <p>
                        We implement industry-standard security measures to
                        protect your payment information and maintain a secure
                        shopping environment.
                      </p>
                    )}
                    {section.id === "encryption" && (
                      <div>
                        <p className="mb-4">
                          All sensitive data is encrypted using
                          industry-standard SSL/TLS encryption:
                        </p>
                        <ul className="list-disc list-outside mx-5 space-y-2">
                          <li>256-bit SSL encryption for all transactions</li>
                          <li>Secure storage of encrypted payment data</li>
                          <li>Regular security audits and updates</li>
                        </ul>
                      </div>
                    )}
                    {section.id === "payment-processing" && (
                      <div>
                        <p className="mb-4">Our payment processing system:</p>
                        <ul className="list-disc list-outside mx-5 space-y-2">
                          <li>Partners with trusted payment processors</li>
                          <li>Never stores complete credit card information</li>
                          <li>Uses tokenization for recurring payments</li>
                          <li>Monitors transactions in real-time</li>
                        </ul>
                      </div>
                    )}
                    {section.id === "authentication" && (
                      <div>
                        <p className="mb-4">
                          We employ multiple authentication methods:
                        </p>
                        <ul className="list-disc list-outside mx-5 space-y-2">
                          <li>Two-factor authentication (2FA)</li>
                          <li>3D Secure for card payments</li>
                          <li>Strong password requirements</li>
                          <li>Automatic session timeouts</li>
                        </ul>
                      </div>
                    )}
                    {section.id === "compliance" && (
                      <div>
                        <p className="mb-4">We maintain compliance with:</p>
                        <ul className="list-disc list-outside mx-5 space-y-2">
                          <li>
                            PCI DSS (Payment Card Industry Data Security
                            Standard)
                          </li>
                          <li>GDPR (General Data Protection Regulation)</li>
                          <li>Local data protection laws</li>
                          <li>Regular security certifications and audits</li>
                        </ul>
                      </div>
                    )}
                    {section.id === "monitoring" && (
                      <div>
                        <p className="mb-4">
                          Our security monitoring includes:
                        </p>
                        <ul className="list-disc list-outside mx-5 space-y-2">
                          <li>24/7 system monitoring</li>
                          <li>Automated threat detection</li>
                          <li>Regular security assessments</li>
                          <li>Incident response protocols</li>
                        </ul>
                      </div>
                    )}
                    {section.id === "fraud" && (
                      <div>
                        <p className="mb-4">
                          Our fraud prevention measures include:
                        </p>
                        <ul className="list-disc list-outside mx-5 space-y-2">
                          <li>Advanced fraud detection algorithms</li>
                          <li>Address verification system (AVS)</li>
                          <li>Card verification value (CVV) checks</li>
                          <li>Suspicious activity monitoring</li>
                        </ul>
                      </div>
                    )}
                    {section.id === "contact" && (
                      <div className="p-6 border-t">
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
                              <Button className="">Start Live Chat</Button>
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

export default PaymentSecurity;
