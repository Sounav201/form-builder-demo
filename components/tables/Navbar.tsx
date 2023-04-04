import React from "react";
import { MdArrowForward } from "react-icons/md";
import Link from "next/link";
import useClipboard from "react-use-clipboard";
import { useRouter } from "next/router";
import { FaShare } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import { AiOutlineCopy } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { BsBoxArrowUpRight } from "react-icons/bs";
import { ChakraProvider, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormControl, FormLabel, FormHelperText, Input, Button, useDisclosure } from '@chakra-ui/react';

const Navbar = ({ formID }: any) => {
  //   localStorage.setItem("formHeading", JSON.stringify(form.name));
  const { isOpen, onClose, onOpen } = useDisclosure();
  const handleModalClose = () => onClose();
  const router = useRouter();
  const [isCopied, setCopied] = useClipboard(
    "https://form-builder-demo.vercel.app/published/" + formID,
    {
      successDuration: 10000,
    }
  );

  const handleRedirect = () => {
    router.push('/published/' + formID);
  }
  return (
    <>
      <div className="flex flex-row justify-between bg-zinc-800  py-3 md:py-4 px-4  md:px-8">
      <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>
                <ModalCloseButton />
              </ModalHeader>

              <ModalBody>
                <div className="flex flex-col gap-4 md:gap-8">
                  <span className="flex text-xl md:text-3xl font-alegreya font-bold text-slate-600">
                    Let&apos;s share your forms with others.
                  </span>
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
                  onClick={onClose}
                >
                  Continue
                </button>
              </ModalFooter>
            </ModalContent>
          </Modal>
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
          <span className="flex text-metagold justify-between font-bold font-alegreya text-md md:text-xl">
            {formID}
          </span>
        </div>
        <div className="flex flex-row gap-3 md:gap-6">
          <button className="text-md text-white bg-lime-500 hover:bg-lime-600 flex flex-row gap-2 px-3 md:px-4 py-2 md:py-2 justify-center items-center rounded-full" onClick={onOpen}>
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

export async function getServerSideProps(context: any) {
  console.log("Params id : ", context.params.id);
  return { props: { formID: context.params.id } };
}

export default Navbar;
