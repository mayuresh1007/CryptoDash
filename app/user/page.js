"use client";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchUser, loginUser, logoutUser } from "@/lib/redux/slices/userSlice";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function ProfilePage() {
  const { profile, isLoggedIn, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [name, setName] = useState(profile?.name || "");
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Fetch user data on page load
  useEffect(() => {
    dispatch(fetchUser()); // Always fetch user on mount
  }, [dispatch]);

  // Open login dialog if not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      setIsLoginOpen(true);
    }
  }, [isLoggedIn]);

  // Handle profile update (Mock example)
  const handleUpdate = () => {
    // dispatch(updateProfile({ name }));
  };

  // Handle login
  const handleLogin = async () => {
    const result = await dispatch(loginUser({ email, password }));

    if (result.meta.requestStatus === "fulfilled") {
      setIsLoginOpen(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 border rounded shadow-md">
      {loading ? (
        <p>Loading...</p>
      ) : isLoggedIn ? (
        <>
          <h1 className="text-xl font-semibold">Welcome, {profile?.name}!</h1>
          <p className="text-gray-600">Email: {profile?.email}</p>
          <img
            src={profile?.avatar || "/default-avatar.png"}
            alt="Avatar"
            className="w-16 h-16 rounded-full mt-2"
          />

          {/* Profile Update Form */}
          <div className="mt-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-2 rounded w-full"
            />
            <Button onClick={handleUpdate} className="mt-2">
              Update Name
            </Button>
          </div>

          <Button
            onClick={() => dispatch(logoutUser())}
            className="mt-4 bg-red-500"
          >
            Logout
          </Button>
        </>
      ) : <div className="mx-auto">Please Login to view profile!!!</div>}

      {/* Login Dialog */}
      <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Login</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <input
              type="email"
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
    </div>
  );
}
