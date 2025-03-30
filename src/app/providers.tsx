"use client";

import React from "react";
import { CurrencyProvider } from "./context/currencyContext";
import { WishlistProvider } from "./context/wishlistContext";
import { CartProvider } from "./context/cartContext";
import { ProductProvider } from "./context/productContext";
import { PaymentProvider } from "./context/paymentContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CurrencyProvider>
      <ProductProvider>
        <WishlistProvider>
          <PaymentProvider>
            <CartProvider>{children}</CartProvider>
          </PaymentProvider>
        </WishlistProvider>
      </ProductProvider>
    </CurrencyProvider>
  );
}
