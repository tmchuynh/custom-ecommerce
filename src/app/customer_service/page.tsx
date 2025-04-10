"use client";
import { Button } from "@/components/ui/button";
import { customerServiceFAQs } from "@/lib/constants/faqs";
import { customer_service_sections } from "@/lib/constants/informationDetails";
import { scrollToSection, toggleAccordionSection } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import {
  FaClock,
  FaCreditCard,
  FaGift,
  FaMailBulk,
  FaPhone,
  FaShoppingBag,
  FaTag,
} from "react-icons/fa";
import { FaGlobe, FaMessage, FaTruckFast } from "react-icons/fa6";
import { FiHelpCircle } from "react-icons/fi";
import { IoMdRefresh } from "react-icons/io";

/**
 * CustomerService Component
 *
 * A comprehensive customer service page component that provides various support resources and information.
 *
 * @component
 *
 * @features
 * - Interactive table of contents with smooth scrolling
 * - Collapsible customer_service_sections for different support topics
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
 * - toggleSection: Handles expanding/collapsing accordion customer_service_sections
 * - handleScrollToSection: Manages smooth scrolling to selected customer_service_sections
 *
 * @customer_service_sections
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

  return (
    <div className="min-h-screen">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-7xl">
        <div className="mb-12 text-center">
          <h1 className="mb-4 font-extrabold text-5xl">Customer Service</h1>
          <p className="mx-auto max-w-2xl text-xl">
            We're here to help! Our customer service team is available to assist
            you with any questions or concerns.
          </p>
        </div>

        <div className="gap-8 grid grid-cols-1 lg:grid-cols-7">
          {/* Table of Contents Sidebar */}
          <div className="lg:col-span-2">
            <div className="top-18 sticky shadow-md p-6 border rounded-xl">
              <h2 className="mb-4 font-bold text-xl">Contents</h2>
              <ul className="space-y-2">
                {customer_service_sections.map((section) => (
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
              {/* Contact Cards */}
              <div className="space-y-4 mt-8">
                <div className="flex items-start bg-muted p-4 rounded-lg">
                  <FaMailBulk className="flex-shrink-0 mt-0.5 mr-3 w-5 h-5" />
                  <div>
                    <h3 className="mb-1 font-medium">Email Us</h3>
                    <a
                      href="mailto:support@yourcompany.com"
                      className="text-sm hover:underline"
                    >
                      support@yourcompany.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start bg-muted p-4 rounded-lg">
                  <FaPhone className="flex-shrink-0 mt-0.5 mr-3 w-5 h-5" />
                  <div>
                    <h3 className="mb-1 font-medium">Call Us</h3>
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
                  <FiHelpCircle className="w-6 h-6" />
                  <h2 className="ml-3 font-semibold text-2xl">
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
                    <p className="mb-2 font-medium">Popular support options:</p>
                    <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
                      <a
                        href="#track-order"
                        onClick={() => handleScrollToSection("faq")}
                        className="flex items-center hover:underline"
                      >
                        <FaShoppingBag className="mr-2 w-4 h-4" /> Track your
                        order
                      </a>
                      <a
                        href="#return-policy"
                        onClick={() => handleScrollToSection("faq")}
                        className="flex items-center hover:underline"
                      >
                        <IoMdRefresh className="mr-2 w-4 h-4" /> Return policy
                      </a>
                      <a
                        href="#shipping"
                        onClick={() => handleScrollToSection("faq")}
                        className="flex items-center hover:underline"
                      >
                        <FaTruckFast className="mr-2 w-4 h-4" /> Shipping
                        information
                      </a>
                      <a
                        href="#payment"
                        onClick={() => handleScrollToSection("faq")}
                        className="flex items-center hover:underline"
                      >
                        <FaCreditCard className="mr-2 w-4 h-4" /> Payment
                        methods
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
              className="shadow-md border rounded-xl overflow-hidden"
            >
              <button
                onClick={() => toggleSection("contact")}
                className="flex justify-between items-center p-6 w-full focus:outline-none"
              >
                <div className="flex items-center">
                  <FaPhone className="w-6 h-6" />
                  <h2 className="ml-3 font-semibold text-2xl">
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
                      <FaPhone className="flex-shrink-0 mt-1 mr-4 w-6 h-6" />
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

            {/* Business Hours */}
            <div
              ref={(el) => {
                sectionRefs.current["hours"] = el;
              }}
              className="shadow-md border rounded-xl overflow-hidden"
            >
              <button
                onClick={() => toggleSection("hours")}
                className="flex justify-between items-center p-6 w-full focus:outline-none"
              >
                <div className="flex items-center">
                  <FaClock className="w-6 h-6" />
                  <h2 className="ml-3 font-semibold text-2xl">
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
                    <table className="divide-y min-w-full">
                      <thead>
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 font-medium text-left text-xs uppercase tracking-wider"
                          >
                            Day
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 font-medium text-left text-xs uppercase tracking-wider"
                          >
                            Hours (EST)
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        <tr>
                          <td className="px-6 py-4 font-medium text-sm whitespace-nowrap">
                            Monday
                          </td>
                          <td className="px-6 py-4 text-sm whitespace-nowrap">
                            9:00 AM - 6:00 PM
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 font-medium text-sm whitespace-nowrap">
                            Tuesday
                          </td>
                          <td className="px-6 py-4 text-sm whitespace-nowrap">
                            9:00 AM - 6:00 PM
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 font-medium text-sm whitespace-nowrap">
                            Wednesday
                          </td>
                          <td className="px-6 py-4 text-sm whitespace-nowrap">
                            9:00 AM - 6:00 PM
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 font-medium text-sm whitespace-nowrap">
                            Thursday
                          </td>
                          <td className="px-6 py-4 text-sm whitespace-nowrap">
                            9:00 AM - 6:00 PM
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 font-medium text-sm whitespace-nowrap">
                            Friday
                          </td>
                          <td className="px-6 py-4 text-sm whitespace-nowrap">
                            9:00 AM - 6:00 PM
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 font-medium text-sm whitespace-nowrap">
                            Saturday
                          </td>
                          <td className="px-6 py-4 text-sm whitespace-nowrap">
                            10:00 AM - 4:00 PM
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 font-medium text-sm whitespace-nowrap">
                            Sunday
                          </td>
                          <td className="px-6 py-4 text-sm whitespace-nowrap">
                            Closed
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="mt-4 text-sm">
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
              className="shadow-md border rounded-xl overflow-hidden"
            >
              <button
                onClick={() => toggleSection("faq")}
                className="flex justify-between items-center p-6 w-full focus:outline-none"
              >
                <div className="flex items-center">
                  <FaMessage className="w-6 h-6" />
                  <h2 className="ml-3 font-semibold text-2xl">
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
                        <h3 className="flex items-start mb-2 font-medium text-lg">
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

                  <div className="flex justify-center mt-6">
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
              className="shadow-md border rounded-xl overflow-hidden"
            >
              <button
                onClick={() => toggleSection("other-services")}
                className="flex justify-between items-center p-6 w-full focus:outline-none"
              >
                <div className="flex items-center">
                  <FaGift className="w-6 h-6" />
                  <h2 className="ml-3 font-semibold text-2xl">
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

                  <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
                    <div className="group flex p-4 rounded-lg">
                      <FaGift className="flex-shrink-0 mt-1 mr-3 w-5 h-5" />
                      <div>
                        <a href="/info/gift_cards">
                          <h3 className="mb-2 font-medium underline-offset-4 group-hover:underline">
                            Gift Cards
                          </h3>
                          <p className="text-sm">
                            Purchase a gift card for friends or family, and let
                            them shop for their favorite products on our site.
                          </p>
                        </a>
                        <Button
                          variant={"link"}
                          onClick={() => router.push("/info/gift-cards")}
                          className="px-0"
                        >
                          Learn more
                        </Button>
                      </div>
                    </div>

                    <div className="group flex p-4 rounded-lg">
                      <FaTag className="flex-shrink-0 mt-1 mr-3 w-5 h-5" />
                      <div>
                        <a href="/customer_service/track_order">
                          <h3 className="mb-2 font-medium underline-offset-4 group-hover:underline">
                            Track Your Order
                          </h3>
                          <p className="text-sm">
                            Use our order tracking tool to check the status of
                            your shipment and get real-time updates.
                          </p>
                        </a>
                        <Button
                          variant={"link"}
                          onClick={() =>
                            router.push("/customer_service/track_order")
                          }
                          className="px-0"
                        >
                          Learn more
                        </Button>
                      </div>
                    </div>

                    <div className="group flex p-4 rounded-lg">
                      <FaShoppingBag className="flex-shrink-0 mt-1 mr-3 w-5 h-5" />
                      <div>
                        <a href="/info/product_recommendations">
                          <h3 className="mb-2 font-medium underline-offset-4 group-hover:underline">
                            Product Recommendations
                          </h3>
                          <p className="text-sm">
                            Our team is happy to assist you in finding the
                            perfect product for your needs.
                          </p>
                        </a>{" "}
                        <Button
                          variant={"link"}
                          onClick={() =>
                            router.push("/info/product_recommendations")
                          }
                          className="px-0"
                        >
                          Learn more
                        </Button>
                      </div>
                    </div>

                    <div className="group flex p-4 rounded-lg">
                      <FaGlobe className="flex-shrink-0 mt-1 mr-3 w-5 h-5" />
                      <div>
                        <a href="/info/international_orders">
                          <h3 className="mb-2 font-medium underline-offset-4 group-hover:underline">
                            International Orders
                          </h3>
                          <p className="text-sm">
                            We offer special assistance for international
                            customers with customs documentation and shipping
                            concerns.
                          </p>
                        </a>
                        <Button
                          variant={"link"}
                          onClick={() =>
                            router.push("/info/international_orders")
                          }
                          className="px-0"
                        >
                          Learn more
                        </Button>
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
