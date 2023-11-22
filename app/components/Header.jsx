import Link from "next/link";
import Navbar from "./Navbar";
import Image from "next/image";
// import imageSrc from "../../public/azaz.png";

function Header() {
  return (
    <header className="  z-50 border-b-[1px] shadow-md sticky bg-white  top-0 border-gray-200 flex items-center justify-between py-1 px-4">
      <div>
        <Link href={"/"} className=" inline-block">
          <Image
            width={500}
            height={500}
            className=" w-16 h-16  object-cover rounded-full border-[1px] border-slate-800 "
            src="/azaz.png"
            alt="logo"
            priority
          />
        </Link>
      </div>
      <Navbar />
    </header>
  );
}

export default Header;
