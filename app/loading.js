"use client";
import { FidgetSpinner } from "react-loader-spinner";

const loading = () => {
  return (
    <div className=" min-h-screen w-full flex items-center justify-center">
      {/* <p className=" text-2xl capitalize text-gray-500">loading...</p> */}
      <FidgetSpinner />
    </div>
  );
};
export default loading;
