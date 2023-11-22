import React from "react";
import FormRow from "../ui/FormRow";
import { useForm } from "react-hook-form";
import { useCreateUser } from "./useCreateUser";

const NewUser = () => {
  const { createUser, isPending } = useCreateUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    createUser(
      { ...data, image: data?.image[0] },
      {
        onSuccess: () => {
          reset();
          document.getElementById("my_modal_5").close();
        },
        onError: () => document.getElementById("my_modal_5").close(),
      },
    );
  };
  const onError = (err) => {
    // console.log(err);
  };

  const showModal = () => {
    document.getElementById("my_modal_5").showModal();
  };

  return (
    <div>
      <button className="btn btn-info" onClick={showModal}>
        add new user
      </button>
      <dialog id="my_modal_5" className="modal">
        <div className="no-scrollbar modal-box w-11/12 max-w-4xl ">
          <h3 className="text-lg font-bold">Add new user!</h3>
          <form
            onSubmit={handleSubmit(onSubmit, onError)}
            method="POST"
            className=" my-10 grid grid-cols-1 gap-y-4"
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
                disabled={isPending}
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
                disabled={isPending}
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
                disabled={isPending}
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
                disabled={isPending}
              />
            </FormRow>
            <FormRow label="photo" error={errors?.image?.message}>
              <input
                type="file"
                id="file"
                accept="image/*"
                disabled={isPending}
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
              <button disabled={isPending} className="btn btn-primary">
                add user
              </button>
              <button disabled={isPending} className="btn" type="reset">
                cancel
              </button>
            </div>
          </form>

          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button
                onClick={() => reset()}
                disabled={isPending}
                className="btn "
              >
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default NewUser;
