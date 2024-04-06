import React from "react";
import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";

export default function page() {
  return (
    <div>
      Dashboard
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <Button>Log out</Button>
      </form>
    </div>
  );
}
