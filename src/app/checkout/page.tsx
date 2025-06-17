"use client";

import { fetchRandomUser } from "@/api/users";
import { useAuth } from "@/app/context/authContext";
import { useCart } from "@/app/context/cartContext";
import { useCurrency } from "@/app/context/currencyContext";
import { useOrder } from "@/app/context/orderContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  CreditCard,
  Lock,
  MapPin,
  Package,
  Shuffle,
  Truck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function CheckoutPage() {
  const router = useRouter();
  const {
    items,
    grandTotal,
    totalPrice,
    discountAmount,
    shippingFee,
    membershipDiscount,
    appliedDiscount,
    clearCart,
  } = useCart();
  const { formatPrice } = useCurrency();
  const { user } = useAuth();
  const { createOrder } = useOrder();

  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [sameAsBilling, setSameAsBilling] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState("card");

  // Shipping information
  const [shippingInfo, setShippingInfo] = useState({
    fullName: user?.username || "",
    email: user?.email || "",
    phone: user?.phoneNumber || "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
  });

  // Billing information
  const [billingInfo, setBillingInfo] = useState({
    fullName: user?.username || "",
    email: user?.email || "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: "",
  });

  const [specialInstructions, setSpecialInstructions] = useState("");
  const [isLoadingAutofill, setIsLoadingAutofill] = useState(false);

  // Autofill functions for demo purposes
  const autofillShippingInfo = async () => {
    setIsLoadingAutofill(true);
    try {
      let shippingData;

      if (user) {
        // Use logged-in user's data
        shippingData = {
          fullName: user.username || "John Doe",
          email: user.email || "user@example.com",
          phone: user.phoneNumber || "555-123-4567",
          address: "123 Main Street",
          city: "Sample City",
          state: "CA",
          zipCode: "90210",
          country: "United States",
        };
      } else {
        // Fall back to random user if no user is logged in
        const randomUser = await fetchRandomUser();
        shippingData = {
          fullName: `${randomUser.firstName} ${randomUser.lastName}`,
          email: randomUser.email,
          phone: randomUser.phone,
          address: randomUser.address.address,
          city: randomUser.address.city,
          state: randomUser.address.state,
          zipCode: randomUser.address.postalCode,
          country: "United States",
        };
      }

      setShippingInfo(shippingData);

      // Auto-fill billing if same as shipping
      if (sameAsBilling) {
        setBillingInfo((prev) => ({
          ...prev,
          fullName: shippingData.fullName,
          address: shippingData.address,
          city: shippingData.city,
          state: shippingData.state,
          zipCode: shippingData.zipCode,
          country: shippingData.country,
        }));
      }

      toast.success(
        user 
          ? "User shipping info filled!"
          : "Demo shipping info filled! (Note: This is fake data for testing purposes)"
      );
    } catch (error) {
      toast.error("Failed to load demo data");
    } finally {
      setIsLoadingAutofill(false);
    }
  };

  const autofillPaymentInfo = async () => {
    setIsLoadingAutofill(true);
    try {
      let paymentData;

      if (user) {
        // Use consistent demo payment data for logged-in user
        const currentYear = new Date().getFullYear();
        const expiryYear = currentYear + 2; // Always 2 years from now for consistency
        const expiryDate = `12/${expiryYear.toString().slice(-2)}`;

        paymentData = {
          cardNumber: "4532 1234 5678 9012", // Demo Visa card
          expiryDate: expiryDate,
          cvv: "123",
          nameOnCard: user.username || "John Doe",
        };
      } else {
        // Fall back to random user if no user is logged in
        const randomUser = await fetchRandomUser();

        // Generate a random expiry date (future date)
        const currentYear = new Date().getFullYear();
        const expiryYear = currentYear + Math.floor(Math.random() * 5) + 1;
        const expiryMonth = Math.floor(Math.random() * 12) + 1;
        const expiryDate = `${expiryMonth
          .toString()
          .padStart(2, "0")}/${expiryYear.toString().slice(-2)}`;

        // Generate a random CVV
        const cvv = Math.floor(Math.random() * 900) + 100;

        paymentData = {
          cardNumber: randomUser.bank.cardNumber,
          expiryDate: expiryDate,
          cvv: cvv.toString(),
          nameOnCard: `${randomUser.firstName} ${randomUser.lastName}`,
        };
      }

      setBillingInfo((prev) => ({
        ...prev,
        ...paymentData,
      }));

      toast.success(
        user
          ? "User payment info filled!"
          : "Demo payment info filled! (Note: This is fake data for testing purposes)"
      );
    } catch (error) {
      toast.error("Failed to load demo data");
    } finally {
      setIsLoadingAutofill(false);
    }
  };

  // Validation functions
  const validateShipping = () => {
    const required = [
      "fullName",
      "email",
      "phone",
      "address",
      "city",
      "state",
      "zipCode",
    ];
    return required.every((field) =>
      shippingInfo[field as keyof typeof shippingInfo]?.trim()
    );
  };

  const validateBilling = () => {
    if (sameAsBilling) return true;

    const required = ["fullName", "address", "city", "state", "zipCode"];
    const billingValid = required.every((field) =>
      billingInfo[field as keyof typeof billingInfo]?.trim()
    );

    if (paymentMethod === "card") {
      return (
        billingValid &&
        billingInfo.cardNumber &&
        billingInfo.expiryDate &&
        billingInfo.cvv &&
        billingInfo.nameOnCard
      );
    }

    return billingValid;
  };

  const handleShippingChange = (field: string, value: string) => {
    setShippingInfo((prev) => ({ ...prev, [field]: value }));

    // Auto-fill billing if same as shipping
    if (
      sameAsBilling &&
      ["fullName", "address", "city", "state", "zipCode", "country"].includes(
        field
      )
    ) {
      setBillingInfo((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleBillingChange = (field: string, value: string) => {
    setBillingInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleSameAsBillingChange = (checked: boolean) => {
    setSameAsBilling(checked);
    if (checked) {
      setBillingInfo((prev) => ({
        ...prev,
        fullName: shippingInfo.fullName,
        address: shippingInfo.address,
        city: shippingInfo.city,
        state: shippingInfo.state,
        zipCode: shippingInfo.zipCode,
        country: shippingInfo.country,
      }));
    }
  };

  const handleNext = () => {
    if (currentStep === 1 && !validateShipping()) {
      toast.error("Please fill in all shipping information");
      return;
    }
    if (currentStep === 2 && !validateBilling()) {
      toast.error("Please fill in all billing and payment information");
      return;
    }
    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handlePlaceOrder = async () => {
    if (!validateShipping() || !validateBilling()) {
      toast.error("Please complete all required information");
      return;
    }

    setIsProcessing(true);

    try {
      const result = await createOrder(
        items,
        {
          totalAmount: totalPrice,
          discountAmount,
          membershipDiscount,
          shippingFee,
          grandTotal,
          discountCode: appliedDiscount?.rule.code,
        },
        shippingInfo,
        billingInfo,
        paymentMethod
      );

      if (result.success) {
        clearCart();
        toast.success("Order placed successfully!");
        router.push(`/checkout/confirmation?orderId=${result.orderId}`);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen">
        <div className="mx-auto px-6 lg:px-8 py-12 max-w-7xl">
          <div className="py-16 text-center">
            <Package className="mx-auto mb-4 w-16 h-16 text-muted-foreground" />
            <h1 className="mb-2 font-bold text-2xl">Your cart is empty</h1>
            <p className="mb-6 text-muted-foreground">
              Add some items to your cart before checkout
            </p>
            <Button asChild>
              <Link href="/shopping">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="mx-auto px-6 lg:px-8 py-12 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/cart">
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to Cart
            </Link>
          </Button>
          <h1 className="font-bold text-3xl">Checkout</h1>
          <p className="text-muted-foreground">Complete your order</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-center items-center space-x-4">
            {[
              { step: 1, title: "Shipping", icon: Truck },
              { step: 2, title: "Payment", icon: CreditCard },
              { step: 3, title: "Review", icon: Package },
            ].map(({ step, title, icon: Icon }) => (
              <div key={step} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    currentStep >= step
                      ? " border-primary"
                      : "bg-background text-muted-foreground border-muted"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span
                  className={`ml-2 text-sm font-medium ${
                    currentStep >= step
                      ? "text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {title}
                </span>
                {step < 3 && <div className="bg-muted mx-4 w-8 h-px" />}
              </div>
            ))}
          </div>
        </div>

        <div className="gap-8 grid grid-cols-1 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 1: Shipping Information */}
            {currentStep === 1 && (
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="flex items-center">
                      <Truck className="mr-2 w-5 h-5" />
                      Shipping Information
                    </CardTitle>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={autofillShippingInfo}
                      disabled={isLoadingAutofill}
                      className="text-xs"
                    >
                      <Shuffle className="mr-1 w-3 h-3" />
                      {isLoadingAutofill ? "Loading..." : "Fill Demo Data"}
                    </Button>
                  </div>
                  <p className="text-muted-foreground text-xs">
                    Demo autofill uses fake data from DummyJSON for testing
                    purposes only
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
                    <div>
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input
                        id="fullName"
                        value={shippingInfo.fullName}
                        onChange={(e) =>
                          handleShippingChange("fullName", e.target.value)
                        }
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={shippingInfo.email}
                        onChange={(e) =>
                          handleShippingChange("email", e.target.value)
                        }
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      value={shippingInfo.phone}
                      onChange={(e) =>
                        handleShippingChange("phone", e.target.value)
                      }
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div>
                    <Label htmlFor="address">Address *</Label>
                    <Input
                      id="address"
                      value={shippingInfo.address}
                      onChange={(e) =>
                        handleShippingChange("address", e.target.value)
                      }
                      placeholder="Enter your street address"
                    />
                  </div>

                  <div className="gap-4 grid grid-cols-1 md:grid-cols-3">
                    <div>
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        value={shippingInfo.city}
                        onChange={(e) =>
                          handleShippingChange("city", e.target.value)
                        }
                        placeholder="City"
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State *</Label>
                      <Input
                        id="state"
                        value={shippingInfo.state}
                        onChange={(e) =>
                          handleShippingChange("state", e.target.value)
                        }
                        placeholder="State"
                      />
                    </div>
                    <div>
                      <Label htmlFor="zipCode">ZIP Code *</Label>
                      <Input
                        id="zipCode"
                        value={shippingInfo.zipCode}
                        onChange={(e) =>
                          handleShippingChange("zipCode", e.target.value)
                        }
                        placeholder="ZIP Code"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="country">Country *</Label>
                    <Select
                      value={shippingInfo.country}
                      onValueChange={(value) =>
                        handleShippingChange("country", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="United States">
                          United States
                        </SelectItem>
                        <SelectItem value="Canada">Canada</SelectItem>
                        <SelectItem value="United Kingdom">
                          United Kingdom
                        </SelectItem>
                        <SelectItem value="Australia">Australia</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button onClick={handleNext} disabled={!validateShipping()}>
                      Continue to Payment
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Payment Information */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="flex items-center">
                        <CreditCard className="mr-2 w-5 h-5" />
                        Payment Method
                      </CardTitle>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={autofillPaymentInfo}
                        disabled={isLoadingAutofill || paymentMethod !== "card"}
                        className="text-xs"
                      >
                        <Shuffle className="mr-1 w-3 h-3" />
                        {isLoadingAutofill ? "Loading..." : "Fill Demo Data"}
                      </Button>
                    </div>
                    <p className="text-muted-foreground text-xs">
                      Demo autofill uses fake payment data for testing purposes
                      only
                    </p>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup
                      value={paymentMethod}
                      onValueChange={setPaymentMethod}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="card" id="card" />
                        <Label htmlFor="card">Credit/Debit Card</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="paypal" id="paypal" />
                        <Label htmlFor="paypal">PayPal</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="apple-pay" id="apple-pay" />
                        <Label htmlFor="apple-pay">Apple Pay</Label>
                      </div>
                    </RadioGroup>

                    {paymentMethod === "card" && (
                      <div className="space-y-4 mt-6">
                        <div>
                          <Label htmlFor="nameOnCard">Name on Card *</Label>
                          <Input
                            id="nameOnCard"
                            value={billingInfo.nameOnCard}
                            onChange={(e) =>
                              handleBillingChange("nameOnCard", e.target.value)
                            }
                            placeholder="Enter name as it appears on card"
                          />
                        </div>
                        <div>
                          <Label htmlFor="cardNumber">Card Number *</Label>
                          <Input
                            id="cardNumber"
                            value={billingInfo.cardNumber}
                            onChange={(e) =>
                              handleBillingChange("cardNumber", e.target.value)
                            }
                            placeholder="1234 5678 9012 3456"
                          />
                        </div>
                        <div className="gap-4 grid grid-cols-2">
                          <div>
                            <Label htmlFor="expiryDate">Expiry Date *</Label>
                            <Input
                              id="expiryDate"
                              value={billingInfo.expiryDate}
                              onChange={(e) =>
                                handleBillingChange(
                                  "expiryDate",
                                  e.target.value
                                )
                              }
                              placeholder="MM/YY"
                            />
                          </div>
                          <div>
                            <Label htmlFor="cvv">CVV *</Label>
                            <Input
                              id="cvv"
                              value={billingInfo.cvv}
                              onChange={(e) =>
                                handleBillingChange("cvv", e.target.value)
                              }
                              placeholder="123"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <MapPin className="mr-2 w-5 h-5" />
                      Billing Address
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="sameAsBilling"
                        checked={sameAsBilling}
                        onCheckedChange={handleSameAsBillingChange}
                      />
                      <Label htmlFor="sameAsBilling">
                        Same as shipping address
                      </Label>
                    </div>

                    {!sameAsBilling && (
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="billingName">Full Name *</Label>
                          <Input
                            id="billingName"
                            value={billingInfo.fullName}
                            onChange={(e) =>
                              handleBillingChange("fullName", e.target.value)
                            }
                            placeholder="Enter billing name"
                          />
                        </div>
                        <div>
                          <Label htmlFor="billingAddress">Address *</Label>
                          <Input
                            id="billingAddress"
                            value={billingInfo.address}
                            onChange={(e) =>
                              handleBillingChange("address", e.target.value)
                            }
                            placeholder="Enter billing address"
                          />
                        </div>
                        <div className="gap-4 grid grid-cols-1 md:grid-cols-3">
                          <div>
                            <Label htmlFor="billingCity">City *</Label>
                            <Input
                              id="billingCity"
                              value={billingInfo.city}
                              onChange={(e) =>
                                handleBillingChange("city", e.target.value)
                              }
                              placeholder="City"
                            />
                          </div>
                          <div>
                            <Label htmlFor="billingState">State *</Label>
                            <Input
                              id="billingState"
                              value={billingInfo.state}
                              onChange={(e) =>
                                handleBillingChange("state", e.target.value)
                              }
                              placeholder="State"
                            />
                          </div>
                          <div>
                            <Label htmlFor="billingZip">ZIP Code *</Label>
                            <Input
                              id="billingZip"
                              value={billingInfo.zipCode}
                              onChange={(e) =>
                                handleBillingChange("zipCode", e.target.value)
                              }
                              placeholder="ZIP Code"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex justify-between pt-4">
                      <Button variant="outline" onClick={handleBack}>
                        Back to Shipping
                      </Button>
                      <Button
                        onClick={handleNext}
                        disabled={!validateBilling()}
                      >
                        Review Order
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Step 3: Order Review */}
            {currentStep === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Package className="mr-2 w-5 h-5" />
                    Order Review
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Order Items */}
                  <div>
                    <h3 className="mb-4 font-semibold">Order Items</h3>
                    <div className="space-y-3">
                      {items.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center space-x-4 p-3 border rounded-lg"
                        >
                          <div className="flex justify-center items-center bg-muted rounded-lg w-16 h-16">
                            {item.thumbnail ? (
                              <Image
                                src={item.thumbnail}
                                alt={item.title}
                                className="rounded-lg w-full h-full object-cover"
                                width={64}
                                height={64}
                                loading="lazy"
                              />
                            ) : (
                              <Package className="w-8 h-8 text-muted-foreground" />
                            )}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">{item.title}</h4>
                            <p className="text-muted-foreground text-sm">
                              Quantity: {item.quantity}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">
                              {formatPrice(item.price * item.quantity)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Shipping & Billing Info */}
                  <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
                    <div>
                      <h3 className="mb-2 font-semibold">Shipping Address</h3>
                      <div className="text-muted-foreground text-sm">
                        <p>{shippingInfo.fullName}</p>
                        <p>{shippingInfo.address}</p>
                        <p>
                          {shippingInfo.city}, {shippingInfo.state}{" "}
                          {shippingInfo.zipCode}
                        </p>
                        <p>{shippingInfo.country}</p>
                        <p>{shippingInfo.phone}</p>
                      </div>
                    </div>
                    <div>
                      <h3 className="mb-2 font-semibold">Payment Method</h3>
                      <div className="text-muted-foreground text-sm">
                        <p className="capitalize">
                          {paymentMethod.replace("-", " ")}
                        </p>
                        {paymentMethod === "card" && billingInfo.cardNumber && (
                          <p>
                            **** **** **** {billingInfo.cardNumber.slice(-4)}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Special Instructions */}
                  <div>
                    <Label htmlFor="instructions">
                      Special Instructions (Optional)
                    </Label>
                    <Textarea
                      id="instructions"
                      value={specialInstructions}
                      onChange={(e) => setSpecialInstructions(e.target.value)}
                      placeholder="Any special delivery instructions..."
                      className="mt-1"
                    />
                  </div>

                  <div className="flex justify-between pt-4">
                    <Button variant="outline" onClick={handleBack}>
                      Back to Payment
                    </Button>
                    <Button
                      onClick={handlePlaceOrder}
                      disabled={isProcessing}
                      className="min-w-32"
                    >
                      {isProcessing ? (
                        <>
                          <Lock className="mr-2 w-4 h-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Lock className="mr-2 w-4 h-4" />
                          Place Order
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="top-4 sticky">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount ({appliedDiscount?.rule.code})</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}

                {membershipDiscount > 0 && (
                  <div className="flex justify-between text-blue-600">
                    <span>Membership Discount</span>
                    <span>-{formatPrice(membershipDiscount)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>
                    {shippingFee > 0 ? formatPrice(shippingFee) : "FREE"}
                  </span>
                </div>

                <Separator />

                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>{formatPrice(grandTotal)}</span>
                </div>

                <div className="mt-4 text-muted-foreground text-xs">
                  <div className="flex items-center space-x-2 mb-2">
                    <Lock className="w-3 h-3" />
                    <span>Secure SSL encrypted checkout</span>
                  </div>
                  <p>
                    Your payment information is processed securely. We do not
                    store credit card details.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
