"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { orderStatuses } from "@/lib/constants/constants";
import { trackingOrderFAQs } from "@/lib/constants/faqs";
import { cn, toggleAccordionSection } from "@/lib/utils";
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
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-7xl">
        <div className="mb-12 text-center">
          <h1 className="mb-4 font-extrabold text-5xl">Track Your Order</h1>
          <p className="mx-auto max-w-2xl text-xl">
            Enter your tracking number to get the latest update on your order
            status.
          </p>
        </div>

        <div className="gap-8 grid grid-cols-1 lg:grid-cols-7">
          {/* Sidebar */}
          <div className="lg:col-span-2">
            <div className="top-18 sticky shadow-md p-6 border rounded-xl">
              <h2 className="mb-4 font-bold text-xl">Contents</h2>

              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => router.push("/customer_service/track_order")}
                    className="flex items-center hover:bg-secondary px-3 py-2 rounded-lg w-full text-left hover:text-secondary-foreground transition-colors"
                  >
                    <FaArrowLeft className="mr-2 w-5 h-5" />
                    <span className="ml-2 font-medium text-sm">
                      Back to Customer Service
                    </span>
                  </button>
                </li>

                <li>
                  <button
                    onClick={() => router.push("/user/orders")}
                    className="flex items-center hover:bg-secondary px-3 py-2 rounded-lg w-full text-left hover:text-secondary-foreground transition-colors"
                  >
                    <LuPackageCheck className="mr-2 w-5 h-5" />

                    <span className="ml-2 font-medium text-sm">
                      View My Orders
                    </span>
                  </button>
                </li>

                <li>
                  <button
                    onClick={() => router.push("/policies/return_policy")}
                    className="flex items-center hover:bg-secondary px-3 py-2 rounded-lg w-full text-left hover:text-secondary-foreground transition-colors"
                  >
                    <IoMdRefresh className="mr-2 w-5 h-5" />
                    <span className="ml-2 font-medium text-sm">
                      Return Policy
                    </span>
                  </button>
                </li>
              </ul>

              <hr className="my-4" />

              <div className="space-y-2 bg-muted p-4 rounded-lg">
                <h3 className="flex items-center font-medium">
                  <FiHelpCircle className="mr-2 w-4 h-4" />
                  Need Help?
                </h3>
                <p className="text-foreground text-sm">
                  Our customer service team is available to assist you with any
                  questions.
                </p>
                <div className="flex mt-2">
                  <Link href="/customer_service" className="w-full">
                    <Button className="w-full">
                      <FaMessage className="mr-2 w-4 h-4" /> Contact Support
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-8 lg:col-span-5">
            {/* Tracking Form */}
            <Card className="shadow-lg p-8 rounded-lg">
              <div className="mb-6">
                <label
                  htmlFor="tracking-number"
                  className="mt-8 mb-4 font-medium text-lg"
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
                    className="top-0 right-0 absolute rounded-l-none h-full"
                    disabled={loading || !trackingNumber.trim()}
                  >
                    {loading ? (
                      <FaClock className="mr-1 w-4 h-4 animate-spin" />
                    ) : (
                      <FaSearch className="mr-1 w-4 h-4" />
                    )}
                    {loading ? "Searching..." : "Track"}
                  </Button>
                </div>
                <p className="mt-1 text-xs">
                  You can find your tracking number in your order confirmation
                  email.
                </p>
              </div>

              {/* Tracking Results */}
              {orderStatus && (
                <div className="mt-8 pt-6 border-t">
                  <h3 className="mb-4 rounded-lg font-medium text-lg">
                    Order Status:
                  </h3>

                  {orderStatus === "Order not found" ? (
                    <div className="flex items-start bg-red-200 p-4 rounded-lg">
                      <IoIosAlert className="flex-shrink-0 mt-0.5 mr-3 w-5 h-5 text-red-600" />
                      <div>
                        <h4 className="font-medium text-red-800">
                          Order Not Found
                        </h4>
                        <p className="mt-1 text-red-700 text-sm">
                          We couldn't find an order with that tracking number.
                          Please check the number and try again.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="mb-6 p-4 rounded-lg">
                        <dl className="gap-4 grid grid-cols-1 md:grid-cols-2">
                          <div>
                            <dt className="font-medium text-sm">
                              Tracking Number
                            </dt>
                            <dd className="mt-1 text-sm">{trackingNumber}</dd>
                          </div>
                          <div>
                            <dt className="font-medium text-sm">Status</dt>
                            <dd className="mt-1 font-semibold text-sm">
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
                            <dt className="font-medium text-sm">Carrier</dt>
                            <dd className="mt-1 text-sm">
                              {orderDetails?.carrier}
                            </dd>
                          </div>
                          <div>
                            <dt className="font-medium text-sm">
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
                        <h4 className="mb-3 font-medium text-sm">
                          Shipping Progress
                        </h4>
                        <div className="relative">
                          <div className="flex mb-6 rounded h-2 text-xs overflow-hidden">
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

                          <ol className="sm:flex md:gap-8 rtl:space-x-reverse sm:space-x-8 space-y-4 sm:space-y-0 md:grid md:grid-cols-2 w-full">
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
                                <p className="text-foreground text-sm">
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
                                <p className="text-foreground text-sm">
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
                                <p className="text-foreground text-sm">
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
                                <p className="text-foreground text-sm">
                                  Your order has been delivered! We hope you
                                  enjoy your purchase.
                                </p>
                              </span>
                            </li>
                          </ol>
                        </div>
                      </div>

                      {/* Last Update */}
                      <div className="pt-4 border-t">
                        <h4 className="mb-2 font-medium text-sm">
                          Last Update
                        </h4>
                        <p className="text-foreground text-sm">
                          {orderDetails?.lastUpdate}
                        </p>
                      </div>

                      {/* Tracking Link */}
                      {orderDetails?.carrier !== "Pending" && (
                        <div className="mt-4">
                          <Button className="p-2 w-1/4 text-wrap">
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
              className="shadow-md border rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleSection("faqs")}
                className="flex justify-between items-center p-6 w-full focus:outline-none"
              >
                <div className="flex items-center gap-3">
                  <FiHelpCircle className="w-6 h-6" />
                  <h2 className="ml-3 font-semibold text-2xl">
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
                        <h3 className="flex items-start mb-2 font-medium text-lg">
                          <span className="mr-2">Q:</span>
                          {faq.question}
                        </h3>
                        <div className="ml-6">
                          <p>{faq.answer}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-muted mt-6 p-6 rounded-lg">
                    <h3 className="mb-2 font-medium text-lg">
                      Need additional help?
                    </h3>
                    <p className="mb-4">
                      If you need further assistance with tracking your order or
                      have any other questions, please contact our customer
                      service team.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Button variant={"teritary"}>
                        <FaMailBulk className="mr-2 w-4 h-4" /> Email Support
                      </Button>
                      <Button
                        className="inline-flex items-center"
                        variant={"teritaryOutline"}
                      >
                        <FaMessage className="mr-2 w-4 h-4" /> Live Chat
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
              className="shadow-md border rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleSection("shipping-info")}
                className="flex justify-between items-center p-6 w-full focus:outline-none"
              >
                <div className="flex items-center gap-3">
                  <IoBarChartSharp className="w-6 h-6" />
                  <h2 className="ml-3 font-semibold text-2xl">
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
                    <h3 className="font-medium text-lg">Shipping Carriers</h3>
                    <p className="mb-2 text-sm">
                      We partner with the following carriers to deliver your
                      orders:
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <Badge variant={"blue"}>FedEx</Badge>
                      <Badge variant={"blue"}>UPS</Badge>
                      <Badge variant={"blue"}>USPS</Badge>
                    </div>
                  </div>

                  <div className="gap-6 grid grid-cols-1 md:grid-cols-2 py-8">
                    <div className="bg-muted p-4 rounded-lg">
                      <h3 className="mb-4 font-medium text-lg">
                        Standard Shipping
                      </h3>
                      <ul className="space-y-1 text-sm">
                        <li>• Delivery in 3-7 business days</li>
                        <li>• Free on orders over $50</li>
                        <li>• $4.99 for orders under $50</li>
                      </ul>
                    </div>

                    <div className="bg-muted p-4 rounded-lg">
                      <h3 className="mb-4 font-medium text-lg">
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
