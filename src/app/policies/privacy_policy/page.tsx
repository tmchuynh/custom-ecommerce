"use client";
import { Button } from "@/components/ui/button";
import { privacy_policy_sections } from "@/lib/constants/informationDetails";
import { scrollToSection, toggleAccordionSection } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { JSX, useRef, useState } from "react";
import {
  FaBookOpen,
  FaEdit,
  FaFileAlt,
  FaMailBulk,
  FaPhoneAlt,
  FaUserCheck,
} from "react-icons/fa";
import { FaDatabase, FaMessage, FaShare, FaShield } from "react-icons/fa6";

/**
 * Privacy Policy Component
 *
 * A comprehensive privacy policy page component that displays detailed information about
 * data collection, usage, and protection practices. The component features an interactive
 * accordion-style layout with a sticky table of contents sidebar for easy navigation.
 *
 * @component
 *
 * @state {string | null} activeSection - Tracks which section is currently expanded
 * @state {Object} sectionRefs - Refs to each policy section for scrolling functionality
 *
 * @function toggleSection - Handles expanding/collapsing individual policy privacy_policy_sections
 * @param {string} sectionId - ID of the section to toggle
 *
 * @function handleScrollToSection - Handles smooth scrolling to selected policy privacy_policy_sections
 * @param {string} sectionId - ID of the section to scroll to
 *
 * Features:
 * - Responsive layout with grid system
 * - Sticky navigation sidebar
 * - Expandable/collapsible content privacy_policy_sections
 * - Smooth scroll functionality
 * - Icon integration for visual hierarchy
 * - Accessible button controls
 *
 * privacy_policy_sections covered:
 * - Introduction
 * - Information Collection
 * - Information Usage
 * - Information Sharing
 * - Data Protection
 * - User Rights
 * - Policy Changes
 * - Contact Information
 *
 * @returns {JSX.Element} A responsive privacy policy page component
 */
const PrivacyPolicy = (): JSX.Element => {
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
          <h1 className="mb-4 font-extrabold text-5xl">Privacy Policy</h1>
          <p className="mx-auto max-w-2xl text-xl">
            Protecting your privacy is important to us. Please read this privacy
            policy carefully to understand how we collect, use, and protect your
            information.
          </p>
          <p className="mt-2 text-sm">Last Updated: June 10, 2023</p>
        </div>

        <div className="gap-8 grid grid-cols-1 lg:grid-cols-7">
          {/* Table of Contents Sidebar */}
          <div className="lg:col-span-2">
            <div className="top-18 sticky shadow-md p-6 border rounded-xl">
              <h2 className="mb-4 font-bold text-xl">Contents</h2>
              <ul className="space-y-2">
                {privacy_policy_sections.map((section) => (
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
                  <p>
                    At [Your Company Name], we value the privacy of our
                    customers and are fully committed to safeguarding any
                    personal information you provide to us. We understand the
                    importance of keeping your data secure, and this privacy
                    policy outlines how we collect, use, disclose, and protect
                    your personal information when you interact with our
                    services. By using our services, you trust us with your
                    personal data, and we take that responsibility seriously.
                    This policy explains our practices in detail to ensure you
                    are informed about how your data is handled.
                  </p>
                </div>
              )}
            </div>

            {/* Information We Collect */}
            <div
              ref={(el) => {
                sectionRefs.current["information-collect"] = el;
              }}
              className="shadow-md border rounded-xl overflow-hidden"
            >
              <button
                onClick={() => toggleSection("information-collect")}
                className="flex justify-between items-center p-6 w-full focus:outline-none"
              >
                <div className="flex items-center">
                  <FaDatabase className="w-6 h-6" />
                  <h2 className="ml-3 font-semibold text-2xl">
                    Information We Collect
                  </h2>
                </div>
                <svg
                  className={`w-6 h-6 transform transition-transform ${
                    activeSection === "information-collect" ? "rotate-180" : ""
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
              {activeSection === "information-collect" && (
                <div className="p-6 border-t">
                  <p className="mb-4">
                    We collect various types of information to provide and
                    improve our services. This includes both personal and
                    non-personal information, which allows us to personalize
                    your experience, process transactions efficiently, and
                    optimize our website for better performance.
                  </p>

                  <h3 className="mb-2 font-medium text-xl">
                    Personal Information
                  </h3>
                  <p className="mb-4">
                    When you make a purchase, create an account, or interact
                    with our website, we may collect personal information to
                    process your orders, communicate with you, and provide
                    personalized services. This includes, but is not limited to:
                  </p>
                  <ul className="space-y-2 mx-5 mb-4 list-disc list-outside">
                    <li>
                      <strong>Name:</strong> To identify you and provide
                      personalized service.
                    </li>
                    <li>
                      <strong>Email address:</strong> To send you order
                      confirmations, updates, and promotional offers (if you've
                      subscribed).
                    </li>
                    <li>
                      <strong>Phone number:</strong> To contact you regarding
                      your order or if we need to reach you for any customer
                      service-related matters.
                    </li>
                    <li>
                      <strong>Billing and shipping address:</strong> To ensure
                      that products are delivered to the correct location and
                      for billing purposes.
                    </li>
                    <li>
                      <strong>Payment information:</strong> Such as credit card
                      details or other payment methods, to complete your
                      purchases securely.
                    </li>
                    <li>
                      <strong>Order history:</strong> To assist with customer
                      service, provide order status updates, and recommend
                      products based on past purchases.
                    </li>
                  </ul>

                  <h3 className="mb-2 font-medium text-xl">
                    Non-Personal Information
                  </h3>
                  <p className="mb-4">
                    In addition to personal information, we also collect
                    non-personal information to improve the functionality of our
                    website and enhance your overall user experience. This data
                    is not personally identifiable and is primarily used for
                    analytical purposes, such as tracking website traffic,
                    improving website performance, and providing better content
                    recommendations. This includes:
                  </p>
                  <ul className="space-y-2 mx-5 list-disc list-outside">
                    <li>
                      <strong>Browser type and version:</strong> To ensure
                      compatibility with your device and optimize the website’s
                      appearance and functionality.
                    </li>
                    <li>
                      <strong>Operating system:</strong> To understand the types
                      of devices and operating systems our users are using,
                      allowing us to optimize the site’s design and performance.
                    </li>
                    <li>
                      <strong>IP address:</strong> To track site usage and
                      monitor security, such as detecting fraudulent activity or
                      abuse.
                    </li>
                    <li>
                      <strong>Device information:</strong> Whether you are using
                      a mobile device or desktop, this helps us tailor the
                      website’s design and ensure a responsive experience.
                    </li>
                    <li>
                      <strong>Browsing behavior:</strong> Including pages
                      visited, time spent on the site, and interaction with
                      content, which helps us improve the layout, content, and
                      functionality of our website.
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* How We Use Your Information */}
            <div
              ref={(el) => {
                sectionRefs.current["information-usage"] = el;
              }}
              className="shadow-md border rounded-xl overflow-hidden"
            >
              <button
                onClick={() => toggleSection("information-usage")}
                className="flex justify-between items-center p-6 w-full focus:outline-none"
              >
                <div className="flex items-center">
                  <FaFileAlt className="w-6 h-6" />
                  <h2 className="ml-3 font-semibold text-2xl">
                    How We Use Your Information
                  </h2>
                </div>
                <svg
                  className={`w-6 h-6 transform transition-transform ${
                    activeSection === "information-usage" ? "rotate-180" : ""
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
              {activeSection === "information-usage" && (
                <div className="p-6 border-t">
                  <p className="mb-4">
                    We use the information we collect for various purposes to
                    enhance your experience with our site, improve our services,
                    and ensure a secure and efficient transaction process. Below
                    are the key ways in which we utilize your information:
                  </p>
                  <ul className="space-y-2 mx-5 list-disc list-outside">
                    <li>
                      <strong>To process and fulfill your orders:</strong> We
                      use your personal and payment information to process your
                      orders and ensure timely and accurate delivery of your
                      purchased products.
                    </li>
                    <li>
                      <strong>To improve our products and services:</strong> We
                      analyze customer feedback, preferences, and behavior to
                      identify areas where we can enhance our product offerings,
                      customer service, and website features.
                    </li>
                    <li>
                      <strong>To personalize your shopping experience:</strong>{" "}
                      By tracking your browsing history and preferences, we can
                      recommend products, tailor offers, and adjust the content
                      of our site to suit your individual needs and interests.
                    </li>
                    <li>
                      <strong>
                        To communicate with you about your orders or updates to
                        our services:
                      </strong>{" "}
                      We use your contact information to notify you about order
                      status, shipping updates, or changes to our terms,
                      policies, or services that may impact you.
                    </li>
                    <li>
                      <strong>
                        To send promotional emails, newsletters, or offers (with
                        your consent):
                      </strong>{" "}
                      With your permission, we may send you updates on
                      promotions, new products, and exclusive offers. You can
                      opt-out of these communications at any time by
                      unsubscribing.
                    </li>
                    <li>
                      <strong>
                        To analyze usage patterns and enhance website
                        performance:
                      </strong>{" "}
                      We track user interactions and browsing patterns on our
                      website to identify areas of improvement, optimize site
                      functionality, and ensure a seamless experience for our
                      visitors.
                    </li>
                    <li>
                      <strong>
                        To prevent fraudulent activities and protect our site
                        from security threats:
                      </strong>{" "}
                      We use your information to detect and prevent potential
                      fraudulent activity and to maintain the security and
                      integrity of our website, protecting both our customers
                      and our business from unauthorized access.
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Information Sharing */}
            <div
              ref={(el) => {
                sectionRefs.current["information-sharing"] = el;
              }}
              className="shadow-md border rounded-xl overflow-hidden"
            >
              <button
                onClick={() => toggleSection("information-sharing")}
                className="flex justify-between items-center p-6 w-full focus:outline-none"
              >
                <div className="flex items-center">
                  <FaShare className="w-6 h-6" />
                  <h2 className="ml-3 font-semibold text-2xl">
                    Information Sharing
                  </h2>
                </div>
                <svg
                  className={`w-6 h-6 transform transition-transform ${
                    activeSection === "information-sharing" ? "rotate-180" : ""
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
              {activeSection === "information-sharing" && (
                <div className="p-6 border-t">
                  <p className="mb-4">
                    We do not sell, rent, or trade your personal information to
                    third parties. Your privacy is important to us, and we are
                    committed to protecting the confidentiality of your data.
                    However, we may share your information in the following
                    circumstances, all of which are necessary to provide our
                    services or comply with legal obligations:
                  </p>
                  <ul className="space-y-2 mx-5 list-disc list-outside">
                    <li>
                      <strong>Third-party service providers:</strong> We may
                      share your information with trusted third-party service
                      providers who perform functions on our behalf, such as
                      processing payments, fulfilling orders, providing customer
                      support, marketing, or conducting analytics. These
                      third-party providers are contractually obligated to
                      safeguard your data and use it solely for the purpose of
                      performing their designated services for us. We carefully
                      select our partners and ensure they meet strict security
                      and privacy standards.
                    </li>
                    <li>
                      <strong>Legal requirements:</strong> We may disclose your
                      personal information if required by law, such as in
                      response to a subpoena, court order, or government
                      request. We may also disclose information to comply with
                      applicable regulations, protect our legal rights, or
                      investigate potential illegal activities or security
                      breaches.
                    </li>
                    <li>
                      <strong>Business transfers:</strong> In the event of a
                      merger, acquisition, or sale of assets, your information
                      may be transferred to the acquiring company or entity. If
                      this happens, we will ensure that your data remains
                      protected under the same level of privacy and security as
                      described in this policy. You will be notified if there
                      are any changes to the way your information is handled.
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* How We Protect Your Information */}
            <div
              ref={(el) => {
                sectionRefs.current["data-protection"] = el;
              }}
              className="shadow-md border rounded-xl overflow-hidden"
            >
              <button
                onClick={() => toggleSection("data-protection")}
                className="flex justify-between items-center p-6 w-full focus:outline-none"
              >
                <div className="flex items-center">
                  <FaShield className="w-6 h-6" />
                  <h2 className="ml-3 font-semibold text-2xl">
                    How We Protect Your Information
                  </h2>
                </div>
                <svg
                  className={`w-6 h-6 transform transition-transform ${
                    activeSection === "data-protection" ? "rotate-180" : ""
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
              {activeSection === "data-protection" && (
                <div className="p-6 border-t">
                  <p className="mb-4">
                    We take the security of your personal information very
                    seriously and are committed to ensuring your data remains
                    safe. To protect your information, we employ a combination
                    of advanced security technologies and practices to mitigate
                    risks. Here are the key security measures we use:
                  </p>
                  <ul className="space-y-2 mx-5 mb-4 list-disc list-outside">
                    <li>
                      <strong>Encryption of sensitive data:</strong> All
                      sensitive information, such as payment details, is
                      encrypted during transmission using industry-standard
                      encryption protocols like SSL/TLS. This ensures that your
                      data is securely transmitted and protected from
                      unauthorized interception.
                    </li>
                    <li>
                      <strong>Use of secure servers and firewalls:</strong> Our
                      website and databases are hosted on secure servers
                      protected by firewalls and other security technologies.
                      These firewalls help prevent unauthorized access and
                      safeguard your personal information from potential
                      threats.
                    </li>
                    <li>
                      <strong>Regular monitoring for vulnerabilities:</strong>{" "}
                      We continuously monitor our systems for potential
                      vulnerabilities, such as weaknesses that could be
                      exploited by hackers or malicious actors. This allows us
                      to proactively address any potential security issues
                      before they can compromise your data.
                    </li>
                    <li>
                      <strong>Limit access to personal data:</strong> Access to
                      personal information is restricted to authorized personnel
                      only, who are trained in data protection protocols. We
                      maintain strict control over who can access your
                      information to minimize the risk of unauthorized exposure.
                    </li>
                  </ul>
                  <p className="text-gray-700">
                    While we implement robust security measures to protect your
                    data, please note that no method of transmission over the
                    internet or method of electronic storage is 100% secure.
                    Despite our best efforts to safeguard your information, we
                    cannot guarantee the absolute security of your data. By
                    using our services, you acknowledge the inherent risks
                    associated with online transactions and understand that we
                    are continually working to improve our security practices.
                  </p>
                </div>
              )}
            </div>

            {/* Your Rights */}
            <div
              ref={(el) => {
                sectionRefs.current["your-rights"] = el;
              }}
              className="shadow-md border rounded-xl overflow-hidden"
            >
              <button
                onClick={() => toggleSection("your-rights")}
                className="flex justify-between items-center p-6 w-full focus:outline-none"
              >
                <div className="flex items-center">
                  <FaUserCheck className="w-6 h-6" />
                  <h2 className="ml-3 font-semibold text-2xl">Your Rights</h2>
                </div>
                <svg
                  className={`w-6 h-6 transform transition-transform ${
                    activeSection === "your-rights" ? "rotate-180" : ""
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
              {activeSection === "your-rights" && (
                <div className="p-6 border-t">
                  <p className="mb-4">
                    Depending on your location and applicable laws, you may have
                    the following rights with respect to your personal
                    information. These rights allow you to manage and control
                    how your data is collected, used, and stored. We are
                    committed to helping you exercise these rights in accordance
                    with relevant data protection regulations.
                  </p>
                  <ul className="space-y-2 mx-5 list-disc list-outside">
                    <li>
                      <strong>Access:</strong> You have the right to request a
                      copy of the personal information we hold about you. If you
                      wish to review, update, or correct any of the data we have
                      on file, you can contact us to obtain a copy of this
                      information. We may require proof of identity before
                      fulfilling such requests to protect your privacy.
                    </li>
                    <li>
                      <strong>Correction:</strong> If you believe that any of
                      the information we hold about you is inaccurate or
                      incomplete, you have the right to request corrections.
                      This ensures that the personal data we maintain is
                      accurate and up-to-date. You can contact us to make any
                      necessary adjustments to your information.
                    </li>
                    <li>
                      <strong>Deletion:</strong> You have the right to request
                      the deletion of your personal information under certain
                      circumstances. For example, you may request deletion if
                      your data is no longer necessary for the purposes for
                      which it was collected, or if you withdraw your consent.
                      However, please note that there may be legal obligations
                      that require us to retain some of your data even after
                      deletion requests.
                    </li>
                    <li>
                      <strong>Opt-out of marketing:</strong> If you no longer
                      wish to receive promotional emails, newsletters, or other
                      marketing communications, you can opt-out at any time by
                      unsubscribing through the provided link in our emails or
                      by contacting us directly. You will also be able to
                      opt-out of personalized ads or other targeted marketing
                      efforts.
                    </li>
                    <li>
                      <strong>Data portability:</strong> You may request that we
                      transfer your personal data to another service provider in
                      a structured, commonly used, and machine-readable format.
                      This allows you to move, copy, or transfer your data
                      easily between different services while maintaining
                      control over your personal information.
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Changes to Privacy Policy */}
            <div
              ref={(el) => {
                sectionRefs.current["changes"] = el;
              }}
              className="shadow-md border rounded-xl overflow-hidden"
            >
              <button
                onClick={() => toggleSection("changes")}
                className="flex justify-between items-center p-6 w-full focus:outline-none"
              >
                <div className="flex items-center">
                  <FaEdit className="w-6 h-6" />
                  <h2 className="ml-3 font-semibold text-2xl">
                    Changes to Privacy Policy
                  </h2>
                </div>
                <svg
                  className={`w-6 h-6 transform transition-transform ${
                    activeSection === "changes" ? "rotate-180" : ""
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
              {activeSection === "changes" && (
                <div className="p-6 border-t">
                  <p>
                    We reserve the right to update, modify, or revise this
                    privacy policy at any time to reflect changes in our
                    practices, comply with legal requirements, or improve our
                    services. When we make changes to this policy, we will
                    update the "Last Updated" date at the top of this page to
                    indicate the most recent revision. We encourage you to
                    periodically review this policy to stay informed about how
                    we are collecting, using, and protecting your personal
                    information. By continuing to use our services after any
                    updates are made, you acknowledge and agree to the changes.
                  </p>
                </div>
              )}
            </div>

            {/* Contact Us */}
            <div
              ref={(el) => {
                sectionRefs.current["contact"] = el;
              }}
              className="shadow-md border rounded-xl overflow-hidden"
            >
              <button
                onClick={() => toggleSection("contact")}
                className="flex justify-between items-center p-6 w-full focus:outline-none"
              >
                <div className="flex items-center">
                  <FaPhoneAlt className="w-6 h-6" />
                  <h2 className="ml-3 font-semibold text-2xl">Contact Us</h2>
                </div>
                <svg
                  className={`w-6 h-6 transform transition-transform ${
                    activeSection === "contact" ? "rotate-180" : ""
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
              {activeSection === "contact" && (
                <div className="p-6">
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <FaMailBulk className="flex-shrink-0 mt-1 mr-4 w-6 h-6" />
                      <div>
                        <h3 className="mb-2 font-medium text-lg">
                          Email Support
                        </h3>
                        <p className="mb-2">
                          For general inquiries, product questions, or issues
                          with your order, please contact us at:
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
                          We typically respond to emails within 24-48 hours
                          during business days.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <FaPhoneAlt className="flex-shrink-0 mt-1 mr-4 w-6 h-6" />
                      <div>
                        <h3 className="mb-2 font-medium text-lg">
                          Phone Support
                        </h3>
                        <p className="mb-2">
                          Our customer service team is available to take your
                          call at:
                        </p>
                        <a href="tel:+15551234567" className="font-medium">
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
                        <h3 className="mb-2 font-medium text-lg">Live Chat</h3>
                        <p className="mb-2">
                          If you'd prefer to chat with a representative in
                          real-time, you can reach us using the live chat
                          feature on our website.
                        </p>
                        <Button>Start Live Chat</Button>
                        <p className="mt-1 text-sm">
                          Live chat is available during business hours only.
                        </p>
                      </div>
                    </div>
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

export default PrivacyPolicy;
