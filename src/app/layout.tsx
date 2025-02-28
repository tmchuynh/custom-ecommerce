import "./globals.css";
import { NotFoundProvider } from "./context/NotFoundContext";
import { Providers } from "./providers";
import NavMenu from "@/components/NavMenu";
import BackToTop from "@/components/BackToTop";

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
            {children}
            <BackToTop />
          </Providers>
        </NotFoundProvider>
      </body>
    </html>
  );
}
