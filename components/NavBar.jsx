"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useDispatch, useSelector } from "react-redux";
import { ModeToggle } from "./ThemToggler";
import { Coins, Menu, X } from "lucide-react"; // Added Menu and X icons
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { loginUser, registerUser, fetchUser, logoutUser } from "@/lib/redux/slices/userSlice";
// import { loginUser, registerUser,fetchUser, logoutUser } from "@/lib/redux/slices/userSlice"

const NavBar = () => {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const { isLoggedIn, profile, loading, error } = useSelector((state) => state.user);

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // Mobile menu state

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

  const handleRegister = () => {
    dispatch(registerUser({ email, password })).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        setIsRegisterOpen(false);
      }
    });
  };

  return (
    <>
      <nav className="flex items-center justify-between px-4 sm:px-6 py-4 border-b">
        <div className="flex items-center">
          {/* Mobile menu button - only shows on small screens */}
          <button 
            className="md:hidden mr-4"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <Link href="/dashboard" className="text-2xl font-semibold">
            <div className="flex">
              <Coins size={30} className="text-orange-500" /> 
              <span className="ms-2">Crypto<span className="text-orange-400">Dash</span></span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation - hidden on mobile */}
        <div className="hidden md:flex gap-12 items-center">
          <Link href="/dashboard" className="text-sm font-medium">Dashboard</Link>
          <Link href="/user" className="text-sm font-medium">Profile</Link>
          <ModeToggle />

          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">{profile?.name}</span>
              <Button variant="outline" onClick={() => dispatch(logoutUser())}>Logout</Button>
            </div>
          ) : (
            <div className="flex gap-4">
              <Button onClick={() => setIsLoginOpen(true)}>Login</Button>
              <Button variant="outline" onClick={() => setIsRegisterOpen(true)}>Register</Button>
            </div>
          )}
        </div>

        {/* Mobile Navigation - only shows on small screens when menu is open */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-background border-b shadow-lg z-50 p-4 flex flex-col gap-4">
            <Link 
              href="/dashboard" 
              className="text-sm font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link 
              href="/user" 
              className="text-sm font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Profile
            </Link>
            <ModeToggle className="py-2" />
            
            {isLoggedIn ? (
              <div className="flex flex-col gap-2">
                <span className="text-sm font-medium py-2">{profile?.name}</span>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    dispatch(logoutUser());
                    setMobileMenuOpen(false);
                  }}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <Button 
                  onClick={() => {
                    setIsLoginOpen(true);
                    setMobileMenuOpen(false);
                  }}
                >
                  Login
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => {
                    setIsRegisterOpen(true);
                    setMobileMenuOpen(false);
                  }}
                >
                  Register
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Show login/register buttons and theme toggle on mobile when menu is closed */}
        {!mobileMenuOpen && (
          <div className="md:hidden flex items-center gap-2">
            <ModeToggle />
            {!isLoggedIn && (
              <>
                <Button 
                  size="sm" 
                  onClick={() => setIsLoginOpen(true)}
                  className="text-xs"
                >
                  Login
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => setIsRegisterOpen(true)}
                  className="text-xs"
                >
                  Register
                </Button>
              </>
            )}
          </div>
        )}
      </nav>

      {/* Login Dialog */}
      <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Login</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <input 
              type="text" 
              placeholder="Email" 
              className="border p-2 rounded" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
            <input 
              type="password" 
              placeholder="Password" 
              className="border p-2 rounded" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
            <Button onClick={handleLogin} disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
        </DialogContent>
      </Dialog>

      {/* Register Dialog */}
      <Dialog open={isRegisterOpen} onOpenChange={setIsRegisterOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Register</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <input 
              type="text" 
              placeholder="Email" 
              className="border p-2 rounded" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
            <input 
              type="password" 
              placeholder="Password" 
              className="border p-2 rounded" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
            <Button onClick={handleRegister} disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </Button>
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NavBar;
