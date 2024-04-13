import { auth } from "@/auth";
import { ModeToggle } from "@/components/ModeToggle";
import { Icons } from "@/components/icons";
import Link from "next/link";
import React from "react";

export default async function Header() {
  const session = await auth();

  return (
    <div className="fixed top-0 left-0 right-0 supports-backdrop-blur:bg-background/60 border-b bg-background/95 backdrop-blur z-20">
      <nav className="h-14 flex items-center justify-between px-4">
        <div className="px-2">
          <Link href={"https://github.com/avi-mukesh"} target="_blank">
            <Icons.github className="h-6 w-6" />
          </Link>
        </div>
        <div>
          <Link href="/">
            <div className="w-32 md:w-40 text-2xl text-center">
              B<span className="font-bold">More</span>
            </div>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          {session?.user?.username && (
            <p className="hidden md:block">{session.user.username}</p>
          )}
          <ModeToggle />
        </div>
      </nav>
    </div>
  );
}
