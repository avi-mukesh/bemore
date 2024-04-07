"use client";
import React from "react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "./navigation-menu";
import Link from "next/link";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { ModeToggle } from "../ModeToggle";
import { signOut } from "next-auth/react";
import { Button } from "./button";
import { logout } from "@/lib/user/actions";

type PropsType = {
  username: string | null | undefined;
};

export default function Navbar({ username }: PropsType) {
  const handleLogout = async (e: FormData) => {
    logout();
  };

  return (
    <NavigationMenu className="fixed my-2 mx-2 w-full">
      <NavigationMenuList>
        {username && (
          <NavigationMenu>
            <form action={handleLogout}>
              <Button variant="destructive">Log out</Button>
            </form>
          </NavigationMenu>
        )}
        <NavigationMenuItem>
          <ModeToggle />
        </NavigationMenuItem>
        {username && (
          <NavigationMenuItem>
            <Link href="dashboard" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                My Journal
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
