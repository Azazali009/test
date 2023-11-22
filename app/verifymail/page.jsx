"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const page = () => {
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(null);

  const verifymail = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/verifymail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });

      if (res.ok) {
        setVerified(true);
        toast.success("Email has been verified ✔");
      } else {
        throw new Error("Your token has been expired or invalid token!");
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const hashedToken = window.location.search.split("=")[1];
    setToken(hashedToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifymail();
    }
  }, [token]);
  return (
    <div className=" min-h-screen flex  items-center justify-center ">
      {!loading && (
        <div className=" px-8 py-16 shadow-lg rounded-xl flex flex-col items-center justify-center gap-4">
          <h2 className=" text-4xl capitalize text-green-400 font-bold">
            Email verification
          </h2>

          {verified && (
            <h3 className=" text-sky-500 font-semibold text-2xl capitalize">
              Email verified ✔
            </h3>
          )}
          {error && <h3 className=" text-red-500 capitalize">{error}</h3>}

          <Link
            className=" text-sky-500 hover:underline font-medium text-xl capitalize"
            href="/"
          >
            Login
          </Link>
        </div>
      )}
    </div>
  );
};

export default page;
