import { Heading } from "@/components/ui/heading";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reading",
};

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Heading title="Reading" description="Read a few pages of a book day." />
      {children}
    </>
  );
}
