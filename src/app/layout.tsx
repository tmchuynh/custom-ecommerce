import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NotFoundProvider } from "./context/NotFoundContext";
import { Providers } from "./providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <NotFoundProvider>
          <Providers>{children}</Providers>
        </NotFoundProvider>
      </body>
    </html>
  );
}
