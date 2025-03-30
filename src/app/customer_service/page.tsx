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

const CustomerService = () => {
  const router = useRouter();
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

  // FAQ questions for easier management
  const faqs = [
    {
      question: "How do I track my order?",
      answer:
        "Once your order has shipped, you will receive a tracking number via email. This tracking number can be used on the carrier’s website (e.g., USPS, FedEx, UPS) to check the status of your shipment, including its current location and estimated delivery date. If you did not receive a tracking number or have any issues with tracking, please reach out to our customer support team for assistance.",
    },
    {
      question: "What is your return policy?",
      answer: (
        <>
          We offer a 30-day return policy for most items. If you are not
          satisfied with your purchase, you can return it within 30 days of
          receiving the item. To ensure a smooth return, items must be unused,
          in their original condition, and in the original packaging. To learn
          more, visit our{" "}
          <a href="/policies/return_policy" className="hover:underline">
            Return Policy page
          </a>
          .
        </>
      ),
    },
    {
      question: "How can I change or cancel my order?",
      answer: (
        <>
          If you need help to change or cancel your order, please contact us as
          soon as possible. We process orders quickly, and once your order has
          been shipped, we may not be able to make any changes or cancellations.
          If your order has not yet shipped, we’ll do our best to accommodate
          your request. For further assistance, please reach out to our customer
          support team.
        </>
      ),
    },
    {
      question: "How do I apply a discount code?",
      answer:
        "During checkout, you will see an option to enter a promo or discount code. Simply type or paste the code in the designated box, and the discount will automatically be applied to your order total. If the code is not working, make sure it’s entered correctly, and that it’s still valid for your current order. Some codes may have specific terms, such as minimum purchase requirements or expiration dates.",
    },
    {
      question: "Do you offer international shipping?",
      answer:
        "Yes, we offer international shipping to select countries. Shipping fees and delivery times may vary depending on your location. During checkout, you will be able to see the applicable shipping costs and estimated delivery times for your country. Please note that international shipments may be subject to customs duties, taxes, or fees, which are the responsibility of the customer. For more details, check our shipping information or contact our customer service team.",
    },
    {
      question: "Can I return sale or discounted items?",
      answer:
        "Sale or discounted items may be eligible for return, but there are certain exclusions. Please refer to our Return Policy page for details about which items can be returned. In general, items marked as 'final sale' or 'non-returnable' cannot be returned.",
    },
    {
      question: "How do I know if an item is eligible for a return?",
      answer:
        "To be eligible for a return, the item must be unused, in its original packaging, and in the same condition as when you received it. Some items may have specific return conditions, such as hygiene products or custom-made items, which are not eligible for return. For more information, please refer to our Return Policy page.",
    },
    {
      question: "How do I check my order history?",
      answer:
        "To view your order history, simply log into your account and go to the 'Order History' section. You'll be able to view all your past orders, track their status, and request returns or exchanges if applicable. If you don't have an account, you can still check the status of your order using the tracking number provided.",
    },
    {
      question: "What should I do if I receive a damaged or defective item?",
      answer:
        "If you receive a damaged or defective item, please contact us within 7 days of receiving the product. We’ll assist you with a return, replacement, or refund, depending on the issue. Please provide photos of the damage or defect to help us process your request faster.",
    },
    {
      question: "Can I use more than one discount code?",
      answer:
        "Unfortunately, only one discount code can be applied to each order. If you have multiple valid discount codes, you will need to choose the one that gives you the best discount. Keep an eye out for special promotions that allow you to combine offers on select items.",
    },
    {
      question: "What shipping carriers do you use?",
      answer:
        "We use a variety of shipping carriers, including USPS, FedEx, UPS, and DHL, depending on your location and the shipping method you select. You will receive tracking information via email once your order ships, including the name of the carrier and the tracking number.",
    },
    {
      question: "Do you offer gift wrapping services?",
      answer:
        "Currently, we do not offer gift wrapping services. However, we are exploring this option for the future. We recommend checking out our website for any upcoming promotions or new services.",
    },
    {
      question: "Can I change my shipping address after the order is placed?",
      answer:
        "If your order has not yet been shipped, please contact us immediately, and we will do our best to update your shipping address. However, once the order has been shipped, we cannot make changes to the shipping address. Please ensure your address is correct at checkout to avoid delivery issues.",
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
                        onClick={() => scrollToSection("faq")}
                        className="flex items-center hover:underline"
                      >
                        <ShoppingBag className="h-4 w-4 mr-2" /> Track your
                        order
                      </a>
                      <a
                        href="#return-policy"
                        onClick={() => scrollToSection("faq")}
                        className="flex items-center hover:underline"
                      >
                        <RefreshCw className="h-4 w-4 mr-2" /> Return policy
                      </a>
                      <a
                        href="#shipping"
                        onClick={() => scrollToSection("faq")}
                        className="flex items-center hover:underline"
                      >
                        <Truck className="h-4 w-4 mr-2" /> Shipping information
                      </a>
                      <a
                        href="#payment"
                        onClick={() => scrollToSection("faq")}
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
                    {faqs.map((faq, index) => (
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
                    <Button onClick={() => scrollToSection("contact")}>
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
