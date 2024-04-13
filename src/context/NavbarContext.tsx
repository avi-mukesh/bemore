"use client";

import { createContext, useContext, useState } from "react";

const NavbarContext = createContext<any>(null);

type PropsType = {
  children: React.ReactNode;
};

export default function NavbarProvider({ children }: PropsType) {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  return (
    <NavbarContext.Provider value={{ isNavbarOpen, setIsNavbarOpen }}>
      {children}
    </NavbarContext.Provider>
  );
}

export const useNavbar = () => useContext(NavbarContext);
