"use client";

import { CustomerContextType } from "@/lib/interfaces";
import { createContext, useContext } from "react";

const CustomerContext = createContext<CustomerContextType | undefined>(
  undefined
);

export function CustomerProvider({ children }: { children: React.ReactNode }) {
  const validatePhone = (phone: string) => {
    const cleaned = phone.replace(/\D/g, "");
    return /^\d{10}$/.test(cleaned);
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateName = (name: string) => {
    return name.trim().length >= 2 && /^[a-zA-Z\s-']+$/.test(name);
  };

  const formatPhoneNumber = (phone: string) => {
    const cleaned = phone.replace(/\D/g, "");
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return "(" + match[1] + ") " + match[2] + "-" + match[3];
    }
    return phone;
  };

  return (
    <CustomerContext.Provider
      value={{
        validatePhone,
        validateEmail,
        validateName,
        formatPhoneNumber,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
}

export const useCustomer = () => {
  const context = useContext(CustomerContext);
  if (context === undefined) {
    throw new Error("useCustomer must be used within a CustomerProvider");
  }
  return context;
};
