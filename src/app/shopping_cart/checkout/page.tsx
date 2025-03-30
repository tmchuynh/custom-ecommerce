"use client";

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
import { Button } from "@/components/ui/button";
import {
  validateCreditCard,
  validateEmail,
  validatePhone,
  handleApplyDiscountUtil,
} from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useCart } from "../../context/cartContext";
import { usePayment } from "@/app/context/paymentContext";
import { useProduct } from "@/app/context/productContext";
import { useCurrency } from "@/app/context/currencyContext";

// Import our newly created components
import CustomerInfoForm from "@/components/checkout/customer-info-form";
import DiscountForm from "@/components/checkout/discount-form";
import OrderItems from "@/components/checkout/order-items";
import OrderSummary from "@/components/checkout/order-summary";
import PaymentInfoForm from "@/components/checkout/payment-info-form";
import ShippingAddressForm from "@/components/checkout/shipping-address-form";

/**
 * A comprehensive checkout page component for an e-commerce application.
 *
 * This component handles the entire checkout process including:
 * - Customer information collection
 * - Shipping address management
 * - Payment processing
 * - Order summary display
 * - Discount code application
 * - Navigation protection for unsaved data
 *
 * @component
 * @example
 * ```tsx
 * <CheckoutPage />
 * ```
 *
 * @remarks
 * The component uses several custom hooks:
 * - useCart - For cart management and pricing calculations
 * - usePayment - For payment processing and validation
 * - useProduct - For inventory management
 * - useCurrency - For international tax calculations
 *
 * @features
 * - Form validation for all input fields
 * - Real-time discount code application
 * - Automatic billing address population
 * - International shipping support
 * - Estimated delivery date calculation
 * - Navigation protection for unsaved form data
 * - Empty cart state handling
 *
 * @state
 * Manages state for:
 * - Customer information
 * - Shipping details
 * - Payment information
 * - Form validation
 * - Navigation protection
 * - Discount application
 *
 * @returns A complex checkout interface with forms for customer information,
 * shipping address, payment details, and an order summary section
 */
const CheckoutPage = () => {
  const {
    cartItems,
    getSubTotal,
    calculateTaxAmount,
    calculateShippingCost,
    getTotalPrice,
    applyDiscount,
    getDiscountedTotal,
    getEstimatedDeliveryDate,
    selectedShippingMethod,
  } = useCart();

  const {
    processPayment,
    paymentError,
    validateCardDetails,
    handlePaymentSubmission,
  } = usePayment();

  const { updateStockLevel } = useProduct();

  const { getImportTaxBreakdown } = useCurrency();

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
  const [shippingCountry, setShippingCountry] = useState<string>("USA");

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

  // Calculate values for order summary
  const subtotal = getSubTotal();
  const tax = calculateTaxAmount(subtotal, shippingCountry);
  const internationalTax = getImportTaxBreakdown(subtotal, shippingCountry);

  console.log("internationalTax", internationalTax);
  // Use the selected shipping method instead of the auto-determined one

  // Add this ref to track previous shipping method
  const prevShippingMethod = useRef(selectedShippingMethod);

  const [estimatedDeliveryDate, setEstimatedDeliveryDate] =
    useState<Date | null>(null);

  useEffect(() => {
    // Only calculate the date if we don't already have one or if shipping method changes
    if (
      !estimatedDeliveryDate ||
      prevShippingMethod.current !== selectedShippingMethod
    ) {
      const deliveryDate = getEstimatedDeliveryDate(selectedShippingMethod);
      setEstimatedDeliveryDate(deliveryDate);

      // Track the shipping method to prevent unnecessary updates
      prevShippingMethod.current = selectedShippingMethod;
    }
  }, [selectedShippingMethod, getEstimatedDeliveryDate, estimatedDeliveryDate]);

  // Validation states
  const [formErrors, setFormErrors] = useState<{
    name?: string;
    phone?: string;
    email?: string;
    cardNumber?: string;
    cardExpiry?: string;
    cardCvv?: string;
    shippingAddress?: string;
    shippingCity?: string;
    shippingState?: string;
    shippingZip?: string;
    shippingCountry?: string;
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
    shippingCity: boolean;
    shippingState: boolean;
    shippingZip: boolean;
    shippingCountry: boolean;
  }>({
    name: false,
    phone: false,
    email: false,
    cardNumber: false,
    cardExpiry: false,
    cardCvv: false,
    shippingAddress: false,
    shippingCity: false,
    shippingState: false,
    shippingZip: false,
    shippingCountry: false,
  });

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

  /**
   * Validates the checkout form fields and updates form validation state.
   *
   * Checks the following fields for validity:
   * - Customer name (non-empty)
   * - Phone number (using validatePhone helper)
   * - Email (using validateEmail helper)
   * - Credit card number (using validateCreditCard helper)
   * - Card expiry date (MM/YY format)
   * - CVV (3-4 digits)
   * - Shipping address fields (all required):
   *   - Street address
   *   - City
   *   - State
   *   - ZIP code
   *   - Country
   *
   * @returns {void} Updates formErrors state with validation errors
   * and isFormValid state indicating if form is valid
   */
  const validateForm = () => {
    const errors: {
      name?: string;
      phone?: string;
      email?: string;
      cardNumber?: string;
      cardExpiry?: string;
      cardCvv?: string;
      shippingAddress?: string;
      shippingCity?: string;
      shippingState?: string;
      shippingZip?: string;
      shippingCountry?: string;
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

    if (!shippingCity.trim()) {
      errors.shippingCity = "Shipping city is required";
    }
    if (!shippingState.trim()) {
      errors.shippingState = "Shipping state is required";
    }
    if (!shippingZip.trim()) {
      errors.shippingZip = "Shipping ZIP code is required";
    }
    if (!shippingCountry.trim()) {
      errors.shippingCountry = "Shipping country is required";
    }

    setFormErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

  /**
   * Handles the application of a discount code to the shopping cart.
   *
   * This function validates the discount code input and applies it if valid:
   * - Checks if discount code is not empty/whitespace
   * - Validates the discount code through applyDiscount helper
   * - Updates UI states for discount application status
   * - Resets the discount code input field
   *
   * @returns {void}
   * @throws {void}
   *
   * @example
   * handleApplyDiscount(); // Processes current discountCode state
   */
  const handleApplyDiscount = (): void => {
    const { discountApplied, discountError } = handleApplyDiscountUtil(
      discountCode,
      applyDiscount
    );

    setDiscountApplied(discountApplied);
    setDiscountError(discountError);

    if (discountApplied) {
      setDiscountCode("");
    }
  };

  /**
   * Handles the checkout process when the user submits the checkout form.
   *
   * This function performs the following steps:
   * 1. Marks all form fields as touched to trigger validation
   * 2. Validates the form
   * 3. If form is invalid, displays error toast
   * 4. If form is valid:
   *    - Processes payment using card details
   *    - Updates stock levels for purchased items
   *    - Navigates to thank you page on success
   *    - Navigates to error page if payment fails
   *
   * @async
   * @throws {Error} When payment processing fails
   * @returns {Promise<void>}
   */
  const handleCheckout = async (): Promise<void> => {
    // Mark all fields as touched to show all validation errors
    setTouchedFields({
      name: true,
      phone: true,
      email: true,
      cardNumber: true,
      cardExpiry: true,
      cardCvv: true,
      shippingAddress: true,
      shippingCity: true,
      shippingState: true,
      shippingZip: true,
      shippingCountry: true,
    });

    validateForm();

    if (!isFormValid) {
      toast.error(
        "Please fix the errors in the form before placing your order"
      );
      return;
    }

    // Instead of showing an alert, navigate to the thank you page
    try {
      // Process payment
      const paymentResult = await processPayment(discountedTotal, {
        number: cardNumber,
        expirationDate: cardExpiry,
        cvv: cardCvv,
        issuer: cardType,
      });

      if (paymentResult) {
        // Update stock levels
        cartItems.forEach((item) => {
          updateStockLevel(item.name, item.quantity);
        });

        navigationBlocked.current = true;
        router.push("/shopping_cart/checkout/thank_you");
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Checkout failed");
      router.push("/shopping_cart/checkout/error");
    }
  };

  // Calculate the discount amount
  const originalTotal = getTotalPrice(shippingCountry);
  const discountedTotal = discountApplied
    ? getDiscountedTotal(shippingCountry)
    : originalTotal;
  const discountAmount = originalTotal - discountedTotal;

  // Navigation state and functions
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
    if (hasInputData.current && !navigationBlocked.current) {
      setNavigateTo(url);
      setShowExitDialog(true);
      navigationBlocked.current = false;
      throw new Error("Navigation prevented");
    }
  };

  // Intercept navigation attempts
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
        history.pushState(null, "", window.location.href);
      }
    };

    window.addEventListener("popstate", handlePopState);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const handleNavigation = (destination: string) => {
    handleRouteChangeStart(destination);
    if (hasInputData.current) {
      setNavigateTo(destination);
      setShowExitDialog(true);
      return false;
    } else {
      navigationBlocked.current = true;
      router.push(destination);
      return true;
    }
  };

  const confirmNavigation = () => {
    setShowExitDialog(false);
    if (navigateTo) {
      navigationBlocked.current = true;
      window.location.href = navigateTo;
    }
  };

  const cancelNavigation = () => {
    setShowExitDialog(false);
    setNavigateTo(null);
  };

  // Empty cart state
  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="h-[20rem] lg:h-[40rem] 2xl:h-[60rem] flex flex-col justify-center items-center">
          <h1 className="text-4xl font-extrabold text-center mb-8">Checkout</h1>
          <p className="text-xl text-center">Your cart is empty.</p>
          <Button className="mt-6" onClick={() => handleNavigation("/")}>
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
        {/* Order Items - now using the OrderItems component */}
        <OrderItems cartItems={cartItems} handleNavigation={handleNavigation} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Forms */}
          <div className="lg:col-span-2 space-y-8">
            {/* Customer Information Section */}
            <CustomerInfoForm
              customerName={customerName}
              setCustomerName={setCustomerName}
              email={email}
              setEmail={setEmail}
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
              touchedFields={touchedFields}
              formErrors={formErrors}
              handleBlur={(field: string) =>
                handleBlur(field as keyof typeof touchedFields)
              }
              onSubmit={(data) => {
                handlePaymentSubmission({
                  ...data,
                  cardDetails: {
                    number: cardNumber,
                    expirationDate: cardExpiry,
                    cvv: cardCvv,
                    issuer: cardType,
                  },
                  amount: discountedTotal,
                });
              }}
            />
            {/* Shipping Address Section */}
            <ShippingAddressForm
              shippingAddress={shippingAddress}
              setShippingAddress={setShippingAddress}
              shippingCity={shippingCity}
              setShippingCity={setShippingCity}
              shippingState={shippingState}
              setShippingState={setShippingState}
              shippingZip={shippingZip}
              setShippingZip={setShippingZip}
              shippingCountry={shippingCountry}
              setShippingCountry={setShippingCountry}
              touchedFields={touchedFields}
              formErrors={formErrors}
              handleBlur={handleBlur}
              onSubmit={(data) => {
                handlePaymentSubmission({
                  ...data,
                  cardDetails: {
                    number: cardNumber,
                    expirationDate: cardExpiry,
                    cvv: cardCvv,
                    issuer: cardType,
                  },
                  amount: discountedTotal,
                });
              }}
            />
            {/* Payment Information Section */}
            <PaymentInfoForm
              cardNumber={cardNumber}
              setCardNumber={setCardNumber}
              cardType={cardType}
              setCardType={setCardType}
              cardExpiry={cardExpiry}
              setCardExpiry={setCardExpiry}
              cardCvv={cardCvv}
              setCardCvv={setCardCvv}
              billingAddress={billingAddress}
              setBillingAddress={setBillingAddress}
              billingCity={billingCity}
              setBillingCity={setBillingCity}
              billingState={billingState}
              setBillingState={setBillingState}
              billingZip={billingZip}
              setBillingZip={setBillingZip}
              sameAsShipping={sameAsShipping}
              setSameAsShipping={setSameAsShipping}
              touchedFields={touchedFields}
              formErrors={formErrors}
              handleBlur={handleBlur}
              onSubmit={handleCheckout}
              isSubmitting={false}
              setIsSubmitting={() => {}}
              handlePayment={() => {}}
              validateCard={validateCardDetails}
              paymentError={paymentError || null}
              isCardValid={true}
              setIsCardValid={() => {}}
              resetForm={() => {}}
              total={discountedTotal}
              handlePaymentSuccess={() => toast.success("Payment successful")}
              handlePaymentPending={() => toast.info("Payment is processing")}
              handlePaymentProcessing={() =>
                toast.info("Processing payment...")
              }
              handlePaymentCancelled={() => toast.warning("Payment cancelled")}
              handlePaymentDeclined={() => toast.error("Payment declined")}
              handlePaymentRefunded={() =>
                toast.info("Payment will be refuneded")
              }
            />
          </div>
          {/* Right Column - Order Summary */}
          <div className="space-y-6">
            {/* Discount Code Section */}
            <DiscountForm
              discountCode={discountCode}
              setDiscountCode={setDiscountCode}
              discountApplied={discountApplied}
              discountError={discountError}
              setDiscountError={setDiscountError}
              handleApplyDiscount={handleApplyDiscount}
            />

            {/* Order Summary Section */}
            <OrderSummary
              subtotal={subtotal}
              tax={tax}
              shipping={calculateShippingCost(selectedShippingMethod)}
              vatTax={internationalTax.vat}
              importFees={internationalTax.duty}
              newDate={estimatedDeliveryDate || new Date()}
              discountApplied={discountApplied}
              discountAmount={discountAmount}
              isInternational={
                shippingCountry.toLowerCase() !== "usa" &&
                shippingCountry.toLowerCase() !== "united states" &&
                shippingCountry.toLowerCase() !== "us"
              }
              shippingCountry={shippingCountry}
              total={discountApplied ? discountedTotal : originalTotal}
              shippingMethod={selectedShippingMethod}
              itemCount={cartItems.length}
            />

            {/* Navigation Buttons */}
            <div className="flex flex-col gap-3 justify-between mt-4">
              <Button variant="outline" onClick={() => handleNavigation("/")}>
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

      {/* Navigation Alert Dialog */}
      <AlertDialog
        open={showExitDialog}
        onOpenChange={(open) => {
          if (!open) {
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
