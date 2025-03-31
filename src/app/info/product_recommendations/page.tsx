"use client";
import { Button } from "@/components/ui/button";
import { productRecommendationsFAQs } from "@/lib/constants/faqs";
import { scrollToSection } from "@/lib/utils/utils";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import {
  FaClock,
  FaCogs,
  FaLightbulb,
  FaMailBulk,
  FaPhone,
  FaQuestionCircle,
  FaStar,
  FaTags,
  FaUser,
} from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";

const productRecommendationsSections = [
  { id: "overview", title: "Overview", icon: FaStar },
  { id: "how_it_works", title: "How It Works", icon: FaLightbulb },
  { id: "benefits", title: "Benefits", icon: FaTags },
  {
    id: "how_to_get",
    title: "How to Get Recommendations",
    icon: FaQuestionCircle,
  },
  { id: "who_provides", title: "Who Provides Recommendations", icon: FaUser },
  { id: "how_chosen", title: "How Recommendations Are Chosen", icon: FaCogs },
  { id: "customize", title: "How to Customize Recommendations", icon: FaTags },
  { id: "time_to_get", title: "How Long It Takes", icon: FaClock },
  { id: "faq", title: "FAQ", icon: FaQuestionCircle },
];

const ProductRecommendationsPage = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});
  const router = useRouter();

  const handleScrollToSection = (sectionId: string) => {
    scrollToSection(sectionId, sectionRefs, setActiveSection);
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold mb-4">
            Product Recommendations
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            Learn how our recommendation system helps you find the perfect
            products.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-7 gap-8">
          {/* Table of Contents Sidebar */}
          <div className="lg:col-span-2">
            <div className="sticky top-8 rounded-xl border shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">Contents</h2>
              <ul className="space-y-2">
                {productRecommendationsSections.map((section) => (
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
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-5 space-y-8">
            {productRecommendationsSections.map((section) => (
              <div
                key={section.id}
                ref={(el) => {
                  sectionRefs.current[section.id] = el;
                }}
                className="rounded-xl border shadow-md overflow-hidden"
              >
                <button className="w-full flex items-center justify-between p-6 focus:outline-none">
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
                    {section.id === "overview" && (
                      <div>
                        <p>
                          Our recommendation system leverages advanced
                          algorithms to suggest products tailored specifically
                          to your preferences and browsing history. By analyzing
                          various signals, such as your past purchases,
                          interactions, and items you've viewed, the system
                          strives to present relevant items that align with your
                          tastes, enhancing your shopping experience and making
                          it easier to discover products that you’ll love.
                        </p>

                        <p>
                          This dynamic system constantly adapts and learns from
                          your activity, providing ever-improving
                          recommendations with each interaction. Whether you're
                          looking for new trends, hidden gems, or classic
                          favorites, our recommendation system ensures that
                          you’re always presented with the most relevant
                          options.
                        </p>
                      </div>
                    )}

                    {section.id === "how_it_works" && (
                      <div>
                        <p>
                          Our recommendation system works by analyzing your
                          interactions with our platform. This includes clicks,
                          views, and searches, as well as your purchase history.
                          By identifying patterns in these interactions, we can
                          predict which products are most likely to match your
                          interests.
                        </p>

                        <p>
                          For example, if you often browse a certain category or
                          brand, our system will suggest similar items or
                          related products that you might not have discovered
                          otherwise. This method helps create a personalized
                          experience that evolves over time, ensuring that you
                          receive the most relevant suggestions with every
                          visit.
                        </p>
                      </div>
                    )}

                    {section.id === "benefits" && (
                      <div>
                        <p>
                          Enjoy a truly personalized shopping experience with
                          our curated recommendations. Tailored to your needs
                          and preferences, these suggestions help you find
                          products that align with your tastes, saving you time
                          and effort. Instead of browsing through countless
                          options, you’ll be presented with items that are
                          highly relevant to your unique style.
                        </p>

                        <p>
                          Whether you’re looking for something specific or just
                          exploring, our system aims to make shopping easier and
                          more enjoyable by ensuring that each recommendation
                          feels tailored just for you.
                        </p>
                      </div>
                    )}

                    {section.id === "how_to_get" && (
                      <div>
                        <p>
                          Getting personalized recommendations is simple. All
                          you need to do is browse through our catalog or log in
                          to your account. As you engage with the site, our
                          system automatically tracks your activity and
                          generates tailored product suggestions based on what
                          you've viewed, searched for, or purchased previously.
                        </p>

                        <p>
                          By staying logged in, your activity is continuously
                          monitored, and our system will provide increasingly
                          accurate recommendations. No additional steps are
                          needed—just interact with our platform, and the system
                          will handle the rest.
                        </p>
                      </div>
                    )}

                    {section.id === "who_provides" && (
                      <div>
                        <p>
                          The recommendations you see are powered by our
                          in-house AI system, developed and maintained by our
                          expert data science team. Our team is dedicated to
                          improving and refining the algorithms that power the
                          recommendations to ensure they are as relevant and
                          helpful as possible.
                        </p>

                        <p>
                          Using cutting-edge technology, our AI system
                          continuously learns from data and improves its ability
                          to predict which products you'll love. This ongoing
                          development allows us to provide you with the best
                          possible recommendations every time you shop with us.
                        </p>
                      </div>
                    )}

                    {section.id === "how_chosen" && (
                      <div>
                        <p>
                          Recommendations are chosen based on a variety of
                          factors, including your browsing history, purchase
                          patterns, and personal preferences. Our machine
                          learning algorithms analyze these inputs to identify
                          trends and patterns that match your individual
                          behavior on the platform.
                        </p>

                        <p>
                          This personalized approach ensures that the products
                          suggested to you are aligned with your tastes. For
                          instance, if you've recently purchased a particular
                          type of product or have shown interest in certain
                          categories, the system will prioritize recommendations
                          related to those items, helping you discover products
                          that suit your needs and preferences.
                        </p>
                      </div>
                    )}

                    {section.id === "customize" && (
                      <div>
                        <p>
                          You have the ability to customize your recommendations
                          to make them even more relevant. By updating your
                          profile preferences, such as specifying your favorite
                          brands, categories, or product types, you can guide
                          the recommendation system to provide suggestions that
                          better match your evolving interests.
                        </p>

                        <p>
                          Additionally, you can provide feedback on the
                          recommendations you receive. If you find a suggestion
                          that you like, you can mark it as a favorite or
                          purchase it. If a suggestion doesn’t match your
                          interests, you can skip it or remove it from your
                          recommendations. This feedback loop helps the system
                          better understand your tastes over time.
                        </p>
                      </div>
                    )}

                    {section.id === "time_to_get" && (
                      <div>
                        <p>
                          Our recommendation system works in real-time, meaning
                          that as you interact with our platform, suggestions
                          are instantly updated based on your actions. Whether
                          you’re browsing new products, making a purchase, or
                          just checking out an item, the system will generate
                          relevant recommendations immediately, allowing you to
                          discover new products as you go.
                        </p>

                        <p>
                          This real-time experience ensures that the suggestions
                          you receive are always timely and aligned with your
                          current interests, providing you with the best
                          possible shopping experience each time you visit our
                          site.
                        </p>
                      </div>
                    )}

                    {section.id === "faq" && (
                      <div className="p-6 border-t">
                        <p className="mb-6">
                          Below are some of the most common questions we receive
                          from customers. If your question is not answered here,
                          please don't hesitate to reach out to us directly.
                        </p>

                        <div className="space-y-6">
                          {productRecommendationsFAQs.map((faq, index) => (
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
                          <Button
                            onClick={() => handleScrollToSection("contact")}
                          >
                            Still have questions? Contact us
                          </Button>
                        </div>
                      </div>
                    )}

                    {section.id === "contact" && (
                      <div className="p-6">
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
                              <Button>Start Live Chat</Button>
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

export default ProductRecommendationsPage;
