"use client";

import Image from "next/image";
import NewUser from "./NewUser";
import { useDeleteUser } from "./useDeleteUser";
import { useUser } from "./useUser";
import { useState } from "react";
import EditUser from "./EditUser";
import { useForm } from "react-hook-form";
import Modal from "./Modal";

function Contact() {
  const [userID, setUserID] = useState(null);
  const [editUser, setEditUser] = useState(null);
  const [show, setShow] = useState(false);
  const { users, isLoading } = useUser();
  const { deleteUser, isPending } = useDeleteUser();

  const closeModal = (modalId) => {
    document.getElementById(modalId).close();
  };
  const handleDeleteUser = () => {
    deleteUser(userID);
    closeModal("my_modal_1");
  };

  const handleEdit = (id) => {
    users.map((user) => {
      if (user.id === id) {
        setEditUser(user);
      }
    });

    setShow(true);
  };

  const onCloseModal = () => setShow(false);
  if (isLoading)
    return (
      <div className=" min-h-screen flex items-center justify-center w-full text-xl ">
        Loading...
      </div>
    );

  return (
    <div>
      {/* <EditUser user={editUser} /> */}

      {show && <Modal onClose={onCloseModal} editUser={editUser} />}

      <div className="max-w-4xl mx-auto grid grid-cols-3  px-6 py-10 gap-6">
        {users.length === 0 ? (
          <p>User list are empty</p>
        ) : (
          users?.map((user) => {
            return (
              <div
                key={user.id}
                className=" shadow-xl rounded-xl overflow-hidden bg-gray-100 flex flex-col gap-3 p-6"
              >
                <Image
                  src={user?.image}
                  alt="user image"
                  width={40}
                  height={40}
                  className=" w-16 bg-gray-300 h-16 rounded-full object-cover self-center"
                />
                <div className="divider">{user.name.split(" ")[0]}</div>

                <div className="my-6 flex flex-col gap-4">
                  <p className="capitalize">
                    {" "}
                    <span className="font-medium capitalize">Name</span> :
                    {user.name}
                  </p>
                  <p className="text-sm">
                    {" "}
                    <span className="font-medium capitalize text-base">
                      Email
                    </span>{" "}
                    :{user.email}
                  </p>
                  <p>
                    <span className="font-medium capitalize">address</span> :
                    {user.address}
                  </p>
                  <p>
                    <span className="font-medium capitalize">phone</span> :
                    {user.phone}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    className="btn btn-error"
                    onClick={() => {
                      document.getElementById("my_modal_1").showModal();
                      setUserID(user.id);
                    }}
                  >
                    delete
                  </button>
                  <button
                    className="btn btn-success"
                    // onClick={() => handleEdit(user.id)}
                    onClick={() => handleEdit(user.id)}
                  >
                    edit
                  </button>
                </div>
                <dialog id="my_modal_1" className="modal">
                  <div className="modal-box">
                    <h3 className="font-bold text-lg">Delete User !</h3>

                    <p className="py-4">
                      Are you sure to delete this user? This action will not
                      undo once it delete.
                    </p>

                    <div className="modal-action">
                      <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button disabled={isPending} className="btn">
                          Close
                        </button>
                        <button
                          disabled={isPending}
                          onClick={() => handleDeleteUser(user.id)}
                          className="btn btn-error absolute bottom-6 right-28 "
                        >
                          delete
                        </button>
                      </form>
                    </div>
                  </div>
                </dialog>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Contact;
