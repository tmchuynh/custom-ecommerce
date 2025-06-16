"use client";

import OrderNotificationProvider from "@/app/providers/OrderNotificationProvider";
import { ThemeProvider } from "next-themes";
import { JSX, ReactNode } from "react";
import { AuthProvider } from "./context/authContext";
import { CartProvider } from "./context/cartContext";
import { CurrencyProvider } from "./context/currencyContext";
import { NotFoundProvider } from "./context/NotFoundContext";
import { OrderProvider } from "./context/orderContext";
import { WishlistProvider } from "./context/wishlistContext";

/**
 * Providers component that wraps its children with a ThemeProvider.
 *
 * @param {Object} props - The props object.
 * @param {ReactNode} props.children - The child components to be wrapped by the ThemeProvider.
 *
 * @returns {JSX.Element} The ThemeProvider component wrapping the children.
 */
export function Providers({ children }: { children: ReactNode }): JSX.Element {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={true}>
      <AuthProvider>
        <CurrencyProvider>
          <OrderProvider>
            <CartProvider>
              <WishlistProvider>
                <NotFoundProvider>
                  <OrderNotificationProvider />
                  {children}
                </NotFoundProvider>
              </WishlistProvider>
            </CartProvider>
          </OrderProvider>
        </CurrencyProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
