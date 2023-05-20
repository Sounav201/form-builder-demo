import React, { useState, useEffect ,useRef} from "react";
import ShortTextElement from "../../components/display-form/elements/ShortTextElement";
import LongTextElement from "../../components/display-form/elements/LongTextElement";
import { Router, useRouter } from "next/router";
import CheckboxElement from "../../components/display-form/elements/CheckboxElement";
import FileUploadElement from "../../components/display-form/elements/FileUploadElement";
import Link from "next/link";
import RatingElement from "../../components/display-form/elements/RatingElement";
import Swal from "sweetalert2";
import { FiSend } from "react-icons/fi";
import Footer from "../../components/published/Footer";


export async function getServerSideProps(context: any) {
  console.log("Params id : ", context.params.id);
  let formID = context.params.id;
  console.log("Form ID ", formID);
  return { props: { formID: formID } };
}

const Published = ({ formID }: any) => {
  const formRef = useRef(null);
  const [formData, setformData] = useState([]);
  const [formHeading, setformHeading] = useState("Form");
  const [formBackground,setformBackground] = useState(null);
  const [formPublished,setformPublished] = useState(false);
  const [user,setuser] = useState("")
  const router = useRouter();
  async function fetchData(formID) {
    const res = await fetch("/api/fetchFormbyID", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ formID: formID }),
    });
    if (res.status == 200) {
      const resData = await res.json();
      const data = resData.data;
      console.log("received data: ", data);
      if(data[0]?.published )
        {
          setformPublished(true)
        }
      setuser(data[0]?.user_id)
      
      setformBackground(data[0]?.formBackground )
      setformData(data[0]?.Form_data );
      setformHeading(data[0]?.name || "Form");
    }
  }
 

  useEffect(() => {
    let isMounted = true; 
    if (formData.length == 0) {
      fetchData(formID);
    }
    return () => {
      // Cleanup function: set the flag to false when the component unmounts
      isMounted = false;
    };
  }, [formID]);



  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(e.target);
    const form = formRef.current;
    const inputs = form.querySelectorAll('input , textarea');
    const formIDDict = {};
    inputs.forEach(input => {
      if (input.type == 'checkbox' && !input.checked) {
        // ignore unchecked checkboxes
        return;
      }
      formIDDict[input.name] = input.id;
    });
    //console.log(formIDDict);
    
    const formData = new FormData(e.target);
    const formValues = Object.fromEntries(formData.entries());
    console.log("Form Submitted", formValues);
    
    const formArray = Object.entries(formValues).map(([question, answer]) => ({
      question,
      answer,
      questionID: formIDDict[question],
    }));
    
    console.log("Form Array", formArray);
    
    
    const responseID = Math.random().toString(36).substring(2, 7)
    let timestamp = new Date().getTime();
   // console.log('Timestamp : ',timestamp)
    const date = new Date(timestamp);
    const dateString = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2) + ' ' + 
                   ('0' + date.getHours()).slice(-2) + ':' + 
                   ('0' + date.getMinutes()).slice(-2) + ':' + 
                   ('0' + date.getSeconds()).slice(-2) ;
    console.log(dateString);
    const dataToSend = {
      formID: formID,
      user: user,
      responseID: responseID,
      responseData: formArray,
      created_at: dateString,
    }
    
    try {
      const res = await fetch("/api/submitForm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      })
      if(res.status == 200)
      {
        Swal.fire(
          {
            title: 'Form Submitted',
            text: 'Thank you for submitting the form',
            icon: 'success',
          }
        )
        router.push('/thank-you')
      }
    } catch (error) {
      
    }
    //   console.log('Form : ',e.target)
    //    console.log('Form values : ', e.target[0].values);
  };

  

  if (formData.length == 0)
    return (
      <div className="h-screen bg-black flex items-center justify-center text-center">
        <h1 className="text-3xl font-medium font-oxygen text-white">
          Loading...
        </h1>
      </div>
    );
  
  if(!formPublished)
  return(
    <div className="h-screen bg-black flex  flex-col gap-2 items-center justify-center text-center">
    <h1 className="text-3xl font-medium font-oxygen text-white">
      This form has not been published!
    </h1>
      <h3 className="text-white font-oxygen text-xl">Please contact the administrator</h3>
  </div>

  )
  return (
    <div 
    style={ formBackground  ? {
      backgroundImage: `url(${formBackground})`,
      backgroundRepeat: "no-repeat",
      backgroundAttachment: "fixed",
      backgroundPosition: "center",
      backgroundSize: "cover",
      overflow: "hidden",
    }: {overflow:'hidden'}}
    className="bg-cover min-h-screen flex flex-col bg-cetacean/20 md:bg-background">
      
      <div className="my-2  md:mx-72 md:my-16 bg-cover bg-white md:bg-violet-200 px-6 py-2 md:py-8 mx-auto shadow-sm shadow-slate-600">
        <div className="text-2xl md:text-3xl font-bold  text-center outline-none  w-full py-4 md:py-6">
          {formHeading}
        </div>
        <hr className="w-full border-1 border-slate-300"></hr>
        <form onSubmit={handleSubmit} ref={formRef}>
          {formData.length > 0 &&
            formData.map((element, idx) => {
              if (element.type == "shorttext") {
                return (
                  <div key={idx} className="w-10/11 mx-auto my-4">
                    <ShortTextElement
                      question={element.question}
                      attributes={element.attributes}
                      id={element.id}
                    />
                  </div>
                );
              } else if (element.type == "longtext") {
                return (
                  <div key={idx} className="w-10/11 mx-auto my-4">
                    <LongTextElement
                      question={element.question}
                      attributes={element.attributes}
                      id={element.id}
                    />
                  </div>
                );
              } else if (element.type == "checkbox") {
                return (
                  <div key={idx} className="w-10/11 mx-auto my-4">
                    <CheckboxElement
                      question={element.question}
                      attributes={element.attributes}
                      id={element.id}
                    />
                  </div>
                );
              } else if (element.type == "fileupload") {
                return (
                  <div key={idx} className="w-10/11 mx-auto my-4">
                    <FileUploadElement
                      question={element.question}
                      attributes={element.attributes}
                      id={element.id}
                    />
                  </div>
                );
              } else if (element.type == "rating") {
                return (
                  <div key={idx} className="w-10/11 mx-auto my-4">
                    <RatingElement
                      question={element.question}
                      attributes={element.attributes}
                      id={element.id}
                    />
                  </div>
                );
              }
            })}
            <div className="fixed top-[2%] right-[2%] md:top-[4%] md:right-[4%] hidden md:flex">
        <button
          type="submit"
          className="relative w-fit px-3 md:px-5 py-2 md:py-3 overflow-hidden font-medium text-lime-400 bg-transparent border border-lime-400 rounded-lg shadow-inner group delay-1000  justify-end fixed top-[2%] right-[2%] md:top-[4%] md:right-[4%] hidden md:flex"
          
        >
          <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-lime-400 group-hover:w-full ease"></span>
          <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-lime-400 group-hover:w-full ease"></span>
          <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-lime-400 group-hover:h-full ease"></span>
          <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-lime-400 group-hover:h-full ease"></span>
          <span className="absolute inset-0 w-full h-full duration-300 delay-300 bg-lime-500 opacity-0 group-hover:opacity-100"></span>
          <span className="flex flex-row gap-1">
            <span className="relative transition-colors duration-300 delay-200 group-hover:text-white font-bold text-base  md:text-lg ease font-oxygen">
              Submit
            </span>
            <FiSend className="group-hover:text-white relative transition-colors duration-300 delay-200 ease text-2xl md:text-2xl" />
          </span>
        </button>
      </div>
          <div className="flex w-full justify-center md:hidden">
            <button
              type="submit"
              className=" font-medium mt-4 mb-2 rounded-md flex bg-lime-500 hover:bg-lime-600 hover:shadow shadow-slate-800"
            >
              <span className="flex flex-row gap-3 items-center py-3 px-10">
                <span
                  className={` text-xl font-alegreya font-semibold text-white`}
                >
                  Submit
                </span>
                <FiSend className=" text-2xl text-white" />
              </span>
            </button>
          </div>
        </form>
        <hr className="w-full border-1 border-slate-300 md:hidden"></hr>
      </div>
      <Footer />
    </div>
  );
};

export default Published;
