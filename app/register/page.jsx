"use client";
import Link from "next/link";
import FormRow from "../ui/FormRow";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const page = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  async function Submit(data) {
    setLoading(true);
    try {
      let { name, email, password } = data;

      const res = await fetch("api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      console.log(res);
      if (res.ok) {
        router.push("/");
        toast.success(
          "Please check your mail inbox and click the verification link to get verified"
        );
      } else {
        throw new Error("User already exist or your enter invalid data");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  const onError = (error) => {
    console.log(error);
  };

  return (
    <form
      onSubmit={handleSubmit(Submit, onError)}
      className=" max-w-xl m-auto shadow-lg mt-10 px-4 py-12 grid grid-cols-1 gap-y-4"
    >
      <h1 className=" text-2xl uppercase font-bold justify-self-center mb-4 text-green-500">
        registeration
      </h1>
      <FormRow label={"name"} error={errors?.name?.message}>
        <input
          type="text"
          placeholder="Enter Full name"
          className="input input-bordered w-full max-w-xs "
          {...register("name", { required: "This field is required" })}
        />
      </FormRow>
      <FormRow label={"email"} error={errors?.email?.message}>
        <input
          type="email"
          placeholder="Enter Email"
          className="input input-bordered w-full max-w-xs "
          {...register("email", { required: "This field is required" })}
        />
      </FormRow>
      <FormRow label={"password"} error={errors?.password?.message}>
        <input
          type="password"
          placeholder="Enter password"
          className="input input-bordered w-full max-w-xs "
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password should be at least 8 character long.",
            },
          })}
        />
      </FormRow>
      <button disabled={loading} className=" btn btn-primary">
        sign up
      </button>
      <div>
        <p className=" text-sm">
          Already have an account?
          <Link
            className=" text-sky-500 capitalize underline hover:no-underline"
            href="/"
          >
            Login
          </Link>
        </p>
      </div>
    </form>
  );
};

export default page;
