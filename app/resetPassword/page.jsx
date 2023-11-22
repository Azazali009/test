"use client";
import React, { useEffect, useState } from "react";
import FormRow from "../ui/FormRow";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const resetPassword = () => {
  const [token, setToken] = useState("");
  const router = useRouter();
  const { register, handleSubmit, formState, getValues } = useForm();
  const { errors } = formState;

  useEffect(() => {
    const token = window.location.search.split("=")[1];
    setToken(token || "");
  }, [token, setToken]);

  const onSubmit = async (data) => {
    const { newPassword } = data;
    try {
      const res = await axios.post("api/resetPassword", {
        token,
        newPassword,
      });
      toast.success(res.data.message);
      router.push("/");
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };
  const onError = (error) => {
    console.log(error);
  };
  return (
    <div className=" flex items-center justify-center mt-16">
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className=" flex flex-col gap-4 items-center p-8 max-w-xl border rounded-md"
      >
        <h1 className=" text-xl font-bold capitalize text-green-500">
          Enter your new password to reset.
        </h1>
        <FormRow label="New password" error={errors?.newPassword?.message}>
          <input
            type="password"
            placeholder="Enter new passowrd"
            className="input input-bordered w-full max-w-xs "
            {...register("newPassword", {
              required: "Please input your password",
              minLength: {
                value: 8,
                message: "Password should be atleast 8 character long",
              },
            })}
          />
        </FormRow>

        <FormRow
          label={"Confirm password"}
          error={errors?.confirmPassword?.message}
        >
          <input
            type="password"
            placeholder="Confirm passowrd"
            className="input input-bordered w-full max-w-xs "
            {...register("confirmPassword", {
              required: "Please enter your confirm password",
              validate: (values) =>
                values === getValues().newPassword ||
                "Password should be match!",
            })}
          />
        </FormRow>
        <button className="btn btn-success">reset</button>
      </form>
    </div>
  );
};

export default resetPassword;
