import React from "react";
import Link from "next/link";
import Footer from "../components/thank-you/Footer";

const ThankYou = () => {
  return (
    <div className="h-screen bg-background justify-center flex flex-col items-center ">
      <div className="bg-slate-200 px-2 py-8 md:px-8 md:py-8 flex flex-col justify-center items-center gap-4 rounded-lg">
        <span className="flex h-auto w-[40%] md:w-[50%] ">
          <img src="/thankyou-icon.png" alt="thankyou_png" />
        </span>
        <span className="flex font-extrabold text-4xl md:text-6xl font-alegreya text-sky-900">
          Thank You!
        </span>
        <span className="flex font-medium text-lg md:text-xl font-mulish text-slate-500">
          Your submission has been received. ✔️
        </span>
      </div>
      <div className="absolute bottom-0 w-screen ">
        <Footer />
      </div>
    </div>
  );
};

export default ThankYou;
