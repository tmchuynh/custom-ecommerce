import BackToTop from "@/components/BackToTop";
import BreadcrumbWrapper from "@/components/BreadcrumbWrapper";
import Footer from "@/components/Footer";
import NavMenu from "@/components/NavMenu";
import NavTopMenu from "@/components/NavTopMenu";
import { Toaster } from "sonner";
import { NotFoundProvider } from "./context/NotFoundContext";
import "./globals.css";
import { Providers } from "./providers";
import { ThemeProvider } from "next-themes";

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
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
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
            </ThemeProvider>
          </NotFoundProvider>
        </Providers>
      </body>
    </html>
  );
}
