import Image from "next/image";
import Comments from "../Comments";

const page = async ({ params }) => {
  const id = params.id;

  const url = `https://netflix54.p.rapidapi.com/title/details/?ids=${id}$lang=en`;

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "40252352damsh2b6ecc3ab064d0bp1af7d1jsn32e4805770aa",
      "X-RapidAPI-Host": "netflix54.p.rapidapi.com",
    },
  };

  const res = await fetch(url, options);
  const data = await res.json();
  const main_data = data[0].details;

  return (
    <div className=" mx-auto flex max-w-[70rem] flex-col  gap-6 py-8 text-gray-500">
      <div>
        <h1 className=" text-2xl font-bold capitalize text-red-500">
          Netflix / <span className="  text-gray-500">{main_data.type}</span>
        </h1>
        <Image
          className="h-[300px] object-cover "
          src={
            main_data.backgroundImage.url
              ? main_data.backgroundImage.url
              : "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg?w=740"
          }
          width={800}
          height={300}
        />
      </div>
      <h2 className=" text-4xl font-semibold capitalize">{main_data.title}</h2>
      <p className=" text-lg">{main_data.synopsis}</p>
      <Comments />
    </div>
  );
};

export default page;
