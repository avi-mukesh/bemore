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
import { Separator } from "../separator";
import type { LucideIcon } from "lucide-react";
import clsx from "clsx";

const dashLinks = [
  { name: "Home", href: "/dashboard", icon: Icons.dashboard },
  { name: "Journal", href: "/dashboard/journal", icon: Icons.notebook },
  { name: "Meditation", href: "/dashboard/meditation", icon: Icons.leaf },
  { name: "Hobbies", href: "/dashboard/hobbies", icon: Icons.trophy },
  // { name: "Social", href: "/dashboard/social", icon: Icons.social },
  { name: "Reading", href: "/dashboard/reading", icon: Icons.book },
  { name: "Assistant", href: "/assistant", icon: Icons.bot },
];

const otherLinks = [
  { name: "About", href: "/about", icon: Icons.about },
  // { name: "Privacy", href: "/about", icon: Icons.about },
];

const loginLink = [{ name: "Login", href: "/login", icon: Icons.login }];

type PropsType = {
  isLoggedIn: boolean;
  isNavbarOpen: boolean;
};

type LinkType = {
  name: string;
  href: string;
  icon: LucideIcon;
};

export default function Navlinks({ isLoggedIn, isNavbarOpen }: PropsType) {
  const pathname = usePathname();

  function generateNavLinks(links: LinkType[]) {
    return links.map((link) => {
      const LinkIcon = link.icon;
      return (
        <NavigationMenuItem key={link.name}>
          <Link href={link.href} legacyBehavior passHref>
            <NavigationMenuLink
              className={`${navigationMenuTriggerStyle()} flex justify-center md:justify-between gap-4 !w-full`}
              active={pathname === link.href}
            >
              <LinkIcon className="w-6" />
              <p
                className={clsx(
                  { "md:hidden": !isNavbarOpen },
                  { block: isNavbarOpen }
                )}
              >
                {link.name}
              </p>
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      );
    });
  }

  return (
    <NavigationMenu>
      {isLoggedIn && (
        <>
          <NavigationMenuList>{generateNavLinks(dashLinks)}</NavigationMenuList>
          <Separator className="my-2" />
        </>
      )}
      <NavigationMenuList>{generateNavLinks(otherLinks)}</NavigationMenuList>
      {!isLoggedIn && (
        <>
          <Separator className="my-2" />
          <NavigationMenuList>{generateNavLinks(loginLink)}</NavigationMenuList>
        </>
      )}
    </NavigationMenu>
  );
}
