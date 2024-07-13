import { Home, LibraryBig, MessageCircle } from "lucide-react";
import LoginButton from "./LoginButton";
import AuthContextProvider from "@/lib/contexts/AuthContext";
import Link from "next/link";

export default function Header() {
  return (
    <nav className="flex justify-between items-center px-7 py-3 border-b">
      {/* <img className="h-10" src="/logo.png" alt="" /> */}
      <Link href={"/"}>
        <h1 className="font-bold font-mono">Next.Js Firebase Blog</h1>
      </Link>

      <ul className="flex gap-6 items-center">
        <li className="flex items-center gap-1">
          <Home className="h-4 w-4" />
          Home
        </li>
        <li className="flex items-center gap-1">
          <LibraryBig className="h-4 w-4" />
          Home
        </li>
        <li className="flex items-center gap-1">
          <MessageCircle className="h-4 w-4" />
          Home
        </li>
      </ul>
      <AuthContextProvider>
        <LoginButton />
      </AuthContextProvider>
    </nav>
  );
}
