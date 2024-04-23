import { Heading } from "@/components/ui/heading";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account",
};

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Heading
        title="Account"
        description="Manage your account settings here."
      />
      {children}
    </>
  );
}
