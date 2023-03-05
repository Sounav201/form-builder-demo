import React from "react";
import { MdArrowForward } from "react-icons/md";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaShare } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";

const Navbar = (props) => {
  //   localStorage.setItem("formHeading", JSON.stringify(form.name));
  const router = useRouter();
  return (
    <>
      <div className="flex flex-row justify-between bg-zinc-800  py-3 md:py-4 px-4  md:px-8">
        <Link href="/dashboard/home">
          <div className="hidden md:flex items-center ml-0 ">
            <img
              src="/fulltitle-gold.png"
              alt=""
              className="h-[1.25em] md:h-[1.5em]"
            />
          </div>
        </Link>
        <Link href="/dashboard/home">
          <div className="flex md:hidden items-center ml-0">
            <img
              src="/logo-gold.png"
              alt=""
              className="h-[2em] md:h-[1.75em]"
            />
          </div>
        </Link>
        <div className="flex justify-center items-center">
          <p className="flex text-metagold justify-between font-bold font-alegreya text-md md:text-xl">
            [FORM_NAME]
          </p>
        </div>
        <div className="flex flex-row gap-3 md:gap-6">
          <button className="text-md text-white bg-lime-500 hover:bg-lime-600 flex flex-row gap-2 px-3 md:px-4 py-2 md:py-2 justify-center items-center rounded-full">
            <span className="font-oxygen font-semibold">Share</span>
            <span className="">
              <FaShare className="text-md md:text-xl" />
            </span>
          </button>

          <button className=" font-medium text-Yellow-500 border border-yellow-500 rounded-md text-yellow-500 hover:text-white group relative flex justify-center items-center overflow-hidden hidden md:flex">
            <span className="absolute left-0 w-full h-0 transition-all bg-yellow-500 opacity-100 group-hover:h-full group-hover:top-0 duration-400 ease"></span>
            {/* <span className="absolute right-0 flex items-center h-10 duration-300 transform translate-x-full group-hover:translate-x-0"><MdArrowForward size="1.5em" /></span> */}
            <span
              className={`relative py-1 md:py-2 px-2 md:px-5 text-sm md:text-lg font-alegreya font-medium flex flex-row gap-2 md:gap-3 `}
            >
              <span className="text-base md:text-lg font-semibold">
                Download All
              </span>
              <span>
                <FiDownload className="text-lg md:text-2xl" />
              </span>
            </span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
