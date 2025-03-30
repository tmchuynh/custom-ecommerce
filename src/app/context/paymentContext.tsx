"use client";

import {
  PaymentContextType,
  CreditCard,
  Payment,
  PaymentStatus,
} from "@/lib/interfaces";
import {
  validateCreditCard,
  validateExpiryDate,
  validateCVV,
} from "@/lib/utils";
import React, { createContext, useContext, useState } from "react";

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

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

  const processPayment = async (
    amount: number,
    cardDetails: CreditCard,
    currency: string = "USD"
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
