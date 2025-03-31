import Link from "next/link";
import DynamicButton from "./ui/button-dynamic";
import { Button } from "./ui/button";
import { InformationDetails } from "@/lib/interfaces";
import { FaCreditCard, FaFile, FaKey } from "react-icons/fa";
import { IoMdRefresh } from "react-icons/io";

export default function Policies() {
  const policyLinks: InformationDetails[] = [
    {
      id: "terms_and_conditions",
      title: "Terms & Conditions",
      description: "Our terms of service and rules for using our platform",
      href: "/policies/terms_and_conditions",
      icon: FaFile,
    },
    {
      id: "privacy_policy",
      title: "Privacy Policy",
      description: "How we collect, use, and protect your personal information",
      href: "/policies/privacy_policy",
      icon: FaFile,
    },
    {
      id: "return_policy",
      title: "Return Policy",
      description: "Information about returns, refunds, and exchanges",
      href: "/policies/return_policy",
      icon: IoMdRefresh,
    },
    {
      id: "payment_security",
      title: "Payment Security",
      description: "How we ensure your payment information remains safe",
      href: "/policies/payment_security",
      icon: FaCreditCard,
    },
    {
      id: "cookie_policy",
      title: "Cookie Policy",
      description: "How we use cookies and similar technologies",
      href: "/policies/cookie_policy",
      icon: FaKey,
    },
  ];

  return (
    <section className=" py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold mb-4">Our Policies</h2>
          <p className="text-xl max-w-2xl mx-auto">
            We're committed to transparency. Please review our policies to
            understand how we operate.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {policyLinks.map((policy, index) => (
            <Link
              key={index}
              href={policy.href || "/"}
              className="group flex flex-col h-full rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border"
            >
              <div className="p-6 flex flex-col h-full">
                <div className="flex items-center mb-4">
                  <div className="p-2 rounded-full bg-blue-50 text-blue-600 mr-3">
                    <policy..icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold">{policy.title}</h3>
                </div>
                <p className="text-sm mb-4 flex-grow">{policy.description}</p>
                <DynamicButton text="Read More" variant="outline" />
              </div>
              <div className="h-1 bg-gradient-to-r from-blue-600 to-red-800 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm">
            Have questions about our policies?{" "}
            <Link href="/customer_service">
              <Button variant={"ghost"}>Contact our Support Team</Button>
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
