"use client";

import {
  NavigationMenu,
  NavigationMenuList,
} from "@radix-ui/react-navigation-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import {
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const links = [
  { name: "Home", href: "/dashboard" },
  { name: "Journal", href: "/dashboard/journal" },
  { name: "Meditation", href: "/dashboard/meditation" },
  { name: "Hobbies", href: "/dashboard/hobbies" },
  { name: "Reading", href: "/dashboard/reading" },
];

export default function Navlinks() {
  const pathname = usePathname();
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {links.map((link) => {
          return (
            <NavigationMenuItem key={link.name}>
              <Link href={link.href} legacyBehavior passHref>
                <NavigationMenuLink
                  className={`${navigationMenuTriggerStyle()} !w-full`}
                  active={pathname === link.href}
                >
                  {link.name}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
