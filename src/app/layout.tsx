import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/ui/shared/navbar";
import clsx from "clsx";
import { auth } from "@/auth";
import { Toaster } from "@/components/ui/sonner";
import Header from "@/components/ui/shared/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Be More",
    default: "Be More",
  },
  description:
    "Website to help you track your progress in becoming a better version of yourself.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={clsx("relative", inter.className)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex h-screen flex-col md:flex-row md:overflow-hidden pt-7">
            <div className="w-full flex-none md:w-64">
              <Navbar />
            </div>
            <div className="flex-grow p-6 md:overflow-auto md:p-12">
              <Header />
              {children}
            </div>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
