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

const dashLinks = [
  { name: "Home", href: "/dashboard", icon: Icons.dashboard },
  { name: "Journal", href: "/dashboard/journal", icon: Icons.notebook },
  { name: "Meditation", href: "/dashboard/meditation", icon: Icons.leaf },
  // { name: "Hobbies", href: "/dashboard/hobbies" },
  { name: "Reading", href: "/dashboard/reading", icon: Icons.book },
];

const otherLinks = [
  { name: "About", href: "/about", icon: Icons.about },
  // { name: "Privacy", href: "/about", icon: Icons.about },
];

const loginLink = [{ name: "Login", href: "/login", icon: Icons.login }];

type PropsType = {
  isLoggedIn: boolean;
};

type LinkType = {
  name: string;
  href: string;
  icon: LucideIcon;
};

function generateNavLinks(pathname: string, links: LinkType[]) {
  return links.map((link) => {
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
  });
}

export default function Navlinks({ isLoggedIn }: PropsType) {
  const pathname = usePathname();
  return (
    <NavigationMenu>
      {isLoggedIn && (
        <>
          <NavigationMenuList>
            {generateNavLinks(pathname, dashLinks)}
          </NavigationMenuList>
          <Separator className="my-2" />
        </>
      )}
      <NavigationMenuList>
        {generateNavLinks(pathname, otherLinks)}
      </NavigationMenuList>
      {!isLoggedIn && (
        <>
          <Separator className="my-2" />
          <NavigationMenuList>
            {generateNavLinks(pathname, loginLink)}
          </NavigationMenuList>
        </>
      )}
    </NavigationMenu>
  );
}
