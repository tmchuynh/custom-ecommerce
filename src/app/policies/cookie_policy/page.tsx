"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Cookie,
  Settings,
  Shield,
  Clock,
  ToggleLeft,
  Info,
  FileText,
  Phone,
  BookOpen,
  Mail,
  MessageSquare,
  Database,
} from "lucide-react";
import router from "next/router";

const CookiePolicy = () => {
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
      title: "Overview",
      icon: <BookOpen className="h-5 w-5" />,
    },
    {
      id: "encryption",
      title: "Encryption",
      icon: <Database className="h-5 w-5" />,
    },
    {
      id: "what-are-cookies",
      title: "What Are Cookies",
      icon: <Cookie className="h-5 w-5" />,
    },
    {
      id: "types",
      title: "Types of Cookies",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      id: "how-we-use",
      title: "How We Use Cookies",
      icon: <Settings className="h-5 w-5" />,
    },
    {
      id: "third-party",
      title: "Third-Party Cookies",
      icon: <Shield className="h-5 w-5" />,
    },
    {
      id: "duration",
      title: "Cookie Duration",
      icon: <Clock className="h-5 w-5" />,
    },
    {
      id: "management",
      title: "Cookie Management",
      icon: <ToggleLeft className="h-5 w-5" />,
    },
    {
      id: "policy-updates",
      title: "Policy Updates",
      icon: <Info className="h-5 w-5" />,
    },
    {
      id: "contact",
      title: "Contact Us",
      icon: <Phone className="h-5 w-5" />,
    },
  ];

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold mb-4">Cookie Policy</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Understanding how and why we use cookies to improve your browsing
            experience.
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
              <div className="px-4 pt-3 flex justify-between items-center">
                <p className="text-sm">
                  By using our services, you acknowledge our use of cookies.
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
                        shopping environment. Our website uses encryption
                        protocols, such as SSL (Secure Sockets Layer), to ensure
                        that all sensitive data, including credit card details
                        and personal information, is transmitted securely.
                        Additionally, we comply with PCI DSS (Payment Card
                        Industry Data Security Standard) to safeguard your
                        financial information and prevent unauthorized access.
                        We also employ multi-factor authentication and regular
                        security audits to monitor for potential
                        vulnerabilities. Our commitment to security ensures that
                        your shopping experience is safe and your data remains
                        protected at all times.
                      </p>
                    )}

                    {section.id === "encryption" && (
                      <div>
                        <p className="mb-4">
                          All sensitive data is encrypted using
                          industry-standard SSL/TLS encryption to ensure the
                          security of your personal and financial information
                          while shopping. Our commitment to protecting your data
                          is central to maintaining a safe and trustworthy
                          environment for all transactions.
                        </p>
                        <ul className="list-disc list-outside mx-5 space-y-2">
                          <li>
                            <strong>
                              256-bit SSL encryption for all transactions:
                            </strong>{" "}
                            This advanced encryption method ensures that all
                            communications between your browser and our servers
                            are securely encrypted, preventing any unauthorized
                            access or interception of sensitive information such
                            as payment details and personal data.
                          </li>
                          <li>
                            <strong>
                              Secure storage of encrypted payment data:
                            </strong>{" "}
                            We utilize secure storage systems that comply with
                            the highest standards of data protection. Any
                            payment information you provide is securely
                            encrypted and stored in compliance with industry
                            regulations, ensuring that your details are never
                            exposed to unauthorized parties.
                          </li>
                          <li>
                            <strong>
                              Regular security audits and updates:
                            </strong>{" "}
                            We perform regular security audits and system
                            updates to identify and mitigate any vulnerabilities
                            in our infrastructure. This proactive approach helps
                            us stay ahead of potential threats and ensures your
                            data remains protected at all times.
                          </li>
                        </ul>
                      </div>
                    )}

                    {section.id === "what-are-cookies" && (
                      <div className="prose max-w-none">
                        <p>
                          Cookies are small text files that are placed on your
                          device when you visit a website. They are widely used
                          to make websites work more efficiently by storing
                          information such as your preferences, login
                          credentials, and browsing history. Cookies help
                          improve your experience by enabling websites to
                          remember certain details about your visit, such as
                          your language preference or items in your shopping
                          cart. Additionally, cookies allow website owners to
                          gather valuable insights into user behavior, which can
                          help enhance site performance, improve functionality,
                          and tailor content and advertising to your interests.
                          While most cookies are harmless, you have the option
                          to manage or block them through your browser settings
                          at any time.
                        </p>
                      </div>
                    )}

                    {section.id === "types" && (
                      <div>
                        <p>
                          Cookies can be categorized into different types based
                          on their purpose and duration. Here are the main
                          types:
                        </p>
                        <ul className="list-disc list-outside mx-5 space-y-2">
                          <li>
                            <strong>Session Cookies:</strong> Temporary cookies
                            that are deleted when you close your browser. They
                            are used to remember your actions during a single
                            browsing session.
                          </li>
                          <li>
                            <strong>Persistent Cookies:</strong> These cookies
                            remain on your device for a specified period or
                            until you manually delete them. They are used to
                            remember your preferences and settings for future
                            visits.
                          </li>
                          <li>
                            <strong>First-Party Cookies:</strong> Set by the
                            website you are visiting. They are used to store
                            information about your interactions with that
                            specific site.
                          </li>
                          <li>
                            <strong>Third-Party Cookies:</strong> Set by domains
                            other than the one you are visiting. They are often
                            used for tracking and advertising purposes.
                          </li>
                        </ul>
                      </div>
                    )}

                    {section.id === "how-we-use" && (
                      <p>
                        We use cookies to enhance your browsing experience,
                        analyze site traffic, and personalize content tailored
                        to your preferences. Cookies help us understand how you
                        interact with our website, such as which pages you visit
                        most frequently, how long you stay on certain pages, and
                        which features you use. This valuable information allows
                        us to improve our website's functionality, optimize the
                        user interface, and offer a more personalized
                        experience. Additionally, cookies enable us to serve
                        relevant content and advertisements based on your
                        interests, making your browsing experience more
                        efficient and enjoyable. Rest assured, we take your
                        privacy seriously, and you can manage or block cookies
                        at any time through your browser settings.
                      </p>
                    )}
                    {section.id === "third-party" && (
                      <p>
                        Some of our pages may contain content or features from
                        third-party services, such as social media platforms,
                        payment processors, or analytics tools, which may set
                        their own cookies on your device. These third-party
                        cookies are used to provide functionality like social
                        sharing, embedded media, or tracking for targeted
                        advertisements. Please note that we do not have control
                        over these third-party cookies, and their use is
                        governed by the privacy policies of the respective third
                        parties. We encourage you to review the privacy policies
                        of these third-party services to understand how they
                        collect, store, and use your data. While we aim to
                        provide a secure and transparent browsing experience,
                        the use of third-party cookies is outside of our
                        control.
                      </p>
                    )}
                    {section.id === "duration" && (
                      <p>
                        Cookies can be classified into two main types: session
                        cookies and persistent cookies.{" "}
                        <strong>Session cookies</strong> are temporary and are
                        only stored on your device for the duration of your
                        browsing session. Once you close your browser, these
                        cookies are automatically deleted. They are commonly
                        used to remember temporary data, such as login
                        credentials or items added to a shopping cart, during a
                        single visit. <strong>Persistent cookies</strong>, on
                        the other hand, remain on your device for a specified
                        period or until you manually delete them. These cookies
                        are used to store data across browsing sessions, such as
                        your language preference, login status, or website
                        settings, which allows for a more seamless and
                        personalized experience during future visits. The
                        duration of persistent cookies is typically defined by
                        the website or service that sets them.
                      </p>
                    )}
                    {section.id === "management" && (
                      <p>
                        You can control cookies through your browser settings,
                        giving you the option to manage your privacy
                        preferences. Most modern browsers allow you to block,
                        delete, or disable cookies entirely, either for specific
                        websites or globally. You can also set your browser to
                        notify you whenever a cookie is being stored, allowing
                        you to make decisions on a case-by-case basis. However,
                        please note that blocking or deleting essential cookies
                        may impact website functionality, such as preventing you
                        from staying logged in, remembering your preferences, or
                        enabling shopping cart features. Disabling cookies could
                        also affect the performance of certain website features
                        that rely on them for personalized content and
                        analytics. Therefore, while you have full control over
                        cookies, it’s important to be aware that restricting
                        cookies may affect your overall browsing experience.
                      </p>
                    )}
                    {section.id === "policy-updates" && (
                      <p>
                        We may update this Cookie Policy periodically to reflect
                        changes in our practices, improve our website’s
                        functionality, or comply with legal, operational, or
                        regulatory requirements. As laws and technology evolve,
                        we may need to make adjustments to how we collect, use,
                        and manage cookies on our site. Whenever we make
                        significant changes to this policy, we will notify you
                        by updating the "Last Updated" date at the top of this
                        page. We encourage you to review this policy regularly
                        to stay informed about how we use cookies and how they
                        may impact your browsing experience. By continuing to
                        use our website, you accept the updated policy, so it’s
                        important to stay aware of any changes that may affect
                        your privacy preferences.
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

export default CookiePolicy;
