"use client";

import { PaymentContextType } from "@/lib/contextTypes";
import { CreditCard, Payment, PaymentStatus } from "@/lib/interfaces";
import {
  validateCreditCard,
  validateCVV,
  validateExpiryDate,
} from "@/lib/utils";
import React, { createContext, useContext, useState } from "react";

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

interface PaymentSubmissionData {
  cardDetails: CreditCard;
  amount: number;
  billingAddress?: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  customerInfo?: {
    name: string;
    email: string;
    phone: string;
  };
}

export const PaymentProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [processingPayment, setProcessingPayment] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [lastPayment, setLastPayment] = useState<Payment | null>(null);

  const validateCardDetails = (card: CreditCard): boolean => {
    if (!validateCreditCard(card.number)) {
      setPaymentError("Invalid card number");
      return false;
    }
    if (!validateExpiryDate(card.expirationDate)) {
      setPaymentError("Invalid expiration date");
      return false;
    }
    if (!validateCVV(card.cvv)) {
      setPaymentError("Invalid CVV");
      return false;
    }
    return true;
  };

  const validatePaymentSubmission = (data: PaymentSubmissionData): boolean => {
    // Reset previous errors
    setPaymentError(null);

    // Validate card details
    if (!validateCardDetails(data.cardDetails)) {
      return false;
    }

    // Validate amount
    if (data.amount <= 0) {
      setPaymentError("Invalid payment amount");
      return false;
    }

    // Validate billing address if provided
    if (data.billingAddress) {
      const { address, city, state, zipCode } = data.billingAddress;
      if (!address || !city || !state || !zipCode) {
        setPaymentError("Complete billing address is required");
        return false;
      }
    }

    // Validate customer info if provided
    if (data.customerInfo) {
      const { name, email, phone } = data.customerInfo;
      if (!name || !email || !phone) {
        setPaymentError("Complete customer information is required");
        return false;
      }
    }

    return true;
  };

  const processPayment = async (
    amount: number,
    cardDetails: CreditCard
  ): Promise<Payment> => {
    setProcessingPayment(true);
    setPaymentError(null);

    try {
      // Validate card details
      if (!validateCardDetails(cardDetails)) {
        throw new Error("Invalid card details");
      }

      // Simulate API call to payment processor
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Simulate success/failure based on amount
      if (amount <= 0) {
        throw new Error("Invalid payment amount");
      }

      const payment: Payment = {
        id: `PAY-${Math.random().toString(36).substr(2, 9)}`,
        amount,
        status: "success",
        email: "",
        date: new Date(),
      };

      setLastPayment(payment);
      return payment;
    } catch (error) {
      setPaymentError(
        error instanceof Error ? error.message : "Payment failed"
      );
      throw error;
    } finally {
      setProcessingPayment(false);
    }
  };

  const handlePaymentSubmission = async (
    data: PaymentSubmissionData
  ): Promise<Payment | null> => {
    setProcessingPayment(true);
    setPaymentError(null);

    try {
      // Step 1: Validate all payment data
      if (!validatePaymentSubmission(data)) {
        throw new Error(paymentError || "Payment validation failed");
      }

      // Step 2: Process the payment
      const payment = await processPayment(data.amount, data.cardDetails);

      // Step 3: Verify the payment was successful
      const isVerified = await verifyPayment(payment.id);
      if (!isVerified) {
        throw new Error("Payment verification failed");
      }

      // Step 4: Record successful payment
      setLastPayment(payment);
      return payment;
    } catch (error) {
      setPaymentError(
        error instanceof Error ? error.message : "Payment submission failed"
      );
      return null;
    } finally {
      setProcessingPayment(false);
    }
  };

  const processRefund = async (): Promise<Payment> => {
    setProcessingPayment(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const refund: Payment = {
        id: `REF-${Math.random().toString(36).substr(2, 9)}`,
        amount: lastPayment?.amount || 0,
        status: "refunded",
        email: lastPayment?.email || "",
        date: new Date(),
      };
      setLastPayment(refund);
      return refund;
    } catch (error) {
      setPaymentError("Refund failed");
      throw error;
    } finally {
      setProcessingPayment(false);
    }
  };

  const verifyPayment = async (paymentId: string): Promise<boolean> => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return lastPayment?.id === paymentId && lastPayment?.status === "success";
    } catch {
      return false;
    }
  };

  const getPaymentStatus = (paymentId: string): PaymentStatus => {
    return lastPayment?.id === paymentId
      ? lastPayment.status
      : ("unknown" as PaymentStatus);
  };

  const clearPaymentError = () => {
    setPaymentError(null);
  };

  return (
    <PaymentContext.Provider
      value={{
        processPayment,
        processingPayment,
        paymentError,
        clearPaymentError,
        getPaymentStatus,
        lastPayment,
        validateCardDetails,
        processRefund,
        verifyPayment,
        handlePaymentSubmission,
        validatePaymentSubmission,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
};

export const usePayment = (): PaymentContextType => {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error("usePayment must be used within a PaymentProvider");
  }
  return context;
};
