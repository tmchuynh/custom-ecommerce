"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  capitalize,
  formatCreditCardNumber,
  formatPhoneNumber,
  getCardType,
  validateCreditCard,
  validateEmail,
  validatePhone,
} from "@/lib/utils";
import { useCart } from "../../context/cartContext";
import { JSX, useState, useEffect, useRef } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Check, X } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";

/**
 * The `CheckoutPage` component represents the checkout page of the e-commerce application.
 * It provides a summary of the user's cart, allows the application of discount codes,
 * and facilitates the checkout process.
 *
 * @component
 *
 * @returns {JSX.Element} The rendered checkout page.
 *
 * @remarks
 * - Displays the cart items, order summary, and discount code input.
 * - Handles discount code validation and application.
 * - Calculates subtotal, tax, shipping, and total amounts dynamically.
 * - Redirects to the home page upon successful checkout.
 *
 * @example
 * ```tsx
 * import CheckoutPage from './checkout/page';
 *
 * const App = () => {
 *   return <CheckoutPage />;
 * };
 * ```
 *
 * @dependencies
 * - `useCart`: Custom hook providing cart-related operations and data.
 * - `useState`: React state management for discount code and application status.
 * - `Button`, `Input`, `Skeleton`, `Separator`: UI components used for layout and styling.
 *
 * @hooks
 * - `useCart`: Provides cart items, subtotal, tax, shipping, discount, and checkout logic.
 * - `useState`: Manages local state for discount code, application status, and error handling.
 *
 * @functions
 * - `handleApplyDiscount`: Validates and applies the discount code.
 * - `handleCheckout`: Initiates the checkout process and redirects on success.
 *
 * @conditions
 * - If the cart is empty, a message is displayed prompting the user to continue shopping.
 * - If a discount code is invalid, an error message is shown.
 * - If a discount code is valid, the discount is applied to the total.
 */
const CheckoutPage = (): JSX.Element => {
  const {
    cartItems,
    getSubTotal,
    calculateTaxAmount,
    calculateShippingCost,
    getShippingMethod,
    getTotalItems,
    getTotalPrice,
    applyDiscount,
    getDiscountedTotal,
    startCheckout,
  } = useCart();

  // Discount state
  const [discountCode, setDiscountCode] = useState<string>("");
  const [discountApplied, setDiscountApplied] = useState<boolean>(false);
  const [discountError, setDiscountError] = useState<boolean>(false);

  // Form state for customer information
  const [customerName, setCustomerName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  // Form state for shipping address
  const [shippingAddress, setShippingAddress] = useState<string>("");
  const [shippingCity, setShippingCity] = useState<string>("");
  const [shippingState, setShippingState] = useState<string>("");
  const [shippingZip, setShippingZip] = useState<string>("");

  // Form state for payment information
  const [cardNumber, setCardNumber] = useState<string>("");
  const [cardType, setCardType] = useState<string>("");
  const [cardExpiry, setCardExpiry] = useState<string>("");
  const [cardCvv, setCardCvv] = useState<string>("");
  const [billingAddress, setBillingAddress] = useState<string>("");
  const [billingCity, setBillingCity] = useState<string>("");
  const [billingState, setBillingState] = useState<string>("");
  const [billingZip, setBillingZip] = useState<string>("");

  // State for the "same as shipping" checkbox
  const [sameAsShipping, setSameAsShipping] = useState<boolean>(false);

  // Validation states
  const [formErrors, setFormErrors] = useState<{
    name?: string;
    phone?: string;
    email?: string;
    cardNumber?: string;
    cardExpiry?: string;
    cardCvv?: string;
    shippingAddress?: string;
  }>({});

  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  // Track which fields have been touched/interacted with
  const [touchedFields, setTouchedFields] = useState<{
    name: boolean;
    phone: boolean;
    email: boolean;
    cardNumber: boolean;
    cardExpiry: boolean;
    cardCvv: boolean;
    shippingAddress: boolean;
  }>({
    name: false,
    phone: false,
    email: false,
    cardNumber: false,
    cardExpiry: false,
    cardCvv: false,
    shippingAddress: false,
  });

  // Calculate values for order summary
  const subtotal = getSubTotal();
  const tax = calculateTaxAmount(subtotal);
  const shippingMethod = getShippingMethod(getTotalItems());
  const shipping = calculateShippingCost(shippingMethod);

  // Update billing address when sameAsShipping changes
  useEffect(() => {
    if (sameAsShipping) {
      setBillingAddress(shippingAddress);
      setBillingCity(shippingCity);
      setBillingState(shippingState);
      setBillingZip(shippingZip);
    }
  }, [
    sameAsShipping,
    shippingAddress,
    shippingCity,
    shippingState,
    shippingZip,
  ]);

  // Validate form whenever relevant fields change
  useEffect(() => {
    validateForm();
  }, [
    customerName,
    phoneNumber,
    email,
    cardNumber,
    cardExpiry,
    cardCvv,
    shippingAddress,
  ]);

  const handleBlur = (field: keyof typeof touchedFields) => {
    setTouchedFields((prev) => ({
      ...prev,
      [field]: true,
    }));
  };

  const validateForm = () => {
    const errors: {
      name?: string;
      phone?: string;
      email?: string;
      cardNumber?: string;
      cardExpiry?: string;
      cardCvv?: string;
      shippingAddress?: string;
    } = {};

    // Validate customer name
    if (!customerName.trim()) {
      errors.name = "Name is required";
    }

    // Validate phone number
    if (!validatePhone(phoneNumber)) {
      errors.phone = "Valid phone number is required";
    }

    // Validate email
    if (!validateEmail(email)) {
      errors.email = "Valid email is required";
    }

    // Validate credit card
    if (!validateCreditCard(cardNumber)) {
      errors.cardNumber = "Valid credit card number is required";
    }

    // Validate card expiry
    if (!cardExpiry.match(/^(0[1-9]|1[0-2])\/\d{2}$/)) {
      errors.cardExpiry = "Expiry should be MM/YY";
    }

    // Validate CVV
    if (!cardCvv.match(/^\d{3,4}$/)) {
      errors.cardCvv = "Valid CVV is required";
    }

    // Validate shipping address
    if (!shippingAddress.trim()) {
      errors.shippingAddress = "Shipping address is required";
    }

    setFormErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

  /**
   * Handles the submission of a discount code
   */
  const handleApplyDiscount = () => {
    if (!discountCode.trim()) return;

    const isValidDiscount = applyDiscount(discountCode);

    if (isValidDiscount) {
      setDiscountApplied(true);
      setDiscountError(false);
      toast.success("Discount applied successfully!");
    } else {
      setDiscountError(true);
      setDiscountApplied(false);
      toast.error("Invalid discount code");
    }

    setDiscountCode("");
  };

  /**
   * Handles the checkout process
   */
  const handleCheckout = () => {
    // Mark all fields as touched to show all validation errors
    setTouchedFields({
      name: true,
      phone: true,
      email: true,
      cardNumber: true,
      cardExpiry: true,
      cardCvv: true,
      shippingAddress: true,
    });

    validateForm();

    if (!isFormValid) {
      toast.error(
        "Please fix the errors in the form before placing your order"
      );
      return;
    }

    // Proceed with checkout
    startCheckout();

    // In a real application, we would send the form data to a server
    alert("Order placed successfully! Thank you for your purchase.");
    window.location.href = "/";
  };

  // Handle phone number change with formatting
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const digitsOnly = inputValue.replace(/\D/g, "").slice(0, 10);
    setPhoneNumber(digitsOnly);

    // Set the formatted value back to the input
    e.target.value = formatPhoneNumber(digitsOnly);
  };

  // Handle credit card number change with formatting
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const digitsOnly = inputValue.replace(/\D/g, "").slice(0, 16);
    setCardNumber(digitsOnly);

    setCardType(getCardType(digitsOnly) || "");

    // Set the formatted value back to the input
    e.target.value = formatCreditCardNumber(digitsOnly);
  };

  // Calculate the discount amount
  const originalTotal = getTotalPrice();
  const discountedTotal = discountApplied
    ? getDiscountedTotal()
    : originalTotal;
  const discountAmount = originalTotal - discountedTotal;

  const router = useRouter();
  const [showExitDialog, setShowExitDialog] = useState<boolean>(false);
  const [navigateTo, setNavigateTo] = useState<string | null>(null);
  const hasInputData = useRef(false);
  const navigationBlocked = useRef(false);

  // Check if user has entered any data
  useEffect(() => {
    hasInputData.current = !!(
      customerName ||
      phoneNumber ||
      email ||
      shippingAddress ||
      cardNumber
    );
  }, [customerName, phoneNumber, email, shippingAddress, cardNumber]);

  const handleRouteChangeStart = (url: string) => {
    // Only show dialog if we have data and not already navigating with permission
    if (hasInputData.current && !navigationBlocked.current) {
      setNavigateTo(url);
      setShowExitDialog(true);
      // Reset to allow future navigation attempts
      navigationBlocked.current = false;
      // Throw an error to prevent navigation and reset the URL
      throw new Error("Navigation prevented");
    }
  };

  // Intercept navigation attempts from Next.js router
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasInputData.current) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    const handlePopState = () => {
      if (hasInputData.current && !navigationBlocked.current) {
        setShowExitDialog(true);
        // Prevent navigation
        history.pushState(null, "", window.location.href);
      }
    };

    window.addEventListener("popstate", handlePopState);
    window.addEventListener("beforeunload", (e) => {
      if (hasInputData.current) {
        e.preventDefault();
        e.returnValue =
          "You have unsaved changes. Are you sure you want to leave?";
      }
    });

    return () => {
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [router]);

  // Set up the beforeunload event listener
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasInputData.current) {
        e.preventDefault();
        e.returnValue =
          "You have unsaved information. Are you sure you want to leave?";
        return e.returnValue;
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  // Handle internal navigation with our custom dialog
  const handleNavigation = (destination: string) => {
    handleRouteChangeStart(destination);
    if (hasInputData.current) {
      setNavigateTo(destination);
      setShowExitDialog(true);
      return false; // Prevent immediate navigation
    } else {
      // Safe to navigate directly if no data
      navigationBlocked.current = true; // Set flag to allow next navigation
      router.push(destination);
      return true;
    }
  };

  // Process navigation after user's decision
  const confirmNavigation = () => {
    setShowExitDialog(false);
    if (navigateTo) {
      navigationBlocked.current = true; // Prevent our handler from intercepting this navigation
      window.location.href = navigateTo; // Use direct location change for reliability
    }
  };

  // Cancel navigation
  const cancelNavigation = () => {
    setShowExitDialog(false);
    setNavigateTo(null);
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="h-[20rem] lg:h-[40rem] 2xl:h-[60rem] flex flex-col justify-center items-center">
          <h1 className="text-4xl font-extrabold text-center mb-8">Checkout</h1>
          <p className="text-xl text-center">Your cart is empty.</p>
          <Button
            className="mt-6"
            onClick={() => handleNavigation("/products")}
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-extrabold text-center mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Customer Information */}
          <div className="lg:col-span-2 space-y-8">
            {/* Customer Information Section */}
            <Card>
              <CardHeader>
                <CardTitle>Customer Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    onBlur={() => handleBlur("name")}
                    className={
                      touchedFields.name && formErrors.name
                        ? "border-red-500"
                        : ""
                    }
                    placeholder="John Doe"
                  />
                  {touchedFields.name && formErrors.name && (
                    <p className="text-sm text-red-500 mt-1">
                      {formErrors.name}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => handleBlur("email")}
                    className={
                      touchedFields.email && formErrors.email
                        ? "border-red-500"
                        : ""
                    }
                    placeholder="john.doe@example.com"
                  />
                  {touchedFields.email && formErrors.email && (
                    <p className="text-sm text-red-500 mt-1">
                      {formErrors.email}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="mt-2">
                    <Input
                      id="phone"
                      value={formatPhoneNumber(phoneNumber)}
                      onChange={handlePhoneChange}
                      onBlur={() => handleBlur("phone")}
                      className={
                        touchedFields.phone && formErrors.phone
                          ? "border-red-500"
                          : ""
                      }
                      placeholder="(123) 456-7890"
                    />
                  </div>
                  {touchedFields.phone && formErrors.phone && (
                    <p className="text-sm text-red-500 mt-1">
                      {formErrors.phone}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Shipping Address Section */}
            <Card>
              <CardHeader>
                <CardTitle>Shipping Address</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="shippingAddress">Street Address</Label>
                  <Input
                    id="shippingAddress"
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                    onBlur={() => handleBlur("shippingAddress")}
                    className={
                      touchedFields.shippingAddress &&
                      formErrors.shippingAddress
                        ? "border-red-500"
                        : ""
                    }
                    placeholder="123 Main St"
                  />
                  {touchedFields.shippingAddress &&
                    formErrors.shippingAddress && (
                      <p className="text-sm text-red-500 mt-1">
                        {formErrors.shippingAddress}
                      </p>
                    )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="shippingCity">City</Label>
                    <Input
                      id="shippingCity"
                      value={shippingCity}
                      onChange={(e) => setShippingCity(e.target.value)}
                      placeholder="Anytown"
                    />
                  </div>

                  <div>
                    <Label htmlFor="shippingState">State</Label>
                    <Input
                      id="shippingState"
                      value={shippingState}
                      onChange={(e) => setShippingState(e.target.value)}
                      placeholder="CA"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="shippingZip">ZIP Code</Label>
                  <Input
                    id="shippingZip"
                    value={shippingZip}
                    onChange={(e) => setShippingZip(e.target.value)}
                    placeholder="12345"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Payment Information Section */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <div className="mt-2">
                    <Input
                      id="cardNumber"
                      value={formatCreditCardNumber(cardNumber)}
                      onChange={handleCardNumberChange}
                      onBlur={() => handleBlur("cardNumber")}
                      className={
                        touchedFields.cardNumber && formErrors.cardNumber
                          ? "border-red-500"
                          : ""
                      }
                      placeholder="1234 5678 9012 3456"
                    />
                  </div>
                  {!formErrors.cardNumber && cardType && (
                    <p className="text-sm text-gray-500 mt-3 mx-2">
                      {cardType}
                    </p>
                  )}
                  {touchedFields.cardNumber && formErrors.cardNumber && (
                    <p className="text-sm text-red-500 mt-1">
                      {formErrors.cardNumber}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="cardExpiry">Expiration Date (MM/YY)</Label>
                    <Input
                      id="cardExpiry"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      onBlur={() => handleBlur("cardExpiry")}
                      className={
                        touchedFields.cardExpiry && formErrors.cardExpiry
                          ? "border-red-500"
                          : ""
                      }
                      placeholder="MM/YY"
                    />
                    {touchedFields.cardExpiry && formErrors.cardExpiry && (
                      <p className="text-sm text-red-500 mt-1">
                        {formErrors.cardExpiry}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="cardCvv">CVV</Label>
                    <Input
                      id="cardCvv"
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      onBlur={() => handleBlur("cardCvv")}
                      className={
                        touchedFields.cardCvv && formErrors.cardCvv
                          ? "border-red-500"
                          : ""
                      }
                      placeholder="123"
                    />
                    {touchedFields.cardCvv && formErrors.cardCvv && (
                      <p className="text-sm text-red-500 mt-1">
                        {formErrors.cardCvv}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2 py-2">
                  <Checkbox
                    id="sameAsShipping"
                    checked={sameAsShipping}
                    onCheckedChange={(checked) =>
                      setSameAsShipping(checked as boolean)
                    }
                  />
                  <Label htmlFor="sameAsShipping">
                    Billing address same as shipping address
                  </Label>
                </div>

                {!sameAsShipping && (
                  <div className="space-y-4 pt-4 border-t">
                    <h3 className="text-md font-medium">Billing Address</h3>

                    <div>
                      <Label htmlFor="billingAddress">Street Address</Label>
                      <Input
                        id="billingAddress"
                        value={billingAddress}
                        onChange={(e) => setBillingAddress(e.target.value)}
                        placeholder="123 Main St"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="billingCity">City</Label>
                        <Input
                          id="billingCity"
                          value={billingCity}
                          onChange={(e) => setBillingCity(e.target.value)}
                          placeholder="Anytown"
                        />
                      </div>

                      <div>
                        <Label htmlFor="billingState">State</Label>
                        <Input
                          id="billingState"
                          value={billingState}
                          onChange={(e) => setBillingState(e.target.value)}
                          placeholder="CA"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="billingZip">ZIP Code</Label>
                      <Input
                        id="billingZip"
                        value={billingZip}
                        onChange={(e) => setBillingZip(e.target.value)}
                        placeholder="12345"
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Order Summary */}
          <div className="space-y-6">
            {/* Order Items Section */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Order Items</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleNavigation("/shopping_cart")}
                >
                  Edit Cart
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="max-h-60 overflow-y-auto space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-start space-x-4 pb-4 border-b"
                    >
                      <Skeleton className="h-12 w-12 rounded-md shrink-0" />
                      <div className="flex-1">
                        <h3 className="font-medium text-sm">{item.name}</h3>
                        <div className="flex justify-between mt-1 text-sm text-gray-500">
                          <span>Qty: {item.quantity}</span>
                          <span>
                            ${(Number(item.price) * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Discount Code Section */}
            <Card>
              <CardHeader>
                <CardTitle>Discount Code</CardTitle>
              </CardHeader>
              <CardContent>
                <form
                  className="flex space-x-2"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleApplyDiscount();
                  }}
                >
                  <Input
                    placeholder="Enter discount code"
                    value={discountCode}
                    onChange={(e) => {
                      setDiscountCode(e.target.value);
                    }}
                    className={discountError ? "border-red-500" : ""}
                  />
                  <Button type="submit" variant="outline">
                    Apply
                  </Button>
                </form>

                {discountApplied && (
                  <div className="flex items-center text-green-600 mt-2">
                    <Check size={16} className="mr-1" />
                    <span>Discount applied!</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Order Summary Section */}
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>

                  {discountApplied && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>{capitalize(shippingMethod)} Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>

                  <Separator />

                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>${discountedTotal.toFixed(2)}</span>
                  </div>

                  <Button
                    className="w-full py-3 mt-6"
                    onClick={handleCheckout}
                    disabled={!isFormValid}
                  >
                    Place Order
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Bottom buttons */}
            <div className="flex justify-between mt-4">
              <Button
                variant="outline"
                onClick={() => handleNavigation("/products")}
              >
                Continue Shopping
              </Button>

              <Button
                className="w-auto py-3"
                onClick={handleCheckout}
                disabled={!isFormValid}
              >
                Place Order
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Use a more imperative approach with the dialog */}
      <AlertDialog
        open={showExitDialog}
        onOpenChange={(open) => {
          // Only allow dialog to close via our explicit handlers
          if (!open) {
            // Prevent automatic closing
            setShowExitDialog(true);
          }
        }}
      >
        <AlertDialogContent onEscapeKeyDown={(e) => e.preventDefault()}>
          <AlertDialogHeader>
            <AlertDialogTitle>Leave this page?</AlertDialogTitle>
            <AlertDialogDescription>
              You have unsaved information on this page. Would you like to save
              your progress before leaving?
              <p className="mt-2 text-yellow-600 font-medium">
                Note: This is a demo application. No personal information will
                actually be saved or stored.
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelNavigation}>
              Stay on this page
            </AlertDialogCancel>
            <AlertDialogAction onClick={confirmNavigation}>
              Leave anyway
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default CheckoutPage;
