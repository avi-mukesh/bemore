import React from "react";

import Navlinks from "./navlinks";
import { auth, signOut } from "@/auth";
import SubmitButton from "@/components/ui/shared/submit-button";
import Link from "next/link";
import { ModeToggle } from "@/components/ModeToggle";

export default async function Navbar() {
  const session = await auth();
  const isLoggedIn = !!session?.user?.id;

  return (
    <div className="sticky flex h-full flex-col px-3 pt-12 md:px-2 md:border-r">
      <div className="md:flex flex-grow flex-row md:justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <Navlinks isLoggedIn={isLoggedIn} />
        {isLoggedIn && (
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <SubmitButton variant="destructive" text="Log out" />
          </form>
        )}
      </div>
    </div>
  );
}
