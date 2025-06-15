import Header from "@/components/navigation/Header";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import DynamicBreadcrumb from "@/components/navigation/breadcrumb-dynamic";
import { Providers } from "./providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="relative flex flex-col min-h-screen">
        <Providers>
          <main className="flex-grow mt-24 md:pb-0">
            <Header />
            <DynamicBreadcrumb />
            {children}
          </main>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
