import React from "react";

const page = () => {
  return (
    <div className=" min-h-screen grid place-items-center">
      <div className=" shadow-xl  p-16 flex flex-col gap-6">
        <h1 className=" text-2xl text-violet-500 capitalize font-bold text-center">
          User detail
        </h1>
        <p>
          Name:{" "}
          <span className=" font-bold text-lg text-zinc-700">Azaz ali</span>
        </p>
        <p>
          email:{" "}
          <span className=" font-bold text-lg text-zinc-700">
            Azaz@gmail.com
          </span>
        </p>
        <button className="btn btn-error">logout</button>
      </div>
    </div>
  );
};

export default page;
