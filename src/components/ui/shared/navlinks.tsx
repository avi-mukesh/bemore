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
import { Icons } from "@/components/icons";

const links = [
  { name: "Home", href: "/dashboard", icon: Icons.dashboard },
  { name: "Journal", href: "/dashboard/journal", icon: Icons.notebook },
  { name: "Meditation", href: "/dashboard/meditation", icon: Icons.leaf },
  // { name: "Hobbies", href: "/dashboard/hobbies" },
  { name: "Reading", href: "/dashboard/reading", icon: Icons.book },
];

export default function Navlinks() {
  const pathname = usePathname();
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {links.map((link) => {
          const LinkIcon = link.icon;
          return (
            <NavigationMenuItem key={link.name}>
              <Link href={link.href} legacyBehavior passHref>
                <NavigationMenuLink
                  className={`${navigationMenuTriggerStyle()} flex justify-end gap-4 !w-full`}
                  active={pathname === link.href}
                >
                  <LinkIcon className="w-6" />
                  <p className="block">{link.name}</p>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
