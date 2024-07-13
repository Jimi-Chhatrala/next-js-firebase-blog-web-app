"use client";

import { useAuth } from "@/lib/contexts/AuthContext";
import Link from "next/link";

export default function LoginButton() {
  const { user, isLoading, error, handleSignInWithGoogle, handleLogout } =
    useAuth();

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  const handleLogoutProcess = () => {
    const confirm = window.confirm("Are you sure to logout?");
    if (confirm) {
      handleLogout();
    }
  };

  if (user) {
    return (
      <div className="flex gap-4 items-center">
        <button
          onClick={() => handleLogoutProcess()}
          className="bg-gray-900 text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-gray-700 transition-all duration-200"
        >
          Logout
        </button>
        <Link href={"/admin"}>
          <div className="flex gap-4 rounded-xl bg-gray-200 px-3 py-2">
            <img
              className="object-cover h-12 w-12 rounded-full border-[3px] border-white"
              src={user?.photoURL}
              alt="User Profile"
            />
            <div>
              <h1 className="font-bold text-black">{user?.displayName}</h1>
              <h1 className="text-xs text-gray-900">{user?.email}</h1>
            </div>
          </div>
        </Link>
      </div>
    );
  }
  return (
    <section>
      <button
        onClick={() => {
          handleSignInWithGoogle();
        }}
        className="bg-gray-900 text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-gray-700 transition-all duration-200"
      >
        <img src="/google.png" alt="Google logo" className="h-7 w-7" />
        Login With Google
      </button>
    </section>
  );
}
