"use client";
import React, { useEffect } from "react";

import Navlinks from "./navlinks";
import SubmitButton from "@/components/ui/shared/submit-button";
import { _signOut } from "@/lib/user/actions";
import { useNavbar } from "@/context/NavbarContext";
import clsx from "clsx";

type PropsType = {
  isLoggedIn: boolean;
};

export default function Navbar({ isLoggedIn }: PropsType) {
  // const session = await auth();
  // const isLoggedIn = !!session?.user?.id;

  const { isNavbarOpen } = useNavbar();

  useEffect(() => {
    console.log("chanigng navbar hehaha", isNavbarOpen);
  }, [isNavbarOpen]);

  return (
    <div
      className={clsx(
        "sticky md:flex h-full flex-col px-3 pt-12 md:px-2 md:border-r",
        { hidden: !isNavbarOpen }
      )}
    >
      <div className="md:flex flex-grow flex-row md:justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <Navlinks isLoggedIn={isLoggedIn} />
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
