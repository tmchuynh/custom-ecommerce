"use client";

import React from "react";
import { AuthProvider } from "./context/authContext";
import { CartProvider } from "./context/cartContext";
import { CurrencyProvider } from "./context/currencyContext";
import { CustomerProvider } from "./context/customerContext";
import { PaymentProvider } from "./context/paymentContext";
import { ProductProvider } from "./context/productContext";
import { WishlistProvider } from "./context/wishlistContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <CustomerProvider>
        <CurrencyProvider>
          <ProductProvider>
            <WishlistProvider>
              <PaymentProvider>
                <CartProvider>{children}</CartProvider>
              </PaymentProvider>
            </WishlistProvider>
          </ProductProvider>
        </CurrencyProvider>
      </CustomerProvider>
    </AuthProvider>
  );
}
