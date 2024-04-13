"use client";

import { ModeToggle } from "@/components/ModeToggle";
import { Icons } from "@/components/icons";
import { useNavbar } from "@/context/NavbarContext";
import Link from "next/link";
import React, { useEffect } from "react";

type PropsType = {
  username: string | undefined;
};

export default function Header({ username }: PropsType) {
  const { setIsNavbarOpen } = useNavbar();

  return (
    <div className="fixed top-0 left-0 right-0 supports-backdrop-blur:bg-background/60 border-b bg-background/95 backdrop-blur z-20">
      <nav className="h-14 flex items-center justify-between px-4">
        <div className="flex gap-1 px-1">
          <div
            className="cursor-pointer px-1"
            onClick={() => setIsNavbarOpen((b: boolean) => !b)}
          >
            <Icons.menu className="h-6 w-6 md:hidden" />
          </div>
          <div className="hidden md:block px-1">
            <Link href={"https://github.com/avi-mukesh"} target="_blank">
              <Icons.github className="h-6 w-6" />
            </Link>
          </div>
        </div>
        <div>
          <Link href="/">
            <div className="w-32 md:w-40 text-2xl text-center">
              B<span className="font-bold">More</span>
            </div>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <p className="hidden md:block">{username}</p>
          <ModeToggle />
        </div>
      </nav>
    </div>
  );
}
