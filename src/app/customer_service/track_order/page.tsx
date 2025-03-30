"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { trackingOrderFAQs } from "@/lib/faqs";
import { cn, toggleAccordionSection } from "@/lib/utils/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { FaArrowLeft, FaClock, FaMailBulk, FaSearch } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { FiHelpCircle } from "react-icons/fi";
import { IoIosAlert, IoMdRefresh } from "react-icons/io";
import { IoBarChartSharp } from "react-icons/io5";
import { LuPackageCheck } from "react-icons/lu";

/**
 * TrackOrder component provides order tracking functionality and shipping information display.
 *
 * @component
 * @description
 * This component allows users to:
 * - Track orders using a tracking number
 * - View order status and shipping details
 * - Access shipping FAQs and information
 * - Navigate to related customer service pages
 *
 * The component features:
 * - Real-time order status tracking
 * - Progress indicator for shipping stagesOO
 * - Collapsible FAQ and shipping information sections
 * - Integration with multiple shipping carriers (FedEx, UPS, USPS)
 * - Responsive layout with sidebar navigation
 *
 * @example
 * ```tsx
 * <TrackOrder />
 * ```
 *
 * @returns {JSX.Element} A complete order tracking interface with status display and shipping information
 *
 * @state
 * - trackingNumber: string - Stores the user input tracking number
 * - orderStatus: string | null - Current status of the tracked order
 * - loading: boolean - Loading state during tracking number search
 * - activeSection: string | null - Currently expanded information section
 *
 * @hooks
 * - useRouter - For navigation between pages
 * - useState - For managing component state
 * - useRef - For managing section references for scroll functionality
 */
const TrackOrder = () => {
  const router = useRouter();
  const [trackingNumber, setTrackingNumber] = useState("");
  const [orderStatus, setOrderStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
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

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold mb-4">Track Your Order</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Enter your tracking number to get the latest update on your order
            status.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-7 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-2">
            <div className="sticky top-8 rounded-xl border shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">Contents</h2>

              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => router.push("/customer_service/track_order")}
                    className="flex items-center w-full text-left px-3 py-2 rounded-lg transition-colors hover:bg-secondary hover:text-secondary-foreground "
                  >
                    <FaArrowLeft className="h-5 w-5 mr-2" />
                    <span className="ml-2 text-sm font-medium">
                      Back to Customer Service
                    </span>
                  </button>
                </li>

                <li>
                  <button
                    onClick={() => router.push("/customer_service/orders")}
                    className="flex items-center w-full text-left px-3 py-2 rounded-lg transition-colors hover:bg-secondary hover:text-secondary-foreground "
                  >
                    <LuPackageCheck className="h-5 w-5 mr-2" />

                    <span className="ml-2 text-sm font-medium">
                      View My Orders
                    </span>
                  </button>
                </li>

                <li>
                  <button
                    onClick={() => router.push("/policies/return_policy")}
                    className="flex items-center w-full text-left px-3 py-2 rounded-lg transition-colors hover:bg-secondary hover:text-secondary-foreground "
                  >
                    <IoMdRefresh className="h-5 w-5 mr-2" />
                    <span className="ml-2 text-sm font-medium">
                      Return Policy
                    </span>
                  </button>
                </li>
              </ul>

              <hr className="my-4" />

              <div className="p-4 bg-muted rounded-lg space-y-2">
                <h3 className="font-medium flex items-center">
                  <FiHelpCircle className="h-4 w-4 mr-2" />
                  Need Help?
                </h3>
                <p className="text-sm text-foreground">
                  Our customer service team is available to assist you with any
                  questions.
                </p>
                <div className="flex mt-2">
                  <Link href="/customer_service" className="w-full">
                    <Button className="w-full">
                      <FaMessage className="h-4 w-4 mr-2" /> Contact Support
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-5 space-y-8">
            {/* Tracking Form */}
            <Card className="shadow-lg p-8 rounded-lg">
              <div className="mb-6">
                <label
                  htmlFor="tracking-number"
                  className="text-lg font-medium mb-4 mt-8"
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
                      <FaClock className="h-4 w-4 mr-1 animate-spin" />
                    ) : (
                      <FaSearch className="h-4 w-4 mr-1" />
                    )}
                    {loading ? "Searching..." : "Track"}
                  </Button>
                </div>
                <p className="text-xs mt-1">
                  You can find your tracking number in your order confirmation
                  email.
                </p>
              </div>

              {/* Tracking Results */}
              {orderStatus && (
                <div className="mt-8 border-t pt-6">
                  <h3 className="text-lg font-medium mb-4 rounded-lg">
                    Order Status:
                  </h3>

                  {orderStatus === "Order not found" ? (
                    <div className="p-4 rounded-lg flex items-start bg-red-200">
                      <IoIosAlert className="h-5 w-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" />
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
                      <div className="p-4 rounded-lg mb-6">
                        <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <dt className="text-sm font-medium">
                              Tracking Number
                            </dt>
                            <dd className="mt-1 text-sm">{trackingNumber}</dd>
                          </div>
                          <div>
                            <dt className="text-sm font-medium">Status</dt>
                            <dd className="mt-1 text-sm font-semibold">
                              <Badge
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium `}
                                variant={
                                  orderDetails?.status === "Delivered"
                                    ? "blue"
                                    : orderDetails?.status === "In Transit"
                                    ? "orange"
                                    : orderDetails?.status === "Shipped"
                                    ? "emerald"
                                    : "purple"
                                }
                              >
                                {orderDetails?.status}
                              </Badge>
                            </dd>
                          </div>
                          <div>
                            <dt className="text-sm font-medium">Carrier</dt>
                            <dd className="mt-1 text-sm">
                              {orderDetails?.carrier}
                            </dd>
                          </div>
                          <div>
                            <dt className="text-sm font-medium">
                              Estimated Delivery
                            </dt>
                            <dd className="mt-1 text-sm">
                              {orderDetails?.estimatedDelivery}
                            </dd>
                          </div>
                        </dl>
                      </div>

                      {/* Shipping Progress Indicator */}
                      <div className="mb-6">
                        <h4 className="text-sm font-medium mb-3">
                          Shipping Progress
                        </h4>
                        <div className="relative">
                          <div className="overflow-hidden h-2 mb-6 text-xs flex rounded">
                            <div
                              className={`shadow-none flex flex-col text-center whitespace-nowrap  justify-center  transition-all duration-500 ${
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

                          <ol className="w-full space-y-4 sm:flex sm:space-x-8 sm:space-y-0 rtl:space-x-reverse md:grid md:grid-cols-2 md:gap-8">
                            <li
                              className={cn(
                                "flex items-start space-x-2.5 rtl:space-x-reverse",
                                {
                                  "text-purple-600 dark:text-purple-500":
                                    currentStep >= 1,
                                }
                              )}
                            >
                              <span
                                className={cn(
                                  "flex items-center justify-center w-8 h-8 rounded-full shrink-0 border",
                                  {
                                    "border-secondary text-secondary":
                                      currentStep >= 1,
                                  }
                                )}
                              >
                                1
                              </span>
                              <span>
                                <h3
                                  className={cn("font-medium leading-tight", {
                                    uppercase: currentStep >= 1,
                                  })}
                                >
                                  Processing
                                </h3>
                                <p className="text-sm text-foreground">
                                  Your order is being processed, and we are
                                  preparing your items for shipment.
                                </p>
                              </span>
                            </li>

                            <li
                              className={cn(
                                "flex items-start space-x-2.5 rtl:space-x-reverse",
                                {
                                  "text-emerald-600 dark:text-emerald-500":
                                    currentStep >= 2,
                                }
                              )}
                            >
                              <span
                                className={cn(
                                  "flex items-center justify-center w-8 h-8 rounded-full shrink-0 border",
                                  {
                                    "border-secondary text-secondary":
                                      currentStep >= 2,
                                  }
                                )}
                              >
                                2
                              </span>
                              <span>
                                <h3
                                  className={cn("font-medium leading-tight", {
                                    uppercase: currentStep >= 2,
                                  })}
                                >
                                  Shipped
                                </h3>
                                <p className="text-sm text-foreground">
                                  Your order has been shipped and is on its way
                                  to the delivery address.
                                </p>
                              </span>
                            </li>

                            <li
                              className={cn(
                                "flex items-start space-x-2.5 rtl:space-x-reverse",
                                {
                                  "text-orange-600 dark:text-orange-500":
                                    currentStep >= 3,
                                }
                              )}
                            >
                              <span
                                className={cn(
                                  "flex items-center justify-center w-8 h-8 rounded-full shrink-0 border",
                                  {
                                    "border-secondary text-secondary":
                                      currentStep >= 3,
                                  }
                                )}
                              >
                                3
                              </span>
                              <span>
                                <h3
                                  className={cn("font-medium leading-tight", {
                                    uppercase: currentStep >= 3,
                                  })}
                                >
                                  In Transit
                                </h3>
                                <p className="text-sm text-foreground">
                                  Your package is currently in transit and
                                  should arrive soon.
                                </p>
                              </span>
                            </li>

                            <li
                              className={cn(
                                "flex items-start space-x-2.5 rtl:space-x-reverse",
                                {
                                  "text-blue-600 dark:text-blue-500":
                                    currentStep >= 4,
                                }
                              )}
                            >
                              <span
                                className={cn(
                                  "flex items-center justify-center w-8 h-8 rounded-full shrink-0 border",
                                  {
                                    "border-secondary text-secondary":
                                      currentStep >= 4,
                                  }
                                )}
                              >
                                4
                              </span>
                              <span>
                                <h3
                                  className={cn("font-medium leading-tight", {
                                    uppercase: currentStep >= 4,
                                  })}
                                >
                                  Delivered
                                </h3>
                                <p className="text-sm text-foreground">
                                  Your order has been delivered! We hope you
                                  enjoy your purchase.
                                </p>
                              </span>
                            </li>
                          </ol>
                        </div>
                      </div>

                      {/* Last Update */}
                      <div className="border-t pt-4">
                        <h4 className="text-sm font-medium mb-2">
                          Last Update
                        </h4>
                        <p className="text-sm text-foreground">
                          {orderDetails?.lastUpdate}
                        </p>
                      </div>

                      {/* Tracking Link */}
                      {orderDetails?.carrier !== "Pending" && (
                        <div className="mt-4">
                          <Button className="w-1/4 text-wrap p-2">
                            View Details on {orderDetails?.carrier} Website
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
              className="rounded-lg border shadow-md overflow-hidden"
            >
              <button
                onClick={() => toggleSection("faqs")}
                className="w-full flex items-center justify-between p-6 focus:outline-none"
              >
                <div className="flex items-center gap-3">
                  <FiHelpCircle className="h-6 w-6" />
                  <h2 className="text-2xl font-semibold ml-3">
                    Frequently Asked Questions
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
                <div className="p-6 pt-0 border-t">
                  <div className="space-y-4 py-8">
                    {trackingOrderFAQs.map((faq, index) => (
                      <div key={index} className="p-4 rounded-lg">
                        <h3 className="text-lg font-medium mb-2 flex items-start">
                          <span className="mr-2">Q:</span>
                          {faq.question}
                        </h3>
                        <div className="ml-6">
                          <p>{faq.answer}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 p-6 bg-muted rounded-lg">
                    <h3 className="text-lg font-medium mb-2">
                      Need additional help?
                    </h3>
                    <p className="mb-4">
                      If you need further assistance with tracking your order or
                      have any other questions, please contact our customer
                      service team.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Button variant={"teritary"}>
                        <FaMailBulk className="h-4 w-4 mr-2" /> Email Support
                      </Button>
                      <Button
                        className="inline-flex items-center"
                        variant={"teritaryOutline"}
                      >
                        <FaMessage className="h-4 w-4 mr-2" /> Live Chat
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
              className="rounded-lg border shadow-md overflow-hidden"
            >
              <button
                onClick={() => toggleSection("shipping-info")}
                className="w-full flex items-center justify-between p-6 focus:outline-none"
              >
                <div className="flex items-center gap-3">
                  <IoBarChartSharp className="h-6 w-6" />
                  <h2 className="text-2xl font-semibold ml-3">
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
                <div className="p-6 pt-0 border-t">
                  <div className="mt-4 p-3">
                    <h3 className="text-lg font-medium ">Shipping Carriers</h3>
                    <p className="text-sm mb-2">
                      We partner with the following carriers to deliver your
                      orders:
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <Badge variant={"blue"}>FedEx</Badge>
                      <Badge variant={"blue"}>UPS</Badge>
                      <Badge variant={"blue"}>USPS</Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-8">
                    <div className="p-4 rounded-lg bg-muted">
                      <h3 className="text-lg font-medium mb-4">
                        Standard Shipping
                      </h3>
                      <ul className="space-y-1 text-sm">
                        <li>• Delivery in 3-7 business days</li>
                        <li>• Free on orders over $50</li>
                        <li>• $4.99 for orders under $50</li>
                      </ul>
                    </div>

                    <div className="p-4 rounded-lg bg-muted">
                      <h3 className="text-lg font-medium mb-4">
                        Express Shipping
                      </h3>
                      <ul className="space-y-1 text-sm">
                        <li>• Delivery in 1-3 business days</li>
                        <li>• $12.99 flat rate</li>
                        <li>• Available for most locations</li>
                      </ul>
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
