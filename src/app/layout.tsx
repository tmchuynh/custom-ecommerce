import "./globals.css";
import { NotFoundProvider } from "./context/NotFoundContext";
import { Providers } from "./providers";
import NavigationMenuDemo from "@/components/NavMenu";

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
            <NavigationMenuDemo />
            {children}
          </Providers>
        </NotFoundProvider>
      </body>
    </html>
  );
}
