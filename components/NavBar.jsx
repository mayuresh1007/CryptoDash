"use client";
import React from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
// import { Button } from "@/components/ui/button";
import { ModeToggle } from "./ThemToggler";
import { Coins } from "lucide-react";

const NavBar = () => {
  const { theme, setTheme } = useTheme();

  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b">
      <Link href="/" className="text-2xl font-semibold">
      <div className="flex">
      <Coins size={30} className="text-orange-500" /> <span className="ms-2">Crypto<span className="text-orange-400">Dash</span></span> </div>
      </Link>

    
      <div className="hidden md:flex gap-6">
        <Link href="/dashboard" className="text-sm font-medium">
          Dashboard
        </Link>
        {/* <Link href="/markets" className="text-sm font-medium">
          Markets
        </Link> */}
        <Link href="/watchlist" className="text-sm font-medium">
          Watchlist
        </Link>
      </div>
      <ModeToggle />
    </nav>
  );
};

export default NavBar;
