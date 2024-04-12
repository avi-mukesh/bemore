import { Heading } from "@/components/ui/heading";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex">
        <Heading
          title="Meditation"
          description="Medidate for 5 minutes everyday."
        />
      </div>
      {children}
    </>
  );
}
