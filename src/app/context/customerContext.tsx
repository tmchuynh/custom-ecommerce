"use client";

import { createContext, useContext } from "react";
import { useAuth } from "./authContext";
import { CustomerContextType } from "@/lib/contextTypes";
import { ShippingAddress } from "@/lib/interfaces";

const CustomerContext = createContext<CustomerContextType | undefined>(
  undefined
);

export function CustomerProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

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

  const validateAddress = (address: Partial<ShippingAddress>): boolean => {
    const requiredFields: (keyof ShippingAddress)[] = [
      "addressLine1",
      "city",
      "state",
      "postalCode",
      "country",
    ];

    return requiredFields.every(
      (field) =>
        address[field] &&
        typeof address[field] === "string" &&
        address[field]?.toString().trim().length > 0
    );
  };

  const validatePostalCode = (
    postalCode: string,
    country: string = "US"
  ): boolean => {
    const postalCodePatterns: Record<string, RegExp> = {
      US: /^\d{5}(-\d{4})?$/,
      CA: /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/,
    };

    return postalCodePatterns[country]?.test(postalCode) ?? false;
  };

  const formatAddress = (address: ShippingAddress): string => {
    const parts = [
      address.addressLine1,
      address.addressLine2,
      address.city,
      address.state,
      address.postalCode,
      address.country,
    ].filter(Boolean);

    return parts.join(", ");
  };

  const getDefaultShippingAddress = (): ShippingAddress | undefined => {
    if (!user?.addresses) return undefined;
    return user.addresses.find(
      (addr) => addr.id === user.defaultShippingAddress
    );
  };

  const getCustomerAddresses = (): ShippingAddress[] => {
    return user?.addresses || [];
  };

  const getCustomerData = () => {
    if (!user) return null;

    return {
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email,
      phone: user.phone || "",
      addresses: user.addresses || [],
    };
  };

  return (
    <CustomerContext.Provider
      value={{
        validatePhone,
        validateEmail,
        validateName,
        formatPhoneNumber,
        validateAddress,
        validatePostalCode,
        formatAddress,
        getDefaultShippingAddress,
        getCustomerAddresses,
        getCustomerData,
        isAuthenticated: !!user,
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
