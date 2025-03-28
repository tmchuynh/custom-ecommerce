import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  FileText,
  Key,
  Shield,
  CreditCard,
  Book,
  RefreshCw,
} from "lucide-react";

export default function Policies() {
  const policyLinks = [
    {
      title: "Terms & Conditions",
      description: "Our terms of service and rules for using our platform",
      href: "/policies/terms_and_conditions",
      icon: <FileText className="h-6 w-6" />,
    },
    {
      title: "Privacy Policy",
      description: "How we collect, use, and protect your personal information",
      href: "/policies/privacy_policy",
      icon: <Shield className="h-6 w-6" />,
    },
    {
      title: "Return Policy",
      description: "Information about returns, refunds, and exchanges",
      href: "/policies/return_policy",
      icon: <RefreshCw className="h-6 w-6" />,
    },
    {
      title: "Payment Security",
      description: "How we ensure your payment information remains safe",
      href: "/policies/payment_security",
      icon: <CreditCard className="h-6 w-6" />,
    },
    {
      title: "Cookie Policy",
      description: "How we use cookies and similar technologies",
      href: "/policies/cookie_policy",
      icon: <Key className="h-6 w-6" />,
    },
    {
      title: "User Guidelines",
      description: "Best practices for using our platform safely",
      href: "/policies/user_guidelines",
      icon: <Book className="h-6 w-6" />,
    },
  ];

  return (
    <section className="bg-gradient-to-b from-white to-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-800 mb-4">
            Our Policies
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We're committed to transparency. Please review our policies to
            understand how we operate.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {policyLinks.map((policy, index) => (
            <Link
              key={index}
              href={policy.href}
              className="group flex flex-col h-full bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <div className="p-6 flex flex-col h-full">
                <div className="flex items-center mb-4">
                  <div className="p-2 rounded-full bg-blue-50 text-blue-600 mr-3">
                    {policy.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {policy.title}
                  </h3>
                </div>
                <p className="text-gray-600 text-sm mb-4 flex-grow">
                  {policy.description}
                </p>
                <div className="flex items-center text-blue-600 mt-auto text-sm font-medium">
                  <span>Read More</span>
                  <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
              <div className="h-1 bg-gradient-to-r from-blue-600 to-indigo-600 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">
            Have questions about our policies?{" "}
            <Link
              href="/customer_service"
              className="text-blue-600 hover:underline"
            >
              Contact our Support Team
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
