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
            <MainContent>{children}</MainContent>
            <BackToTop />
          </Providers>
        </NotFoundProvider>
      </body>
    </html>
  );
}

const MainContent = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="w-full md:w-11/12 mx-auto">
      <DynamicBreadcrumb />
      {children}
    </section>
  );
};
