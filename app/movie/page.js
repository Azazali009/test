import React from "react";
import MoviesCard from "../components/MoviesCard";

const page = async () => {
  const url = process.env.NEXT_PUBLIC_RAPID_API_KEY;

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "40252352damsh2b6ecc3ab064d0bp1af7d1jsn32e4805770aa",
      "X-RapidAPI-Host": "netflix54.p.rapidapi.com",
    },
  };

  const res = await fetch(url, options);
  const data = await res.json();
  const main_data = data.titles;

  return (
    <div className="max-w-[80rem] mx-auto my-16 p-4">
      <h1 className=" text-center text-3xl capitalize font-bold my-6 text-red-500">
        Movies & Series
      </h1>
      <div className=" grid grid-cols-3  gap-8">
        {main_data?.map((curEl) => {
          return <MoviesCard key={curEl.id + Date.now()} {...curEl} />;
        })}
      </div>
    </div>
  );
};

export default page;
