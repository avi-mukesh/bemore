import { auth } from "@/auth";
import Navbar from "@/components/ui/shared/navbar";
import React from "react";

export default async function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <Navbar />
      </div>
      <div className="flex-grow p-6 md:overflow-auto md:p-8">{children}</div>
    </div>
  );
}
