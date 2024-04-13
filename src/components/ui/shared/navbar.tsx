"use client";
import React, { useEffect } from "react";

import Navlinks from "./navlinks";
import SubmitButton from "@/components/ui/shared/submit-button";
import { _signOut } from "@/lib/user/actions";
import { useNavbar } from "@/context/NavbarContext";
import clsx from "clsx";
import Link from "next/link";
import { Icons } from "@/components/icons";

type PropsType = {
  isLoggedIn: boolean;
};

export default function Navbar({ isLoggedIn }: PropsType) {
  const { isNavbarOpen } = useNavbar();

  useEffect(() => {
    console.log("chanigng navbar hehaha", isNavbarOpen);
  }, [isNavbarOpen]);

  return (
    <div
      className={clsx(
        "sticky md:flex h-full flex-col px-3 pt-12 md:px-2 md:border-r md:pb-4",
        { hidden: !isNavbarOpen }
      )}
    >
      <div className="md:flex flex-grow flex-row md:justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <Navlinks isLoggedIn={isLoggedIn} />
        <div className="md:hidden px-1">
          <Link
            href={"https://github.com/avi-mukesh"}
            className="flex justify-center my-2"
            target="_blank"
          >
            <Icons.github className="h-6 w-6" />
          </Link>
        </div>
        {isLoggedIn && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              _signOut();
            }}
          >
            <SubmitButton variant="destructive" text="Log out" />
          </form>
        )}
      </div>
    </div>
  );
}
