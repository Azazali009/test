import React, { useState } from "react";
import FormRow from "../ui/FormRow";
import { useForm } from "react-hook-form";

const editUser = ({ user = {} }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: user,
  });

  const onSubmit = (data) => {
    console.log(data);
  };
  const onError = (err) => {
    console.log(err);
  };

  // const handleEdit = (id) => {
  //   if (user.id === id) {
  //     setAzaz(user);
  //   }
  //   document.getElementById("my_modal_4").showModal();
  // };

  return (
    <div>
      {/* <button className="btn" onClick={() => handleEdit(user.id)}>
        edit
      </button> */}

      <dialog id="my_modal_4" className="modal">
        <div className="modal-box w-11/12 max-w-4xl">
          <h3 className="font-bold text-lg">Hello! {user?.name} </h3>

          <form
            className="my-6 grid grid-cols-1 gap-4"
            method="POST"
            onSubmit={handleSubmit(onSubmit, onError)}
          >
            <FormRow label="name" error={errors?.name?.message}>
              <input
                type="text"
                id="name"
                placeholder="Enter name"
                className="input input-bordered input-info input-sm w-full max-w-xs"
                {...register("name", {
                  required: "This field should required",
                })}
                // disabled={isPending}
              />
            </FormRow>

            <FormRow label="email" error={errors?.email?.message}>
              <input
                type="email"
                id="email"
                placeholder="Enter email"
                className="input input-bordered input-info input-sm w-full max-w-xs"
                {...register("email", {
                  required: "This field should required",
                })}
                // disabled={isPending}
              />
            </FormRow>

            <FormRow label="phone" error={errors?.phone?.message}>
              <input
                type="text"
                id="phone"
                placeholder="Enter your phone"
                className="input input-bordered input-info input-sm w-full max-w-xs"
                {...register("phone", {
                  required: "This field should required",
                  maxLength: {
                    value: 11,
                    message: "Phone should be 11 character long",
                  },
                })}
                // disabled={isPending}
              />
            </FormRow>

            <FormRow label="address" error={errors?.address?.message}>
              <input
                type="text"
                id="address"
                placeholder="Enter your address"
                className="input input-bordered input-info input-sm w-full max-w-xs"
                {...register("address", {
                  required: "This field should required.",
                })}
                // disabled={isPending}
              />
            </FormRow>

            <FormRow label="photo" error={errors?.image?.message}>
              <input
                type="file"
                id="file"
                accept="image/*"
                // disabled={isPending}
                {...register("image", {
                  required: "Image should needed.",
                  validate: (image) =>
                    image[0].size / 1000 <= 1000 ||
                    "image should be less than 1mb",
                })}
                className="file-input file-input-bordered file-input-info file-input-xs w-full max-w-xs"
              />
            </FormRow>

            <div className="flex gap-2">
              <button className="btn btn-primary">update</button>
              <button className="btn" type="reset">
                cancel
              </button>
            </div>
          </form>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default editUser;
