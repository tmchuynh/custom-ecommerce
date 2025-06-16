import DynamicBreadcrumb from "@/components/navigation/breadcrumb-dynamic";
import Header from "@/components/navigation/Header";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
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
          <main className="flex-grow mx-auto mt-24 md:pb-0 w-10/12 md:w-11/12 xl:w-full">
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
