"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import toast from "react-hot-toast";

const page = () => {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSending(true);
      const res = await axios.post("/api/forgot-password", { email });
      toast.success(res.data.message);

      setEmailSent(true);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setSending(false);
    }
  };
  return (
    <div className=" flex items-center justify-center min-h-screen">
      {emailSent && (
        <div className="flex flex-col items-center gap-6">
          <h1 className="font-semibold text-2xl text-gray-700 ">
            Check your email
          </h1>
          <p>
            check your <span className=" font-medium">{email} </span> inbox for
            instruction
            <br /> from us on how to reset your password.{" "}
          </p>

          <Link
            className=" text-green-900 font-semibold hover:no-underline capitalize underline text-sm"
            href={"/"}
          >
            go back to login screen
          </Link>
        </div>
      )}
      {!emailSent && (
        <form
          onSubmit={handleSubmit}
          className=" flex flex-col items-center gap-4"
        >
          <h1 className=" text-2xl font-semibold text-zinc-500">
            Enter email to reset your password.
          </h1>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="enter email"
            className="input input-bordered w-full max-w-xs"
            disabled={sending}
          />
          <div className=" text-center">
            <button disabled={sending} className=" btn btn-primary">
              submit
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default page;
