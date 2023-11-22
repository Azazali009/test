"use client";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import axios from "axios";
import NewUser from "../users/NewUser";
import { useState } from "react";

function Navbar() {
  const [loading,setLoading] = useState()
  const { status } = useSession();
  const isAuthenticated = status === "authenticated";
  const isUnAuthenticated = status === "unauthenticated";
  const isLoading = status === "loading";

  const handleLogout = async () => {
    // 1) clear cookies token
    await axios.get("/api/logout");
    // 2) log out with next-auth
    signOut();
  };
  return (
    <nav className=" flex items-center gap-3">
      <ul className=" flex items-center justify-center">
        <li className=" px-4 py-1.5 text-xl capitalize  text-gray-700  duration-200 hover:text-gray-500">
          <Link href={"/"}>home</Link>
        </li>
        <li className=" px-4 py-1.5 text-xl capitalize  text-gray-700  duration-200 hover:text-gray-500">
          <Link href={"/about"}>about</Link>
        </li>
        <li className=" px-4 py-1.5 text-xl capitalize  text-gray-700  duration-200 hover:text-gray-500">
          <Link href={"/movie"}>movies</Link>
        </li>
        <li className=" px-4 py-1.5 text-xl capitalize  text-gray-700  duration-200 hover:text-gray-500">
          <Link href={"/users"}>users</Link>
        </li>
      </ul>
      {isLoading ? (
        <div className=" flex gap-2">
          <div className=" h-8 w-20 animate-pulse rounded-full bg-gray-300"></div>
          <div className=" h-8 w-20 animate-pulse rounded-full bg-gray-300"></div>
        </div>
      ) : (
        <div className=" space-x-3">
          {isUnAuthenticated && (
            <div className="space-x-2">
              <Link href="/register">
                <button className="btn btn-primary ">sign up</button>
              </Link>
              <Link href="/">
                <button className="btn btn-success">log in</button>
              </Link>
            </div>
          )}

          {isAuthenticated && (
            <button onClick={handleLogout} className="btn btn-error">
              log out
            </button>
          )}
        </div>
      )}
      <NewUser />
    </nav>
  );
}

export default Navbar;
