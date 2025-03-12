import "./globals.css";
import { NotFoundProvider } from "./context/NotFoundContext";
import { Providers } from "./providers";
import NavMenu from "@/components/NavMenu";
import BackToTop from "@/components/BackToTop";
import DynamicBreadcrumb from "@/components/ui/breadcrumb-dynamic";
import Footer from "@/components/Footer";
import { CurrencyProvider } from "./context/CurrencyContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <NotFoundProvider>
          <Providers>
            <CurrencyProvider>
              <NavMenu />
              <MainContent>{children}</MainContent>
            </CurrencyProvider>
            <BackToTop />
          </Providers>
        </NotFoundProvider>
      </body>
    </html>
  );
}

const MainContent = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex-grow">
      <DynamicBreadcrumb />
      {children}
      <Footer />
    </main>
  );
};
