"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useDispatch, useSelector } from "react-redux";
import { ModeToggle } from "./ThemToggler";
import { Coins } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { loginUser, fetchUser, logoutUser } from "@/lib/redux/slices/userSlice";

const NavBar = () => {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const { isLoggedIn, profile, loading, error } = useSelector((state) => state.user);

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    dispatch(fetchUser()); // Auto-login if token exists
  }, [dispatch]);

  const handleLogin = () => {
    dispatch(loginUser({ email, password })).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        setIsLoginOpen(false);
      }
    });
  };

  return (
    <>
      <nav className="flex items-center justify-between px-6 py-4 border-b">
        <Link href="/" className="text-2xl font-semibold">
          <div className="flex">
            <Coins size={30} className="text-orange-500" /> 
            <span className="ms-2">Crypto<span className="text-orange-400">Dash</span></span>
          </div>
        </Link>

        <div className="hidden md:flex gap-6">
          <Link href="/dashboard" className="text-sm font-medium">Dashboard</Link>
          <Link href="/user" className="text-sm font-medium">Profile</Link>
          <Link href="/watchlist" className="text-sm font-medium">Watchlist</Link>
        </div>
        <ModeToggle />

        {isLoggedIn ? (
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">{profile?.name}</span>
            <Button variant="outline" onClick={() => dispatch(logoutUser())}>Logout</Button>
          </div>
        ) : (
          <Button onClick={() => setIsLoginOpen(true)}>Login</Button>
        )}

        {/* <ModeToggle /> */}
      </nav>

      <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Login</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <input type="text" placeholder="Email" className="border p-2 rounded" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" className="border p-2 rounded" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button onClick={handleLogin} disabled={loading}>{loading ? "Logging in..." : "Login"}</Button>
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NavBar;
