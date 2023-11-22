function ErrorPage() {
  return (
    <div className=" flex items-center justify-center min-h-screen">
      <h1 className=" text-6xl capitalize text-gray-500 ">
        {" "}
        <span className="text-[5rem] font-bold  border-r-2 border-gray-500 pr-4 ">
          404
        </span>{" "}
        not found
      </h1>
    </div>
  );
}

export default ErrorPage;
