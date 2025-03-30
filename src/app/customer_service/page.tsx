"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  HelpCircle,
  Phone,
  Mail,
  MessageSquare,
  Clock,
  Tag,
  CreditCard,
  Gift,
  ShoppingBag,
  Truck,
  RefreshCw,
  Globe,
} from "lucide-react";
import { customerServiceFAQs } from "@/lib/faqs";
import { toggleAccordionSection, scrollToSection } from "@/lib/utils/utils";

/**
 * CustomerService Component
 *
 * A comprehensive customer service page component that provides various support resources and information.
 *
 * @component
 *
 * @features
 * - Interactive table of contents with smooth scrolling
 * - Collapsible sections for different support topics
 * - Contact information display
 * - Business hours table
 * - FAQ section
 * - Additional services overview
 *
 * @state
 * - activeSection: Tracks which accordion section is currently expanded
 * - sectionRefs: Maintains references to section DOM elements for scrolling
 *
 * @methods
 * - toggleSection: Handles expanding/collapsing accordion sections
 * - handleScrollToSection: Manages smooth scrolling to selected sections
 *
 * @sections
 * - Introduction
 * - Contact Information
 * - Business Hours
 * - Frequently Asked Questions
 * - Other Services
 *
 * @sidepanel
 * - Quick navigation menu
 * - Contact cards with email and phone information
 *
 * @returns React component that renders a full customer service support page
 */
const CustomerService = () => {
  const router = useRouter();
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

  const sections = [
    {
      id: "introduction",
      title: "How Can We Help You?",
      icon: <HelpCircle className="h-5 w-5" />,
    },
    {
      id: "contact",
      title: "Contact Information",
      icon: <Phone className="h-5 w-5" />,
    },
    {
      id: "hours",
      title: "Business Hours",
      icon: <Clock className="h-5 w-5" />,
    },
    {
      id: "faq",
      title: "Frequently Asked Questions",
      icon: <MessageSquare className="h-5 w-5" />,
    },
    {
      id: "other-services",
      title: "Other Services",
      icon: <Gift className="h-5 w-5" />,
    },
  ];

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold mb-4">Customer Service</h1>
          <p className="text-xl max-w-2xl mx-auto">
            We're here to help! Our customer service team is available to assist
            you with any questions or concerns.
          </p>
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
                      {section.icon}
                      <span className="ml-2 text-sm font-medium">
                        {section.title}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
              {/* Contact Cards */}
              <div className="mt-8 space-y-4">
                <div className="p-4 rounded-lg flex items-start bg-muted">
                  <Mail className="h-5 w-5 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium mb-1">Email Us</h3>
                    <a
                      href="mailto:support@yourcompany.com"
                      className="text-sm hover:underline"
                    >
                      support@yourcompany.com
                    </a>
                  </div>
                </div>

                <div className="p-4 rounded-lg flex items-start bg-muted">
                  <Phone className="h-5 w-5 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium mb-1">Call Us</h3>
                    <a
                      href="tel:+15551234567"
                      className="text-sm hover:underline"
                    >
                      +1 (555) 123-4567
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-5 space-y-8">
            {/* Introduction */}
            <div
              ref={(el) => {
                sectionRefs.current["introduction"] = el;
              }}
              className="border rounded-xl shadow-md overflow-hidden"
            >
              <button
                onClick={() => toggleSection("introduction")}
                className="w-full flex items-center justify-between p-6 focus:outline-none"
              >
                <div className="flex items-center">
                  <HelpCircle className="h-6 w-6" />
                  <h2 className="text-2xl font-semibold ml-3">
                    How Can We Help You?
                  </h2>
                </div>
                <svg
                  className={`w-6 h-6 transform transition-transform ${
                    activeSection === "introduction" ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 24 24"
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
                  <p className="mb-4">
                    Whether you have a question about your order, need
                    assistance with returns, or simply want to learn more about
                    our products and services, we are here to help. Our
                    dedicated support team is available to ensure you have the
                    best shopping experience. Below, you'll find all the contact
                    information you need, along with our hours of operation and
                    a helpful FAQ section to answer some of the most common
                    questions.
                  </p>
                  <div className="p-4 rounded-lg">
                    <p className="font-medium mb-2">Popular support options:</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <a
                        href="#track-order"
                        onClick={() => handleScrollToSection("faq")}
                        className="flex items-center hover:underline"
                      >
                        <ShoppingBag className="h-4 w-4 mr-2" /> Track your
                        order
                      </a>
                      <a
                        href="#return-policy"
                        onClick={() => handleScrollToSection("faq")}
                        className="flex items-center hover:underline"
                      >
                        <RefreshCw className="h-4 w-4 mr-2" /> Return policy
                      </a>
                      <a
                        href="#shipping"
                        onClick={() => handleScrollToSection("faq")}
                        className="flex items-center hover:underline"
                      >
                        <Truck className="h-4 w-4 mr-2" /> Shipping information
                      </a>
                      <a
                        href="#payment"
                        onClick={() => handleScrollToSection("faq")}
                        className="flex items-center hover:underline"
                      >
                        <CreditCard className="h-4 w-4 mr-2" /> Payment methods
                      </a>
                    </div>
                  </div>
                  <p className="mt-4">
                    If you can't find what you're looking for or need further
                    assistance, feel free to reach out to our customer support
                    team. We are available to assist you through live chat,
                    email, or phone during our operating hours. We're committed
                    to providing fast and effective support for all your needs.
                  </p>
                </div>
              )}
            </div>

            {/* Contact Information */}
            <div
              ref={(el) => {
                sectionRefs.current["contact"] = el;
              }}
              className="border rounded-xl shadow-md overflow-hidden"
            >
              <button
                onClick={() => toggleSection("contact")}
                className="w-full flex items-center justify-between p-6 focus:outline-none"
              >
                <div className="flex items-center">
                  <Phone className="h-6 w-6" />
                  <h2 className="text-2xl font-semibold ml-3">
                    Contact Information
                  </h2>
                </div>
                <svg
                  className={`w-6 h-6 transform transition-transform ${
                    activeSection === "contact" ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 24 24"
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
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <Mail className="h-6 w-6 mt-1 mr-4 flex-shrink-0" />
                      <div>
                        <h3 className="text-lg font-medium mb-2">
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
                        <p className="text-sm mt-1">
                          We typically respond to emails within 24-48 hours
                          during business days.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Phone className="h-6 w-6 mt-1 mr-4 flex-shrink-0" />
                      <div>
                        <h3 className="text-lg font-medium mb-2">
                          Phone Support
                        </h3>
                        <p className="mb-2">
                          Our customer service team is available to take your
                          call at:
                        </p>
                        <a href="tel:+15551234567" className="font-medium">
                          +1 (555) 123-4567
                        </a>
                        <p className="text-sm mt-1">
                          Please check our business hours below for
                          availability.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <MessageSquare className="h-6 w-6 mt-1 mr-4 flex-shrink-0" />
                      <div>
                        <h3 className="text-lg font-medium mb-2">Live Chat</h3>
                        <p className="mb-2">
                          If you'd prefer to chat with a representative in
                          real-time, you can reach us using the live chat
                          feature on our website.
                        </p>
                        <Button className="">Start Live Chat</Button>
                        <p className="text-sm mt-1">
                          Live chat is available during business hours only.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Business Hours */}
            <div
              ref={(el) => {
                sectionRefs.current["hours"] = el;
              }}
              className="border rounded-xl shadow-md overflow-hidden"
            >
              <button
                onClick={() => toggleSection("hours")}
                className="w-full flex items-center justify-between p-6 focus:outline-none"
              >
                <div className="flex items-center">
                  <Clock className="h-6 w-6" />
                  <h2 className="text-2xl font-semibold ml-3">
                    Business Hours
                  </h2>
                </div>
                <svg
                  className={`w-6 h-6 transform transition-transform ${
                    activeSection === "hours" ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {activeSection === "hours" && (
                <div className="p-6 border-t">
                  <p className="mb-4">
                    Our customer service team is available during the following
                    hours. We strive to respond to all inquiries as quickly as
                    possible, but please allow up to 48 hours for email
                    responses.
                  </p>
                  <div className="rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y">
                      <thead className="">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                          >
                            Day
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                          >
                            Hours (EST)
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            Monday
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            9:00 AM - 6:00 PM
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            Tuesday
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            9:00 AM - 6:00 PM
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            Wednesday
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            9:00 AM - 6:00 PM
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            Thursday
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            9:00 AM - 6:00 PM
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            Friday
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            9:00 AM - 6:00 PM
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            Saturday
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            10:00 AM - 4:00 PM
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            Sunday
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            Closed
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="text-sm mt-4">
                    * Hours may vary on holidays. Please check our website for
                    holiday schedules.
                  </p>
                </div>
              )}
            </div>

            {/* Frequently Asked Questions */}
            <div
              ref={(el) => {
                sectionRefs.current["faq"] = el;
              }}
              className="border rounded-xl shadow-md overflow-hidden"
            >
              <button
                onClick={() => toggleSection("faq")}
                className="w-full flex items-center justify-between p-6 focus:outline-none"
              >
                <div className="flex items-center">
                  <MessageSquare className="h-6 w-6" />
                  <h2 className="text-2xl font-semibold ml-3">
                    Frequently Asked Questions
                  </h2>
                </div>
                <svg
                  className={`w-6 h-6 transform transition-transform ${
                    activeSection === "faq" ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {activeSection === "faq" && (
                <div className="p-6 border-t">
                  <p className="mb-6">
                    Below are some of the most common questions we receive from
                    customers. If your question is not answered here, please
                    don't hesitate to reach out to us directly.
                  </p>

                  <div className="space-y-6">
                    {customerServiceFAQs.map((faq, index) => (
                      <div key={index} className="p-4 rounded-lg">
                        <h3 className="text-lg font-medium mb-2 flex items-start">
                          <span className="mr-2">Q:</span>
                          {faq.question}
                        </h3>
                        <div className="ml-6">
                          {typeof faq.answer === "string" ? (
                            <p>{faq.answer}</p>
                          ) : (
                            faq.answer
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex justify-center">
                    <Button onClick={() => handleScrollToSection("contact")}>
                      Still have questions? Contact us
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Other Services */}
            <div
              ref={(el) => {
                sectionRefs.current["other-services"] = el;
              }}
              className="border rounded-xl shadow-md overflow-hidden"
            >
              <button
                onClick={() => toggleSection("other-services")}
                className="w-full flex items-center justify-between p-6 focus:outline-none"
              >
                <div className="flex items-center">
                  <Gift className="h-6 w-6" />
                  <h2 className="text-2xl font-semibold ml-3">
                    Other Services
                  </h2>
                </div>
                <svg
                  className={`w-6 h-6 transform transition-transform ${
                    activeSection === "other-services" ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {activeSection === "other-services" && (
                <div className="p-6 border-t">
                  <p className="mb-6">
                    In addition to our customer support services, we also offer
                    several other services to enhance your shopping experience:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg flex">
                      <Gift className="h-5 w-5 mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium mb-2">Gift Cards</h3>
                        <p className="text-sm">
                          Purchase a gift card for friends or family, and let
                          them shop for their favorite products on our site.
                        </p>
                        <a
                          href="/gift-cards"
                          className="text-sm mt-2 inline-block hover:underline"
                        >
                          Learn more
                        </a>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg flex">
                      <Tag className="h-5 w-5 mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium mb-2">Track Your Order</h3>
                        <p className="text-sm">
                          Use our order tracking tool to check the status of
                          your shipment and get real-time updates.
                        </p>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg flex">
                      <ShoppingBag className="h-5 w-5 mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium mb-2">
                          Product Recommendations
                        </h3>
                        <p className="text-sm">
                          Our team is happy to assist you in finding the perfect
                          product for your needs.
                        </p>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg flex">
                      <Globe className="h-5 w-5 mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium mb-2">
                          International Orders
                        </h3>
                        <p className="text-sm">
                          We offer special assistance for international
                          customers with customs documentation and shipping
                          concerns.
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

export default CustomerService;
