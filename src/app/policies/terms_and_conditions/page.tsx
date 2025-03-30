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
  Mail,
  MessageSquare,
} from "lucide-react";
import router from "next/router";

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
              className="border text-muted-foreground rounded-xl shadow-md overflow-hidden"
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
                  <p>
                    These Terms and Conditions ("Terms", "Terms and Conditions")
                    govern your use of our website ("Site"), the services we
                    provide, and any purchases you make through the Site. By
                    accessing, browsing, or using our Site, and by making any
                    purchases or engaging with our services, you agree to comply
                    with these Terms in full. These Terms serve as a binding
                    agreement between you and our company. If you do not agree
                    with any part of these Terms or if you are not authorized to
                    comply with them, you should not access or use our Site or
                    services. We encourage you to read these Terms carefully
                    before proceeding with any interactions on our Site.
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
                        <p className="mb-4">
                          You may use our Site only for lawful purposes and in a
                          manner consistent with these Terms and Conditions. By
                          accessing or using our Site, you agree to abide by all
                          applicable laws and regulations. Your use of the Site
                          should not interfere with the rights of others or the
                          operation of the Site itself.
                        </p>
                        <ul className="list-disc list-inside space-y-2">
                          <li>
                            You agree not to engage in any fraudulent, unlawful,
                            or harmful activities, including but not limited to
                            identity theft, scams, or any actions intended to
                            deceive others or disrupt the Site's operations.
                          </li>
                          <li>
                            You agree not to violate any applicable local,
                            state, national, or international laws or
                            regulations while using the Site. This includes, but
                            is not limited to, copyright laws, data protection
                            laws, and any other legal frameworks relevant to
                            your activities.
                          </li>
                          <li>
                            You agree not to interfere with the proper
                            functioning of the Site or its security features.
                            This includes attempting to bypass security
                            measures, upload harmful malware, or perform actions
                            that could negatively affect the performance or
                            availability of the Site.
                          </li>
                          <li>
                            You agree not to upload, post, or transmit any
                            content that is offensive, harmful, discriminatory,
                            or that infringes upon the rights of others,
                            including intellectual property rights, privacy
                            rights, or any other rights. This also includes
                            content that may be obscene, defamatory, or
                            harassing in nature.
                          </li>
                        </ul>
                      </>
                    )}

                    {section.id === "account" && (
                      <>
                        <p className="mb-4">
                          To make a purchase on our Site, you may need to create
                          an account. When registering for an account, you agree
                          to provide accurate, complete, and up-to-date
                          information. You are responsible for ensuring the
                          confidentiality of your login credentials, such as
                          your username and password. This means you are fully
                          responsible for all activities that occur under your
                          account, whether or not you have authorized them. We
                          strongly recommend that you use a strong, unique
                          password and do not share your account details with
                          anyone.
                        </p>
                        <ul className="list-disc list-inside space-y-2">
                          <li>
                            If you suspect that your account has been
                            compromised or if there are any unauthorized
                            activities under your account, you must notify us
                            immediately. Prompt action will help prevent further
                            unauthorized access and protect your personal
                            information.
                          </li>
                          <li>
                            We reserve the right to suspend or terminate your
                            account if we suspect any unauthorized activity,
                            fraud, or violation of these Terms and Conditions.
                            This includes activities that may harm our Site,
                            disrupt the services we provide, or violate any
                            applicable laws or regulations. If your account is
                            suspended or terminated, you will be notified and
                            provided with the necessary steps to resolve the
                            issue, if applicable.
                          </li>
                        </ul>
                      </>
                    )}

                    {section.id === "product" && (
                      <>
                        <p className="mb-4">
                          We make every effort to ensure that product
                          information, including descriptions, prices,
                          availability, and images, are accurate and up-to-date.
                          However, due to the dynamic nature of our inventory
                          and external factors, we cannot guarantee the
                          accuracy, completeness, or reliability of such
                          information. In some cases, discrepancies may occur
                          due to typographical errors, pricing updates, or
                          changes in product availability. All prices are
                          subject to change without notice, and we reserve the
                          right to update or adjust prices at any time without
                          prior notice.
                        </p>
                        <ul className="list-disc list-inside space-y-2">
                          <li>
                            We reserve the right to modify or discontinue any
                            product or service offered on our website without
                            prior notice. This includes changes in product
                            specifications, availability, and pricing. While we
                            strive to maintain a wide range of products, some
                            items may be discontinued or temporarily out of
                            stock.
                          </li>
                          <li>
                            If a product is incorrectly priced on our website,
                            we will notify you as soon as we become aware of the
                            error. In such cases, we will offer you the option
                            to cancel your order or proceed with the corrected
                            price. We aim to resolve any pricing discrepancies
                            promptly and fairly, ensuring you have a transparent
                            shopping experience.
                          </li>
                        </ul>
                      </>
                    )}

                    {section.id === "order" && (
                      <>
                        <p className="mb-4">
                          Once you place an order on our Site, you will receive
                          an order confirmation email outlining the details of
                          your purchase. Please review the order details
                          carefully to ensure accuracy, including the items,
                          quantities, and shipping information. If there are any
                          discrepancies or issues, please contact us promptly. A
                          contract between you and us will only be formed when
                          the order is dispatched for shipping. Until that time,
                          we reserve the right to modify or cancel the order if
                          necessary.
                        </p>
                        <p>
                          You may track your orders through{" "}
                          <a href="/customer_service/track_order">
                            Order Tracking
                          </a>
                        </p>
                        <ul className="list-disc list-inside space-y-2">
                          <li>
                            We reserve the right to reject or cancel any order
                            for reasons such as product availability, pricing
                            errors, or if we suspect fraudulent activity. In the
                            event of a cancellation, we will notify you as soon
                            as possible and provide a full explanation.
                          </li>
                          <li>
                            In some cases, we may need to request additional
                            information from you to process your order, such as
                            proof of identity, billing address verification, or
                            other relevant documentation. This is to ensure that
                            the transaction is legitimate and secure.
                          </li>
                          <li>
                            If we cancel your order for any reason, you will
                            receive a full refund to your original payment
                            method. The refund will be processed as quickly as
                            possible, but please note that it may take a few
                            business days for the amount to reflect in your
                            account, depending on your bank or payment provider.
                          </li>
                        </ul>
                      </>
                    )}

                    {section.id === "payments" && (
                      <>
                        <p className="mb-4">
                          We accept various forms of payment, including
                          credit/debit cards, PayPal, and other secure payment
                          providers to offer you flexibility and convenience
                          during checkout. All payments will be processed
                          securely using encryption technology to protect your
                          personal and financial information. Please note that
                          we do not store your sensitive payment details,
                          ensuring that your data remains protected and
                          confidential.
                        </p>
                        <p>
                          For full details on Payment Security or Privacy
                          Policy, including any exclusions or restrictions,
                          please refer to our{" "}
                          <a
                            href="/policies/payment_security"
                            className="text-blue-600 hover:underline"
                          >
                            Payment Security
                          </a>{" "}
                          and{" "}
                          <a
                            href="/policies/privacy_policy"
                            className="text-blue-600 hover:underline"
                          >
                            Privacy Policy
                          </a>{" "}
                          for all the necessary information.
                        </p>
                        <ul className="list-disc list-inside space-y-2">
                          <li>
                            By providing your payment information, you authorize
                            us to charge the full amount of your order,
                            including taxes, shipping fees, and any applicable
                            discounts. This ensures a smooth and accurate
                            transaction process.
                          </li>
                          <li>
                            For security purposes, we may verify your payment
                            details before processing your order. This
                            verification is conducted to prevent fraud and
                            ensure the accuracy of the payment information
                            provided.
                          </li>
                          <li>
                            If a payment is declined for any reason, we will
                            promptly notify you via email or on-site messaging.
                            Your order will not be processed or shipped until a
                            valid payment method is provided. You will be given
                            the opportunity to update your payment details to
                            successfully complete the transaction.
                          </li>
                        </ul>
                      </>
                    )}

                    {section.id === "shipping" && (
                      <>
                        <p className="mb-4">
                          We offer shipping within [Country/Region] and
                          internationally to provide convenient delivery options
                          for our customers worldwide. Shipping costs and
                          delivery times may vary depending on factors such as
                          your location, the items purchased, and the shipping
                          method selected during checkout. Please be aware that
                          delivery times are estimates and may be subject to
                          delays due to factors beyond our control.
                        </p>
                        <ul className="list-disc list-inside space-y-2">
                          <li>
                            We are not responsible for any delays caused by
                            third-party carriers, customs processing, or
                            unforeseen circumstances such as weather conditions
                            or natural disasters. While we strive to ensure
                            timely delivery, these factors may impact the
                            arrival time of your order.
                          </li>
                          <li>
                            Shipping charges will be added to your order during
                            the checkout process based on your selected shipping
                            method and delivery location. You will have the
                            opportunity to review the shipping cost before
                            completing your purchase.
                          </li>
                          <li>
                            If your order is lost or damaged during shipment,
                            please contact us within 7 days of receiving your
                            tracking information. We will assist you with filing
                            a claim with the carrier and ensuring that you
                            receive the appropriate resolution, which may
                            include a replacement or refund.
                          </li>
                        </ul>
                      </>
                    )}

                    {section.id === "returns" && (
                      <p>
                        If you're not completely satisfied with your purchase,
                        we accept returns and exchanges under specific
                        conditions. We want to ensure that you are happy with
                        your purchase, and if for any reason you’re not, we
                        offer a straightforward process to return or exchange
                        items. Please note that there are certain requirements,
                        such as the condition of the items, time frame for
                        returns, and whether the product is eligible for a
                        return or exchange. For full details on our return and
                        exchange policy, including any exclusions or
                        restrictions, please refer to our{" "}
                        <a
                          href="/policies/return_policy"
                          className="text-blue-600 hover:underline"
                        >
                          Return Policy
                        </a>{" "}
                        for all the necessary information.
                      </p>
                    )}

                    {section.id === "liability" && (
                      <p>
                        We are not liable for any indirect, incidental, special,
                        or consequential damages arising from your use of our
                        Site, products, or services, including but not limited
                        to loss of profits, data, or business opportunities,
                        even if we have been advised of the possibility of such
                        damages. In no event will our liability exceed the
                        amount paid by you for the specific product or service
                        in question. This limitation of liability applies to the
                        fullest extent permitted by law and is intended to
                        protect our company from unforeseen or excessive
                        financial responsibility. By using our Site, you agree
                        to these terms and understand that your remedies are
                        limited to the purchase price of the product or service.
                      </p>
                    )}

                    {section.id === "intellectual" && (
                      <p>
                        All content on our website, including images, graphics,
                        text, logos, trademarks, and other materials, are the
                        exclusive property of our company or our licensors. This
                        content is protected by copyright, trademark, and other
                        intellectual property laws. You may not use, reproduce,
                        modify, distribute, display, or transmit any of our
                        content without obtaining our express written
                        permission. Any unauthorized use of our content is a
                        violation of our intellectual property rights and may
                        result in legal action. We reserve the right to take
                        appropriate steps to protect our intellectual property
                        and enforce our rights.
                      </p>
                    )}

                    {section.id === "privacy" && (
                      <p>
                        Your use of our Site is also governed by our{" "}
                        <a
                          href="/policies/privacy-policy"
                          className="text-blue-600 hover:underline"
                        >
                          Privacy Policy
                        </a>
                        , which explains how we collect, use, store, and protect
                        your personal information. Our Privacy Policy outlines
                        the types of data we collect, including information you
                        provide directly and data collected through cookies and
                        other tracking technologies. It also details how we use
                        this information to improve your experience on our Site,
                        personalize content, and fulfill our legal and business
                        obligations. We take your privacy seriously and
                        implement robust measures to safeguard your personal
                        data from unauthorized access or misuse. Please take a
                        moment to review our Privacy Policy to understand how we
                        protect your information and your rights regarding its
                        use.
                      </p>
                    )}

                    {section.id === "changes" && (
                      <p>
                        We reserve the right to update, modify, or change these
                        Terms and Conditions at any time to reflect changes in
                        our practices, improve our services, or comply with
                        legal, operational, or regulatory requirements. When
                        updates or changes are made, the revised version will be
                        posted on this page with a new "Last Updated" date to
                        keep you informed. We encourage you to regularly review
                        this page to stay updated on any changes. Your continued
                        use of the Site after the updated Terms and Conditions
                        have been posted constitutes your acceptance of those
                        changes. If you do not agree with the revised terms, you
                        should discontinue using the Site.
                      </p>
                    )}

                    {section.id === "contact" && (
                      <div className="p-6 border-t">
                        <div className="space-y-6">
                          <div className="flex items-start">
                            <Mail className="h-6 w-6 mt-1 mr-4 flex-shrink-0" />
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
                            <Phone className="h-6 w-6 mt-1 mr-4 flex-shrink-0" />
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
                            <MessageSquare className="h-6 w-6 mt-1 mr-4 flex-shrink-0" />
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

export default TermsAndConditions;
