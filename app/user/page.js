"use client";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  fetchUser,
  loginUser,
  logoutUser,
  removeFromWishlist,
} from "@/lib/redux/slices/userSlice";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function ProfilePage() {
  const { profile, isLoggedIn, loading, error, wishlist } = useSelector(
    (state) => state.user
  );
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

  console.log("wishlist", wishlist);

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
        <div className="mx-auto w-full max-w-sm rounded-md border border-blue-300 p-4">
          <div className="flex animate-pulse space-x-4">
            <div className="size-10 rounded-full bg-gray-200"></div>
            <div className="flex-1 space-y-6 py-1">
              <div className="h-2 rounded bg-gray-200"></div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2 h-2 rounded bg-gray-200"></div>
                  <div className="col-span-1 h-2 rounded bg-gray-200"></div>
                </div>
                <div className="h-2 rounded bg-gray-200"></div>
              </div>
            </div>
          </div>
        </div>
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
      ) : (
        <div className="mx-auto">Please Login to view profile!!!</div>
      )}

      {isLoggedIn && (
        <div className="p-6">
          <h2 className="text-2xl font-bold text-center mb-4">My Wishlist</h2>
          {wishlist.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlist.map((coin) => (
                <div
                  key={coin.id}
                  className="border p-4 rounded-lg shadow-md bg-white dark:bg-gray-800"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={coin.image}
                      alt={coin.name}
                      className="w-12 h-12 object-cover"
                    />
                    <div>
                      <h3 className="text-lg font-semibold">{coin.name}</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Price: ${coin.current_price}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="destructive"
                    className="mt-4 w-full"
                    onClick={() => dispatch(removeFromWishlist(coin.id))}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No coins in wishlist.</p>
          )}
        </div>
      )}

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
