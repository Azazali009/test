"use client";
import { useState } from "react";

const users = [
  {
    name: "azaz",
    email: "az@gmail.com",
  },
  {
    name: "khan",
    email: "khan@gmail.com",
  },
  {
    name: "ali",
    email: "ali@gmail.com",
  },
];
const pages = () => {
  const [value, setValue] = useState();

  const handleClick = (item) => {
    setValue(item);
    document.getElementById("my_modal_1")?.showModal();
  };
  return (
    <div className="mt-8 flex gap-2">
      {users.map((user) => {
        return (
          <button
            className="btn btn-info"
            key={user.name}
            onClick={() => handleClick(user)}
          >
            open modal
          </button>
        );
      })}
      <Test value={value} />
    </div>
  );
};

export default pages;
