"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Database,
  FileText,
  Share2,
  Shield,
  UserCheck,
  Cookie,
  Edit3,
  Phone,
  User,
} from "lucide-react";

const PrivacyPolicy = () => {
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
      id: "information-collect",
      title: "Information We Collect",
      icon: <Database className="h-5 w-5" />,
    },
    {
      id: "information-usage",
      title: "How We Use Your Information",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      id: "information-sharing",
      title: "Information Sharing",
      icon: <Share2 className="h-5 w-5" />,
    },
    {
      id: "data-protection",
      title: "How We Protect Your Information",
      icon: <Shield className="h-5 w-5" />,
    },
    {
      id: "your-rights",
      title: "Your Rights",
      icon: <UserCheck className="h-5 w-5" />,
    },
    {
      id: "cookies",
      title: "Cookies Policy",
      icon: <Cookie className="h-5 w-5" />,
    },
    {
      id: "changes",
      title: "Changes to Privacy Policy",
      icon: <Edit3 className="h-5 w-5" />,
    },
    { id: "contact", title: "Contact Us", icon: <Phone className="h-5 w-5" /> },
  ];

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold mb-4">Privacy Policy</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Protecting your privacy is important to us. Please read this privacy
            policy carefully to understand how we collect, use, and protect your
            information.
          </p>
          <p className="text-sm mt-2">Last Updated: June 10, 2023</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Table of Contents Sidebar */}
          <div className="lg:col-span-1">
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
          <div className="lg:col-span-3 space-y-6">
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
                    At [Your Company Name], we value the privacy of our
                    customers and are committed to safeguarding any personal
                    information you provide to us. This privacy policy outlines
                    how we collect, use, disclose, and protect your personal
                    data when you use our services.
                  </p>
                </div>
              )}
            </div>

            {/* Information We Collect */}
            <div
              ref={(el) => {
                sectionRefs.current["information-collect"] = el;
              }}
              className="rounded-xl border-2 shadow-md overflow-hidden"
            >
              <button
                onClick={() => toggleSection("information-collect")}
                className="w-full flex items-center justify-between p-6 focus:outline-none"
              >
                <div className="flex items-center">
                  <Database className="h-6 w-6" />
                  <h2 className="text-2xl font-semibold ml-3">
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
                    non-personal information.
                  </p>

                  <h3 className="text-xl font-medium mb-2">
                    Personal Information
                  </h3>
                  <p className="mb-4">
                    When you make a purchase, create an account, or interact
                    with our website, we may collect personal information,
                    including but not limited to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 mb-4">
                    <li>Name</li>
                    <li>Email address</li>
                    <li>Phone number</li>
                    <li>Billing and shipping address</li>
                    <li>Payment information (e.g., credit card details)</li>
                    <li>Order history</li>
                  </ul>

                  <h3 className="text-xl font-medium mb-2">
                    Non-Personal Information
                  </h3>
                  <p className="mb-4">
                    We also collect non-personal information, such as:
                  </p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Browser type and version</li>
                    <li>Operating system</li>
                    <li>IP address</li>
                    <li>Device information (e.g., mobile or desktop)</li>
                    <li>
                      Browsing behavior (e.g., pages visited, time spent on the
                      site)
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
              className="rounded-xl border-2 shadow-md overflow-hidden"
            >
              <button
                onClick={() => toggleSection("information-usage")}
                className="w-full flex items-center justify-between p-6 focus:outline-none"
              >
                <div className="flex items-center">
                  <FileText className="h-6 w-6" />
                  <h2 className="text-2xl font-semibold ml-3">
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
                    We use the information we collect for various purposes,
                    including:
                  </p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>To process and fulfill your orders</li>
                    <li>To improve our products and services</li>
                    <li>To personalize your shopping experience</li>
                    <li>
                      To communicate with you about your orders or updates to
                      our services
                    </li>
                    <li>
                      To send promotional emails, newsletters, or offers (with
                      your consent)
                    </li>
                    <li>
                      To analyze usage patterns and enhance website performance
                    </li>
                    <li>
                      To prevent fraudulent activities and protect our site from
                      security threats
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
              className="rounded-xl border-2 shadow-md overflow-hidden"
            >
              <button
                onClick={() => toggleSection("information-sharing")}
                className="w-full flex items-center justify-between p-6 focus:outline-none"
              >
                <div className="flex items-center">
                  <Share2 className="h-6 w-6" />
                  <h2 className="text-2xl font-semibold ml-3">
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
                    third parties. However, we may share your data in the
                    following circumstances:
                  </p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>
                      <span className="font-medium">
                        Third-party service providers:
                      </span>{" "}
                      We may share your information with trusted partners who
                      perform services on our behalf (e.g., payment processing,
                      shipping, marketing). These third parties are obligated to
                      protect your information and use it only for the purpose
                      of providing services to us.
                    </li>
                    <li>
                      <span className="font-medium">Legal requirements:</span>{" "}
                      We may disclose your information if required by law, such
                      as in response to a subpoena, court order, or government
                      request.
                    </li>
                    <li>
                      <span className="font-medium">Business transfers:</span>{" "}
                      In the event of a merger, acquisition, or sale of assets,
                      your information may be transferred to the acquiring
                      party.
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
              className="rounded-xl border-2 shadow-md overflow-hidden"
            >
              <button
                onClick={() => toggleSection("data-protection")}
                className="w-full flex items-center justify-between p-6 focus:outline-none"
              >
                <div className="flex items-center">
                  <Shield className="h-6 w-6" />
                  <h2 className="text-2xl font-semibold ml-3">
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
                    We take the security of your personal information seriously.
                    To protect your data, we employ the following security
                    measures:
                  </p>
                  <ul className="list-disc list-inside space-y-2 mb-4">
                    <li>
                      Encryption of sensitive data (e.g., payment information)
                      during transmission
                    </li>
                    <li>
                      Use of secure servers and firewalls to protect against
                      unauthorized access
                    </li>
                    <li>
                      Regular monitoring for potential vulnerabilities or data
                      breaches
                    </li>
                    <li>
                      Limit access to personal data to authorized personnel only
                    </li>
                  </ul>
                  <p className="text-gray-700">
                    While we implement strong security practices, no method of
                    transmission over the internet is 100% secure. We cannot
                    guarantee the absolute security of your information.
                  </p>
                </div>
              )}
            </div>

            {/* Your Rights */}
            <div
              ref={(el) => {
                sectionRefs.current["your-rights"] = el;
              }}
              className="rounded-xl border-2 shadow-md overflow-hidden"
            >
              <button
                onClick={() => toggleSection("your-rights")}
                className="w-full flex items-center justify-between p-6 focus:outline-none"
              >
                <div className="flex items-center">
                  <UserCheck className="h-6 w-6" />
                  <h2 className="text-2xl font-semibold ml-3">Your Rights</h2>
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
                    information:
                  </p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>
                      <span className="font-medium">Access:</span> You have the
                      right to request a copy of the personal information we
                      hold about you.
                    </li>
                    <li>
                      <span className="font-medium">Correction:</span> You have
                      the right to request corrections to any inaccurate or
                      incomplete information.
                    </li>
                    <li>
                      <span className="font-medium">Deletion:</span> You have
                      the right to request the deletion of your personal
                      information under certain circumstances.
                    </li>
                    <li>
                      <span className="font-medium">Opt-out of marketing:</span>{" "}
                      You can opt-out of receiving promotional emails or
                      newsletters at any time by unsubscribing.
                    </li>
                    <li>
                      <span className="font-medium">Data portability:</span> You
                      may request that we transfer your personal data to another
                      service provider.
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Cookies Policy */}
            <div
              ref={(el) => {
                sectionRefs.current["cookies"] = el;
              }}
              className="rounded-xl border-2 shadow-md overflow-hidden"
            >
              <button
                onClick={() => toggleSection("cookies")}
                className="w-full flex items-center justify-between p-6 focus:outline-none"
              >
                <div className="flex items-center">
                  <Cookie className="h-6 w-6" />
                  <h2 className="text-2xl font-semibold ml-3">
                    Cookies Policy
                  </h2>
                </div>
                <svg
                  className={`w-6 h-6 transform transition-transform ${
                    activeSection === "cookies" ? "rotate-180" : ""
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
              {activeSection === "cookies" && (
                <div className="p-6 border-t">
                  <p className="mb-4">
                    We use cookies to improve your browsing experience on our
                    website. Cookies are small text files that are stored on
                    your device and help us:
                  </p>
                  <ul className="list-disc list-inside space-y-2 mb-4">
                    <li>Remember your preferences and settings</li>
                    <li>Analyze site traffic and usage patterns</li>
                    <li>Personalize content and advertising</li>
                  </ul>
                  <p className="text-gray-700">
                    You can choose to disable cookies in your browser settings,
                    but doing so may affect your ability to use certain features
                    on our website.
                  </p>
                </div>
              )}
            </div>

            {/* Changes to Privacy Policy */}
            <div
              ref={(el) => {
                sectionRefs.current["changes"] = el;
              }}
              className="rounded-xl border-2 shadow-md overflow-hidden"
            >
              <button
                onClick={() => toggleSection("changes")}
                className="w-full flex items-center justify-between p-6 focus:outline-none"
              >
                <div className="flex items-center">
                  <Edit3 className="h-6 w-6" />
                  <h2 className="text-2xl font-semibold ml-3">
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
                  <p className="text-gray-700">
                    We reserve the right to update or modify this privacy policy
                    at any time. When we make changes, we will update the "Last
                    Updated" date at the top of this page. We encourage you to
                    review this policy periodically to stay informed about how
                    we are protecting your information.
                  </p>
                </div>
              )}
            </div>

            {/* Contact Us */}
            <div
              ref={(el) => {
                sectionRefs.current["contact"] = el;
              }}
              className="rounded-xl border-2 shadow-md overflow-hidden"
            >
              <button
                onClick={() => toggleSection("contact")}
                className="w-full flex items-center justify-between p-6 focus:outline-none"
              >
                <div className="flex items-center">
                  <Phone className="h-6 w-6" />
                  <h2 className="text-2xl font-semibold ml-3">Contact Us</h2>
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
                <div className="p-6 border-t">
                  <p className="mb-4">
                    If you have any questions or concerns about this privacy
                    policy or how we handle your personal information, please
                    contact us at:
                  </p>
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-700">
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
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Accept Button */}
      <div className="fixed bottom-0 left-0 right-0 shadow-md p-4 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <p className="text-sm">
            By continuing to use our site, you agree to our privacy policy.
          </p>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6">
            Accept Privacy Policy
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
