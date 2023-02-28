import React, { useState } from "react";
import ShortTextElement from "../../components/display-form/elements/ShortTextElement";
import LongTextElement from "../../components/display-form/elements/LongTextElement";
import { useRouter } from "next/router";
import Footer from '../../components/published/Footer'
import CheckboxElement from "../../components/display-form/elements/CheckboxElement";
import FileUploadElement from "../../components/display-form/elements/FileUploadElement";
import {FiSend} from "react-icons/fi"
import Link from "next/link";
import RatingElement from "../../components/display-form/elements/RatingElement";
import Swal from "sweetalert2";

const Published = ({ data }: any) => {
  console.log("Form data from Published", data);
  console.log("Form Heading: ", data[0].name);
  console.log("Form Data: ", data[0].Form_data);

  const [formData, setformData] = useState(data[0]?.Form_data || []);
  const [formHeading, setformHeading] = useState(data[0]?.name || "Form");

  const handleSubmit = async () => {
    console.log("Form Submitted");
  };

  return (
    <div className="bg-cover min-h-screen flex flex-col bg-background">
      <div className="fixed top-[4%] right-[4%]">
      <button className="relative w-fit px-3 md:px-5 py-2 md:py-3 overflow-hidden font-medium text-lime-400 bg-transparent border border-lime-400 rounded-lg shadow-inner group delay-1000 absolute justify-end" data-aos="zoom-in-left">
          <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-lime-400 group-hover:w-full ease"></span>
          <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-lime-400 group-hover:w-full ease"></span>
          <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-lime-400 group-hover:h-full ease"></span>
          <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-lime-400 group-hover:h-full ease"></span>
          <span className="absolute inset-0 w-full h-full duration-300 delay-300 bg-lime-500 opacity-0 group-hover:opacity-100"></span>
          <span className='flex flex-row gap-1'>
          <span className="relative transition-colors duration-300 delay-200 group-hover:text-white font-bold text-lg md:text-lg ease px-1 font-oxygen">Submit</span>
          <FiSend className='group-hover:text-white relative transition-colors duration-300 delay-200 ease text-3xl md:text-2xl'/>
          </span>
          </button>
      </div>
      <div className="w-7/13 my-[4%] bg-violet-200 p-2 mx-auto ">
        <div className="text-3xl font-bold my-4 text-center outline-none  w-full ">
          {formHeading}
        </div>
        <form onSubmit={handleSubmit}>
          {formData.length > 0 &&
            formData.map((element, idx) => {
              if (element.type == "shorttext") {
                return (
                  <div key={idx} className="w- mx-auto my-4">
                    <ShortTextElement
                      question={element.question}
                      attributes={element.attributes}
                    />
                  </div>
                );
              } else if (element.type == "longtext") {
                return (
                  <div key={idx} className="w-10/11 mx-auto my-4">
                    <LongTextElement
                      question={element.question}
                      attributes={element.attributes}
                    />
                  </div>
                );
              } else if (element.type == "checkbox") {
                return (
                  <div key={idx} className="w-10/11 mx-auto my-4">
                    <CheckboxElement
                      question={element.question}
                      attributes={element.attributes}
                    />
                  </div>
                );
              } else if (element.type == "fileupload") {
                return (
                  <div key={idx} className="w-10/11 mx-auto my-4">
                    <FileUploadElement
                      question={element.question}
                      attributes={element.attributes}
                    />
                  </div>
                );
              } else if (element.type == "rating") {
                return (
                  <div key={idx} className="w-10/11 mx-auto my-4">
                    <RatingElement
                      question={element.question}
                      attributes={element.attributes}
                    />
                  </div>
                );
              }
            })}
        </form>
      </div>
      <Footer />
    </div>
  );
};

const fetchFormDataByID = async (formID: any) => {
  var endpoint = ``;
  if (process.env.NODE_ENV == "development") {
    endpoint = `http://localhost:3000/api/fetchFormbyID`;
  } else if (process.env.NODE_ENV == "production") {
    endpoint = `https://form-builder-demo.vercel.app/pages/api/fetchFormbyID`;
  }
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ formID: formID }),
  });

  const res = await response.json();
  //console.log('Data from fetchFormDataByID',data)
  return res.data;
};
export async function getServerSideProps(context: any) {
  console.log("Params id : ", context.params.id);
  let formID = context.params.id;
  const data = await fetchFormDataByID(formID);
  //  console.log('Data from getServerSideProps',data)
  return { props: { data: data } };
}

export default Published;
