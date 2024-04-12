import { Heading } from "@/components/ui/heading";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Heading title="Reading" description="Read a few pages of a book day." />
      {children}
    </>
  );
}
