import "./globals.css";
import { NotFoundProvider } from "./context/NotFoundContext";
import { Providers } from "./providers";
import NavMenu from "@/components/NavMenu";
import BackToTop from "@/components/BackToTop";
import Footer from "@/components/Footer";
import { CurrencyProvider } from "./context/CurrencyContext";
import { CartProvider } from "./context/cartContext";
import { WishlistProvider } from "./context/wishlistContext";
import { Toaster } from "sonner";
import BreadcrumbWrapper from "@/components/BreadcrumbWrapper";
import { ProductProvider } from "./context/productContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <Providers>
          <NotFoundProvider>
            <ProductProvider>
              <CartProvider>
                <CurrencyProvider>
                  <WishlistProvider>
                    <NavMenu />
                    <main className="flex-grow">
                      <BreadcrumbWrapper />
                      {children}
                      <Footer />
                    </main>
                  </WishlistProvider>
                </CurrencyProvider>
              </CartProvider>
            </ProductProvider>
            <BackToTop />
            <Toaster
              position="top-center"
              toastOptions={{
                style: {
                  marginTop: "200px",
                },
              }}
            />
          </NotFoundProvider>
        </Providers>
      </body>
    </html>
  );
}
