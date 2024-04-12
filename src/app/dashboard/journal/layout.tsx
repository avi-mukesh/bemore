import { Heading } from "@/components/ui/heading";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Heading title="Journal" description="Gratitude journal once a day." />
      {children}
    </>
  );
}
