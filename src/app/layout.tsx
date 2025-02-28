import "./globals.css";
import { NotFoundProvider } from "./context/NotFoundContext";
import { Providers } from "./providers";
import NavMenu from "@/components/NavMenu";
import BackToTop from "@/components/BackToTop";
import DynamicBreadcrumb from "@/components/ui/breadcrumb-dynamic";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <NotFoundProvider>
          <Providers>
            <NavMenu />
            <MainContent />
            {children}
            <BackToTop />
          </Providers>
        </NotFoundProvider>
      </body>
    </html>
  );
}

const MainContent = () => {
  return (
    <main className="w-full md:w-11/12 mx-auto">
      <DynamicBreadcrumb />
    </main>
  );
};
