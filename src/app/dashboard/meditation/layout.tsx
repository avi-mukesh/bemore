import { Heading } from "@/components/ui/heading";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meditation",
};

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex">
        <Heading
          title="Meditation"
          description="Meditate for 5 minutes everyday."
        />
      </div>
      {children}
    </>
  );
}
