import BackToTop from "@/components/BackToTop";
import BreadcrumbWrapper from "@/components/BreadcrumbWrapper";
import Footer from "@/components/Footer";
import NavMenu from "@/components/NavMenu";
import NavTopMenu from "@/components/NavTopMenu";
import { Toaster } from "sonner";
import { NotFoundProvider } from "./context/NotFoundContext";
import "./globals.css";
import { Providers } from "./providers";

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
            <NavTopMenu />
            <NavMenu />
            <main className="flex-grow">
              <BreadcrumbWrapper />
              {children}
              <Footer />
            </main>
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
