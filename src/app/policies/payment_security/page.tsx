"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  CreditCard,
  Lock,
  Shield,
  AlertTriangle,
  Key,
  Server,
  FileText,
  Phone,
} from "lucide-react";

const PaymentSecurity = () => {
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
      id: "overview",
      title: "Security Overview",
      icon: <Shield className="h-5 w-5" />,
    },
    {
      id: "encryption",
      title: "Data Encryption",
      icon: <Lock className="h-5 w-5" />,
    },
    {
      id: "payment-processing",
      title: "Payment Processing",
      icon: <CreditCard className="h-5 w-5" />,
    },
    {
      id: "authentication",
      title: "Authentication Methods",
      icon: <Key className="h-5 w-5" />,
    },
    {
      id: "compliance",
      title: "Security Compliance",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      id: "monitoring",
      title: "Security Monitoring",
      icon: <Server className="h-5 w-5" />,
    },
    {
      id: "fraud",
      title: "Fraud Prevention",
      icon: <AlertTriangle className="h-5 w-5" />,
    },
    {
      id: "contact",
      title: "Contact Security Team",
      icon: <Phone className="h-5 w-5" />,
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
            <div className="max-w-7xl mx-auto px-4 pt-3 sm:px-6 lg:px-8 flex justify-between items-center">
              <p className="text-sm text-gray-600">
                By using our services, you acknowledge our security measures.
              </p>
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
                        <ul className="list-disc list-inside space-y-2">
                          <li>256-bit SSL encryption for all transactions</li>
                          <li>Secure storage of encrypted payment data</li>
                          <li>Regular security audits and updates</li>
                        </ul>
                      </div>
                    )}
                    {/* Add similar content blocks for other sections */}
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
