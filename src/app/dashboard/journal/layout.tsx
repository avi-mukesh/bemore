import { Heading } from "@/components/ui/heading";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Journal",
};

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Heading title="Journal" description="Gratitude journal once a day." />
      {children}
    </>
  );
}
