import Image from "next/image";
import Link from "next/link";
import React from "react";

const MoviesCard = (curEl) => {
  const { id, title, synopsis } = curEl.jawSummary;
  return (
    <div className="overflow-hidden rounded-md hover:scale-95 duration-200 flex flex-col gap-8 text-gray-500 shadow-lg">
      <Image
        className=" inline-block h-[220px] w-full object-cover object-top"
        width={200}
        height={200}
        quality={100}
        priority={false}
        src={
          curEl.jawSummary.backgroundImage.url
            ? curEl.jawSummary.backgroundImage.url
            : "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg?w=740"
        }
        alt={title}
      />

      <div className=" flex flex-col gap-4 p-3">
        <h2 className=" text-gray-500 font-semibold capitalize text-2xl ">
          {title.substring(0, 15)}
        </h2>
        <p className=" leading-6 text-lg">{`${synopsis.substring(
          0,
          100
        )} ...`}</p>
        <div className=" self-end justify-end">
          <Link
            href={`movie/${id}`}
            className=" bg-black text-base border border-transparent hover:bg-transparent hover:border hover:border-gray-500 hover:text-gray-500 duration-200 text-white px-6 py-2 inline-block rounded-full"
          >
            <button className=" capitalize">read more</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MoviesCard;
