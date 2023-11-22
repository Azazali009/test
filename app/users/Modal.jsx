"use client";
import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import FormRow from "../ui/FormRow";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "../services/apiUsers";
import toast from "react-hot-toast";
import { createPortal } from "react-dom";

const Modal = ({ editUser, onClose }) => {
  const ref = useRef();
  console.log(ref.current);
  const { id: editId, ...editValues } = editUser;
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: editValues,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: ({ newUserData, id }) => updateUser(newUserData, id),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      toast.success("user updated successfully.");
    },
    onError: (err) => toast.error(err.message),
  });

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (image.size / 1000 > 1000) {
      return toast.error("Image should be less than 1mb");
    }
    mutate(
      { newUserData: { ...data, image }, id: editId },
      {
        onSuccess: () => onClose(),
      },
    );
  }
  function onError(err) {
    console.log(err);
  }

  useEffect(() => {
    document.body.style.overflowY = "hidden";

    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, []);

  return createPortal(
    <>
      <div
        ref={ref}
        className="fixed inset-0 z-50 bg-gray-700 bg-opacity-40 "
      ></div>
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="no-scrollbar  fixed left-[50%] top-[50%] z-50 grid h-[28rem] max-h-[calc(100vh-5em)] w-[50rem] -translate-x-[50%] -translate-y-[50%] grid-cols-1 gap-4 overflow-scroll rounded-xl bg-white px-12 py-8 shadow-2xl "
      >
        <h1 className=" text-center text-2xl font-bold capitalize text-sky-500">
          Update {editUser.name}
        </h1>
        <FormRow label={"name"} error={errors?.name?.message}>
          <input
            type="text"
            {...register("name", {
              required: "This field should required",
            })}
            className="input input-bordered input-info input-sm w-full max-w-xs"
            disabled={isPending}
          />
        </FormRow>

        <FormRow label={"email"} error={errors?.email?.message}>
          <input
            type="email"
            {...register("email", {
              required: "This field should required",
            })}
            className="input input-bordered input-info input-sm w-full max-w-xs"
            disabled={isPending}
          />
        </FormRow>
        <FormRow label={"phone"} error={errors?.phone?.message}>
          <input
            type="number"
            {...register("phone", {
              required: "This field should required",
              maxLength: {
                value: 11,
                message: "Phone should be 11 characters long",
              },
              minLength: {
                value: 11,
                message: "Phone should be 11 characters long",
              },
            })}
            className="input input-bordered input-info input-sm w-full max-w-xs"
            disabled={isPending}
          />
        </FormRow>
        <FormRow label={"address"} error={errors?.address?.message}>
          <input
            type="text"
            {...register("address", {
              required: "This field should required",
            })}
            className="input input-bordered input-info input-sm w-full max-w-xs"
            disabled={isPending}
          />
        </FormRow>
        <FormRow label={"image"} error={errors?.image?.message}>
          <input
            type="file"
            {...register("image")}
            className="file-input file-input-accent file-input-sm w-full max-w-xs"
            disabled={isPending}
          />
        </FormRow>
        <div className="flex gap-3">
          <button disabled={isPending} className="btn btn-info">
            update
          </button>
          <button disabled={isPending} className="btn" onClick={onClose}>
            close
          </button>
        </div>
      </form>
    </>,
    document.body,
  );
};

export default Modal;
