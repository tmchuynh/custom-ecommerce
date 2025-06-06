"use client";
import { Button } from "@/components/ui/button";
import { JSX, useRef, useState } from "react";

import { payment_security_sections } from "@/lib/constants/informationDetails";
import { scrollToSection, toggleAccordionSection } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { FaMailBulk, FaPhone } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";

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
 * - Accordion-style expandable payment_security_sections
 * - Smooth scroll functionality to payment_security_sections
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
 * @returns {JSX.Element} A payment security information page with interactive payment_security_sections
 */
const PaymentSecurity = (): JSX.Element => {
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
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-7xl">
        <div className="mb-12 text-center">
          <h1 className="mb-4 font-extrabold text-5xl">Payment Security</h1>
          <p className="mx-auto max-w-2xl text-xl">
            Learn how we protect your payment information and maintain the
            security of our payment processing systems.
          </p>
          <p className="mt-2 text-sm">Last Updated: June 10, 2023</p>
        </div>

        <div className="gap-8 grid grid-cols-1 lg:grid-cols-7">
          {/* Table of Contents Sidebar */}
          <div className="lg:col-span-2">
            <div className="top-18 sticky shadow-md p-6 border rounded-xl">
              <h2 className="mb-4 font-bold text-xl">Contents</h2>
              <ul className="space-y-2">
                {payment_security_sections.map((section) => (
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
              <div className="flex justify-between items-center px-4 pt-3">
                <p className="text-sm">
                  By using our services, you acknowledge our security measures.
                </p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-8 lg:col-span-5">
            {payment_security_sections.map((section) => (
              <div
                key={section.id}
                ref={(el) => {
                  sectionRefs.current[section.id] = el;
                }}
                className="shadow-md border rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => toggleSection(section.id)}
                  className="flex justify-between items-center p-6 w-full focus:outline-none"
                >
                  <div className="flex items-center">
                    <section.icon className="w-6 h-6" />
                    <h2 className="ml-3 font-semibold text-2xl">
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
                        <ul className="space-y-2 mx-5 list-disc list-outside">
                          <li>256-bit SSL encryption for all transactions</li>
                          <li>Secure storage of encrypted payment data</li>
                          <li>Regular security audits and updates</li>
                        </ul>
                      </div>
                    )}
                    {section.id === "payment-processing" && (
                      <div>
                        <p className="mb-4">Our payment processing system:</p>
                        <ul className="space-y-2 mx-5 list-disc list-outside">
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
                        <ul className="space-y-2 mx-5 list-disc list-outside">
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
                        <ul className="space-y-2 mx-5 list-disc list-outside">
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
                        <ul className="space-y-2 mx-5 list-disc list-outside">
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
                        <ul className="space-y-2 mx-5 list-disc list-outside">
                          <li>Advanced fraud detection algorithms</li>
                          <li>Address verification system (AVS)</li>
                          <li>Card verification value (CVV) checks</li>
                          <li>Suspicious activity monitoring</li>
                        </ul>
                      </div>
                    )}
                    {section.id === "contact" && (
                      <div className="p-6">
                        <div className="space-y-6">
                          <div className="flex items-start">
                            <FaMailBulk className="flex-shrink-0 mt-1 mr-4 w-6 h-6" />
                            <div>
                              <h3 className="mb-2 font-medium text-lg">
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
                              <p className="mt-1 text-sm">
                                We typically respond to emails within 24-48
                                hours during business days.
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start">
                            <FaPhone className="flex-shrink-0 mt-1 mr-4 w-6 h-6" />
                            <div>
                              <h3 className="mb-2 font-medium text-lg">
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
                              <p className="mt-1 text-sm">
                                Please check our business hours below for
                                availability.
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start">
                            <FaMessage className="flex-shrink-0 mt-1 mr-4 w-6 h-6" />
                            <div>
                              <h3 className="mb-2 font-medium text-lg">
                                Live Chat
                              </h3>
                              <p className="mb-2">
                                If you'd prefer to chat with a representative in
                                real-time, you can reach us using the live chat
                                feature on our website.
                              </p>
                              <Button>Start Live Chat</Button>
                              <p className="mt-1 text-sm">
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
