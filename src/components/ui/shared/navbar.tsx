import React, { useState } from "react";

import Link from "next/link";
import Navlinks from "./navlinks";
import { signOut } from "@/auth";
import SubmitButton from "../auth/submit-button";
import { Icons } from "@/components/icons";

export default function Navbar() {
  return (
    <div className="sticky flex h-full flex-col px-3 py-4 md:px-2">
      {/* <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md p-4 md:h-400"
        href="/"
      >
        <div className="w-32 text-white md:w-40"></div>
      </Link> */}
      <div className="flex-grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <Navlinks />
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <SubmitButton variant="destructive" text="Log out" />
        </form>
      </div>
    </div>
  );
}
