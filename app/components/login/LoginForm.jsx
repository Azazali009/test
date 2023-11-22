"use client";
import { signIn } from "next-auth/react";
import FormRow from "../../ui/FormRow";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const LoginFome = () => {
  const router = useRouter();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const { email, password } = data;

      await fetch("api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (res.error) {
        setError("Please enter correct email and password");
        toast.error("Provide valid credentials!");
        return;
      }

      router.replace("/movie");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const id = setTimeout(() => {
      setError(null);
    }, 5000);

    return () => clearTimeout(id);
  });
  return (
    <div className=" max-w-xl m-auto shadow-lg mt-16 px-4 py-12 ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-y-4"
      >
        <h1 className=" text-2xl uppercase font-bold justify-self-center mb-4 text-green-500">
          Login
        </h1>
        {error && (
          <p className=" justify-self-center text-red-700 bg-red-100 rounded-full px-4 py-1 animate-bounce">
            {error}
          </p>
        )}
        <FormRow label={"email"} error={errors?.email?.message}>
          <input
            type="email"
            placeholder="Enter Email"
            className="input input-bordered w-full max-w-xs "
            {...register("email", { required: "This field is required" })}
            disabled={loading}
          />
        </FormRow>
        <FormRow label={"password"} error={errors?.password?.message}>
          <input
            type="password"
            placeholder="Enter password"
            className="input input-bordered w-full max-w-xs "
            {...register("password", { required: "This field is required" })}
            disabled={loading}
          />
        </FormRow>
        <button disabled={loading} className=" btn btn-primary">
          Login
        </button>
        <div>
          <div className=" text-right">
            <Link
              href={"/forgot-password"}
              className="underline hover:no-underline"
            >
              forgot password?
            </Link>
          </div>
          <p className=" text-sm">
            You don't have an accont?{" "}
            <Link
              className=" text-sky-500 capitalize underline hover:no-underline"
              href="/register"
            >
              Sign up
            </Link>{" "}
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginFome;
