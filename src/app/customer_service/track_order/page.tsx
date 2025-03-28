"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  AlertCircle,
  ArrowLeft,
  BarChart4,
  CheckCircle,
  Clock,
  HelpCircle,
  Mail,
  MessageSquare,
  PackageCheck,
  PackageOpen,
  RefreshCw,
  Search,
  Truck,
} from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";

const TrackOrder = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [orderStatus, setOrderStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
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

  // Simulated order statuses
  const orderStatuses = [
    {
      trackingNumber: "123456",
      status: "Shipped",
      carrier: "FedEx",
      estimatedDelivery: "Jun 15, 2023",
      lastUpdate: "Jun 10, 2023 - Package left warehouse",
    },
    {
      trackingNumber: "654321",
      status: "In Transit",
      carrier: "UPS",
      estimatedDelivery: "Jun 18, 2023",
      lastUpdate: "Jun 12, 2023 - Package in transit to destination",
    },
    {
      trackingNumber: "112233",
      status: "Delivered",
      carrier: "USPS",
      estimatedDelivery: "Jun 8, 2023",
      lastUpdate: "Jun 8, 2023 - Package delivered",
    },
    {
      trackingNumber: "445566",
      status: "Processing",
      carrier: "Pending",
      estimatedDelivery: "Jun 20, 2023",
      lastUpdate: "Jun 11, 2023 - Order confirmed, preparing for shipment",
    },
  ];

  // Handle the track order functionality
  const handleTrackOrder = () => {
    if (!trackingNumber.trim()) {
      return;
    }

    setLoading(true);
    // Simulate a delay (API call)
    setTimeout(() => {
      const order = orderStatuses.find(
        (order) => order.trackingNumber === trackingNumber
      );
      if (order) {
        setOrderStatus(order.status);
      } else {
        setOrderStatus("Order not found");
      }
      setLoading(false);
    }, 1000);
  };

  // Get the full order details if found
  const orderDetails =
    orderStatus && orderStatus !== "Order not found"
      ? orderStatuses.find((order) => order.trackingNumber === trackingNumber)
      : null;

  // Status step indicator
  const getStatusStep = (status: string | null) => {
    switch (status) {
      case "Processing":
        return 1;
      case "Shipped":
        return 2;
      case "In Transit":
        return 3;
      case "Delivered":
        return 4;
      default:
        return 0;
    }
  };

  const currentStep = orderDetails ? getStatusStep(orderDetails.status) : 0;

  // FAQ items
  const faqs = [
    {
      question: "What if my tracking number doesn't work?",
      answer:
        "If your tracking number doesn't work, please wait 24-48 hours after receiving your shipping confirmation. If the issue persists, contact our customer service team.",
    },
    {
      question: "How long does shipping take?",
      answer:
        "Standard shipping typically takes 3-7 business days. Express shipping takes 1-3 business days, depending on your location.",
    },
    {
      question: "Can I change my shipping address?",
      answer:
        "You can change your shipping address only if your order hasn't been shipped yet. Please contact customer service immediately for assistance.",
    },
  ];

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold mb-4">Track Your Order</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Enter your tracking number to get the latest update on your order
            status.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-800">
                Quick Links
              </h2>

              <div className="space-y-3">
                <Link
                  href="/customer_service"
                  className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
                >
                  <ArrowLeft className="h-5 w-5 mr-2" />
                  <span>Back to Customer Service</span>
                </Link>

                <Link
                  href="/orders"
                  className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
                >
                  <PackageCheck className="h-5 w-5 mr-2" />
                  <span>View My Orders</span>
                </Link>

                <Link
                  href="/return_policy"
                  className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
                >
                  <RefreshCw className="h-5 w-5 mr-2" />
                  <span>Return Policy</span>
                </Link>
              </div>

              <hr className="my-4" />

              <div className="bg-blue-50 p-4 rounded-lg space-y-2">
                <h3 className="font-medium text-blue-800 flex items-center">
                  <HelpCircle className="h-4 w-4 mr-2" />
                  Need Help?
                </h3>
                <p className="text-sm text-gray-700">
                  Our customer service team is available to assist you with any
                  questions.
                </p>
                <div className="flex mt-2">
                  <Link
                    href="/customer_service"
                    className="text-blue-600 text-sm font-medium hover:underline"
                  >
                    Contact Support →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Tracking Form */}
            <Card className="shadow-lg p-8 rounded-xl bg-white">
              <div className="mb-6">
                <label
                  htmlFor="tracking-number"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Tracking Number
                </label>
                <div className="relative">
                  <Input
                    id="tracking-number"
                    type="text"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    placeholder="Enter your tracking number"
                    className="pr-12"
                    onKeyPress={(e) => e.key === "Enter" && handleTrackOrder()}
                  />
                  <Button
                    onClick={handleTrackOrder}
                    className="absolute top-0 right-0 h-full rounded-l-none"
                    disabled={loading || !trackingNumber.trim()}
                  >
                    {loading ? (
                      <Clock className="h-4 w-4 mr-1 animate-spin" />
                    ) : (
                      <Search className="h-4 w-4 mr-1" />
                    )}
                    {loading ? "Searching..." : "Track"}
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  You can find your tracking number in your order confirmation
                  email.
                </p>
              </div>

              {/* Tracking Results */}
              {orderStatus && (
                <div className="mt-8 border-t pt-6">
                  <h3 className="text-lg font-medium mb-4 text-gray-800">
                    Order Status:
                  </h3>

                  {orderStatus === "Order not found" ? (
                    <div className="bg-red-50 p-4 rounded-lg flex items-start">
                      <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-red-800">
                          Order Not Found
                        </h4>
                        <p className="text-sm text-red-700 mt-1">
                          We couldn't find an order with that tracking number.
                          Please check the number and try again.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="bg-blue-50 p-4 rounded-lg mb-6">
                        <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <dt className="text-sm font-medium text-gray-500">
                              Tracking Number
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900">
                              {trackingNumber}
                            </dd>
                          </div>
                          <div>
                            <dt className="text-sm font-medium text-gray-500">
                              Status
                            </dt>
                            <dd className="mt-1 text-sm font-semibold">
                              <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  orderDetails?.status === "Delivered"
                                    ? "bg-green-100 text-green-800"
                                    : orderDetails?.status === "In Transit"
                                    ? "bg-blue-100 text-blue-800"
                                    : orderDetails?.status === "Shipped"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-gray-100 text-gray-800"
                                }`}
                              >
                                {orderDetails?.status}
                              </span>
                            </dd>
                          </div>
                          <div>
                            <dt className="text-sm font-medium text-gray-500">
                              Carrier
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900">
                              {orderDetails?.carrier}
                            </dd>
                          </div>
                          <div>
                            <dt className="text-sm font-medium text-gray-500">
                              Estimated Delivery
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900">
                              {orderDetails?.estimatedDelivery}
                            </dd>
                          </div>
                        </dl>
                      </div>

                      {/* Shipping Progress Indicator */}
                      <div className="mb-6">
                        <h4 className="text-sm font-medium text-gray-700 mb-3">
                          Shipping Progress
                        </h4>
                        <div className="relative">
                          <div className="overflow-hidden h-2 mb-6 text-xs flex rounded bg-gray-200">
                            <div
                              className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600 transition-all duration-500 ${
                                currentStep === 1
                                  ? "w-1/4"
                                  : currentStep === 2
                                  ? "w-2/4"
                                  : currentStep === 3
                                  ? "w-3/4"
                                  : currentStep === 4
                                  ? "w-full"
                                  : "w-0"
                              }`}
                            ></div>
                          </div>
                          <div className="flex justify-between">
                            <div
                              className={`text-center flex flex-col items-center ${
                                currentStep >= 1
                                  ? "text-blue-600"
                                  : "text-gray-400"
                              }`}
                            >
                              <div
                                className={`rounded-full w-8 h-8 flex items-center justify-center mb-1 ${
                                  currentStep >= 1
                                    ? "bg-blue-100"
                                    : "bg-gray-100"
                                }`}
                              >
                                <PackageOpen className="h-4 w-4" />
                              </div>
                              <span className="text-xs">Processing</span>
                            </div>
                            <div
                              className={`text-center flex flex-col items-center ${
                                currentStep >= 2
                                  ? "text-blue-600"
                                  : "text-gray-400"
                              }`}
                            >
                              <div
                                className={`rounded-full w-8 h-8 flex items-center justify-center mb-1 ${
                                  currentStep >= 2
                                    ? "bg-blue-100"
                                    : "bg-gray-100"
                                }`}
                              >
                                <PackageCheck className="h-4 w-4" />
                              </div>
                              <span className="text-xs">Shipped</span>
                            </div>
                            <div
                              className={`text-center flex flex-col items-center ${
                                currentStep >= 3
                                  ? "text-blue-600"
                                  : "text-gray-400"
                              }`}
                            >
                              <div
                                className={`rounded-full w-8 h-8 flex items-center justify-center mb-1 ${
                                  currentStep >= 3
                                    ? "bg-blue-100"
                                    : "bg-gray-100"
                                }`}
                              >
                                <Truck className="h-4 w-4" />
                              </div>
                              <span className="text-xs">In Transit</span>
                            </div>
                            <div
                              className={`text-center flex flex-col items-center ${
                                currentStep >= 4
                                  ? "text-blue-600"
                                  : "text-gray-400"
                              }`}
                            >
                              <div
                                className={`rounded-full w-8 h-8 flex items-center justify-center mb-1 ${
                                  currentStep >= 4
                                    ? "bg-blue-100"
                                    : "bg-gray-100"
                                }`}
                              >
                                <CheckCircle className="h-4 w-4" />
                              </div>
                              <span className="text-xs">Delivered</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Last Update */}
                      <div className="border-t border-gray-200 pt-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">
                          Last Update
                        </h4>
                        <p className="text-sm text-gray-600">
                          {orderDetails?.lastUpdate}
                        </p>
                      </div>

                      {/* Tracking Link */}
                      {orderDetails?.carrier !== "Pending" && (
                        <div className="mt-4">
                          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                            View Detailed Tracking on {orderDetails?.carrier}
                          </Button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
            </Card>

            {/* Order Tracking FAQs */}
            <div
              ref={(el) => {
                sectionRefs.current["faqs"] = el;
              }}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <button
                onClick={() => toggleSection("faqs")}
                className="w-full flex items-center justify-between p-6 focus:outline-none"
              >
                <div className="flex items-center">
                  <HelpCircle className="h-6 w-6 text-blue-600" />
                  <h2 className="text-2xl font-semibold ml-3 text-gray-800">
                    Tracking FAQs
                  </h2>
                </div>
                <svg
                  className={`w-6 h-6 transform transition-transform ${
                    activeSection === "faqs" ? "rotate-180" : ""
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
              {activeSection === "faqs" && (
                <div className="p-6 pt-0 border-t border-gray-200">
                  <div className="space-y-4">
                    {faqs.map((faq, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="text-lg font-medium text-gray-800 mb-2 flex items-start">
                          <span className="text-blue-600 mr-2">Q:</span>
                          {faq.question}
                        </h3>
                        <div className="text-gray-700 ml-6">
                          <p>{faq.answer}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 bg-blue-50 p-4 rounded-lg">
                    <h3 className="text-lg font-medium text-blue-800 mb-2">
                      Need additional help?
                    </h3>
                    <p className="text-gray-700 mb-4">
                      If you need further assistance with tracking your order or
                      have any other questions, please contact our customer
                      service team.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Button className="inline-flex items-center bg-white text-blue-600 border border-blue-200 hover:bg-blue-50">
                        <Mail className="h-4 w-4 mr-2" /> Email Support
                      </Button>
                      <Button className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white">
                        <MessageSquare className="h-4 w-4 mr-2" /> Live Chat
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Shipping Information */}
            <div
              ref={(el) => {
                sectionRefs.current["shipping-info"] = el;
              }}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <button
                onClick={() => toggleSection("shipping-info")}
                className="w-full flex items-center justify-between p-6 focus:outline-none"
              >
                <div className="flex items-center">
                  <BarChart4 className="h-6 w-6 text-blue-600" />
                  <h2 className="text-2xl font-semibold ml-3 text-gray-800">
                    Shipping Information
                  </h2>
                </div>
                <svg
                  className={`w-6 h-6 transform transition-transform ${
                    activeSection === "shipping-info" ? "rotate-180" : ""
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
              {activeSection === "shipping-info" && (
                <div className="p-6 pt-0 border-t border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-medium text-gray-800 mb-2">
                        Standard Shipping
                      </h3>
                      <ul className="text-gray-700 space-y-1 text-sm">
                        <li>• Delivery in 3-7 business days</li>
                        <li>• Free on orders over $50</li>
                        <li>• $4.99 for orders under $50</li>
                      </ul>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-medium text-gray-800 mb-2">
                        Express Shipping
                      </h3>
                      <ul className="text-gray-700 space-y-1 text-sm">
                        <li>• Delivery in 1-3 business days</li>
                        <li>• $12.99 flat rate</li>
                        <li>• Available for most locations</li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h3 className="font-medium text-gray-800 mb-2">
                      Shipping Carriers
                    </h3>
                    <p className="text-gray-700 text-sm mb-2">
                      We partner with the following carriers to deliver your
                      orders:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        FedEx
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        UPS
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        USPS
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        DHL
                      </span>
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

export default TrackOrder;
