import React, { useState, useEffect, useContext } from "react";
import useClipboard from "react-use-clipboard";
import ShortTextElement from "../../components/display-form/elements/ShortTextElement";
import LongTextElement from "../../components/display-form/elements/LongTextElement";
import { useRouter } from "next/router";
import { AiOutlineCopy } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { BsBoxArrowUpRight } from "react-icons/bs";
import {RiArrowGoBackLine} from "react-icons/ri";
import CheckboxElement from "../../components/display-form/elements/CheckboxElement";
import FileUploadElement from "../../components/display-form/elements/FileUploadElement";
import DatePickerElement from "../../components/display-form/elements/DatePickerElement";
import Link from "next/link";
import RatingElement from "../../components/display-form/elements/RatingElement";
import Swal from "sweetalert2";
import Qrcode from '../../components/QRcode';
import {
  ChakraProvider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import AppContext from "../../src/context/appContext";

const Preview = ({ formID }: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const [onOpen, setonOpen] = useState(false);
  const [swalert, setSwalert] = useState(false);
  const handleModalClose = () => onClose();
  const router = useRouter();
  const { user } = useContext(AppContext);
  const [dummyHeading, setdummyHeading] = useState("Untitled Form");
  const [backgroundImage,setbackgroundImage]=useState(null);
  const [form, setform] = useState([]);
  const [copyText, setCopyText] = useState("");
  const handleCopy = () => {
    navigator.clipboard.writeText(copyText);
    alert("Copied");
  };

  useEffect(() => {
    if (user && user.length > 0) {
      console.log("User logged in");
    } else if (
      typeof window != undefined &&
      localStorage.getItem("form_builderuser")
    ) {
      console.log("User logged in");
    } else {
      router.push("/login");
    }
  }, []);

  useEffect(() => {
    if (typeof window != undefined) {
      if (localStorage.getItem("formAreaItems")) {
        //console.log('Getter runs!');
        setform(JSON.parse(localStorage.getItem("formAreaItems")));
      }
      if (localStorage.getItem("formHeading")) {
        setdummyHeading(JSON.parse(localStorage.getItem("formHeading")));
      }
      if(localStorage.getItem("formBackground"))
      {
        setbackgroundImage(JSON.parse(localStorage.getItem("formBackground")));
      }
    }
  }, []);

  const handlePublish = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to publish this form?",
      icon: "warning",
      showDenyButton: true,
      showConfirmButton: true,
      confirmButtonText: `Yes`,
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        const dataToSend = {
          formHeading: dummyHeading,
          formData: form,
          formID: formID,
          user: user,
        };
        //Need to show preloader here while publishing the form
        console.log("Data to send", dataToSend);
        fetch("/api/generateForm", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        }).then((res) => {
          if (res.status == 200) {
            // Swal.fire("Hurrah! Your form has been published", "", "success");

            // console.log("modal open");
            // router.push('/published/' + formID)
            setSwalert(true);
            // setonOpen(true);
          }
        });
      }
    });
  };

  const handleReturn = () => {
    router.back();
  };

  const handleCloseClick = () => {
    setSwalert(false);
  };

  // const copyText = async () => {
  //   try {
  //     await navigator.clipboard.writeText(link)
  //     isCopied = true
  //     setTimeout(() => {
  //       isCopied = false}, 1500)

  //   } catch (e) {
  //     console.error('e', e)
  //   }
  // }
  const [isCopied, setCopied] = useClipboard(
    "https://form-builder-demo.vercel.app/published/" + formID,
    {
      successDuration: 10000,
    }
  );

  const handleRedirect = () => {
    router.push('/published/' + formID);
  }
  const url="https://form-builder-demo.vercel.app/published/" + formID;
  return (
    <>
      <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        // position: 'sticky',
        // width: '100%',
        // height: '100%',
        // minHeight: '100vh',
        // minWidth: '100vw',
        backgroundPosition: "center",
        backgroundSize: "cover",
        overflow: "hidden",
      }}
       className=" bg-cover min-h-screen flex flex-col bg-background ">
        <div className="">
          <Modal isOpen={swalert} onClose={handleCloseClick}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>
                <ModalCloseButton />
              </ModalHeader>

              <ModalBody>
                <div className="flex flex-col gap-4 md:gap-8">
                  <span className="flex text-xl md:text-3xl font-alegreya font-bold text-slate-600">
                    Hurrah! Your form has been published .
                  </span>
                  <div>
                    <Qrcode url={url}/>
                    
                  </div>
                  <div className="flex flex-col gap-4 ">
                    <div className="flex flex-row gap-2 md:gap-2">
                      
                      <span className="flex overflow-x-scroll scrollbar-thin scrollbar-rounded rounded-sm p-1 scrollbar-thumb-slate-300 hover:scrollbar-thumb-slate-400 text-sm border border-slate-300 whitespace-nowrap text-slate-500">
                        form-builder-demo.vercel.app/published/{formID}
                      </span>
                      <span className="flex text-xl font-bold hover:font-extrabold hover:scale-105 justify-center items-center cursor-pointer" onClick={handleRedirect}><BsBoxArrowUpRight /></span>
                    </div>

                    <span className="flex">
                      <button
                        onClick={setCopied}
                        className="bg-lime-500 py-2 px-4 rounded-lg"
                      >
                        {isCopied ? (
                          <div className="flex flex-row gap-1">
                            <span className="flex text-base md:text-lg font-medium font-alegreya text-white">
                              Copied!
                            </span>
                            <span className="flex text-2xl text-white font-semibold">
                              <MdDone />
                            </span>
                          </div>
                        ) : (
                          <div className="flex flex-row gap-1.5">
                            <span className="flex text-lg font-medium font-alegreya font-medium text-white">
                              Copy
                            </span>
                            <span className="flex text-2xl md:text-2xl text-white font-semibold">
                              <AiOutlineCopy />
                            </span>
                          </div>
                        )}
                      </button>
                    </span>
                  </div>
                </div>
              </ModalBody>

              <ModalFooter>
                <button
                  // type="submit"
                  // form="new-note"
                  // colorScheme={`twitter`}
                  className="bg-lime-500 py-2 px-4 rounded-lg text-lg font-medium font-alegreya text-white shadow-sm shadow-slate-400 hover:shadow-none"
                  onClick={handleCloseClick}
                >
                  Continue
                </button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </div>

        <div className="bg-transparent fixed left-8 top-6">
          <button
            onClick={handleReturn}
            className="flex flex-row gap-2 relative border-2 border-violet-800 py-2.5 px-5 font-medium uppercase text-violet-500 transition-colors before:absolute before:left-0 before:top-0 before:-z-10 before:h-full before:w-full before:origin-top-left before:scale-x-0 before:bg-gradient-to-r from-violet-900  to-blue-600 before:transition-transform before:duration-300 before:content-[''] hover:text-white hover:border-violet-800 before:hover:scale-x-100"
          >
            Return
            <RiArrowGoBackLine size='1.5em' />
          </button>
        </div>
        <div className="flex flex-col bg-none fixed right-8 top-6 gap-52 z-20">
          <button
            onClick={handlePublish}
            className="relative border-2 border-violet-800 py-2.5 px-5 font-medium uppercase text-violet-500 transition-colors before:absolute before:left-0 before:top-0 before:-z-10 before:h-full before:w-full before:origin-top-left before:scale-x-0 before:bg-gradient-to-r from-violet-900  to-blue-600 before:transition-transform before:duration-300 before:content-[''] hover:text-white hover:border-violet-800 before:hover:scale-x-100"
          >
            Publish
          </button>
          <div className={` `}></div>
        </div>

        <div className="w-7/13 my-4 bg-cover bg-violet-100 p-2 mx-2 mt-20 md:mt-none md:mx-auto px-4 md:px-none">
          <div className="text-2xl md:text-3xl font-bold my-4 text-center outline-none  w-full ">
            {dummyHeading}
          </div>
          {form.length > 0 &&
            form.map((element, idx) => {
              if (element.type == "shorttext") {
                return (
                  <div key={idx} className="w-10/11 mx-auto my-4">
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
              } else if (element.type == "datepicker") {
                return (
                  <div key={idx} className="w-10/11 mx-auto my-4">
                    <DatePickerElement 
                      question={element.question}
                      attributes={element.attributes}
                    />
                  </div>
                );
              }
            })}
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(context: any) {
  console.log("Params id : ", context.params.id);
  return { props: { formID: context.params.id } };
}

export default Preview;
