"use client";
import React from "react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
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
            <Link href="journal" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Journal
              </NavigationMenuLink>
            </Link>
            <Link href="meditation" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Meditation
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
