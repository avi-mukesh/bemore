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
        <div>
          <Link href={"https://github.com/avi-mukesh"} target="_blank">
            <Icons.github className="h-6 w-6" />
          </Link>
        </div>

        <div className="flex items-center gap-2">
          {session?.user?.username && <p>Welcome, {session.user.username}</p>}
          <ModeToggle />
        </div>
      </nav>
    </div>
  );
}
