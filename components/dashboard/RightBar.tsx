import  React, { useContext, useState } from 'react';
import AppContext from '../../src/context/appContext';
import { useEffect } from 'react';
import { useRouter } from "next/router";
import {BiLinkAlt} from 'react-icons/bi';
import useClipboard from "react-use-clipboard";
import { BsBoxArrowUpRight } from "react-icons/bs";
import { AiOutlineCopy } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { ChakraProvider, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormControl, FormLabel, FormHelperText, Input, Button, useDisclosure } from '@chakra-ui/react';
import Qrcode from '../../components/QRcode';
import AOS from "aos";
import "aos/dist/aos.css"
// import { Doughnut } from 'react-chartjs-2';

const data = {
    labels: [

    ],
    datasets: [{
        data: [10, 100],
        // backgroundColor: [
        //     ' rgba(67, 56, 202)',
        //     'rgba(229, 231, 235)',

        // ],
        hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',

        ]
    }]
};


const RightBar = ({ darkMode, setDarkMode, formsLoading}) => {
    const { isOpen, onClose, onOpen } = useDisclosure();
    const [formID,setformID] = useState(null);
    const {user,setUser,createdForms, setCreatedForms} = useContext(AppContext);
    useEffect(() => {
        AOS.init({
            disable: function () {
                var maxWidth = 768
                return window.innerWidth < maxWidth
            },
            duration: 800,
        })
    }, [])
    const [isCopied, setCopied] = useClipboard(
        "https://form-builder-demo.vercel.app/published/" + formID ,
        {
            successDuration: 10000,
        }
        );
        useEffect(() => {
            console.log('Created forms in Rightbar :', createdForms);
        }, [createdForms]);
        
        
        const handleRedirect = () => {
            // console.log(form);
            router.push(`/published/${formID}`);
            
        }
        const router = useRouter();
        const handleShareModalOpen =  (ID) => {
            setformID(ID);
            onOpen();
        }
        const handleModalClose = () => onClose();
        return (
            <>
        <div className=" bg-cetacean/60 md:bg-cetacean/60 dark:bg-slate-900/50 shadow-sm w-full rounded-xl " data-aos="zoom-in-up">
            <div className=" p-2 md:p-3 border-gray-100">
                <div className='flex flex-row gap-4'>
                  <span className="font-semibold text-white font-spacemono text-lg md:text-xl ">
                    Published forms
                  </span>
                  <span className="flex items-center justify-center font-semibold text-red-600 font-spacemono text-base md:text-lg animate-pulse">
                  🔴LIVE
                  </span>
                </div>

                {!formsLoading ?
                ( 
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 justify-between cursor-pointer mt-4">
                 {createdForms?.length == 0?
                 (<><div ><p className='text-white text-lg text-center transition cursor-pointer'>No published forms found</p></div></>)
                 :
                 
                 (<>
                
                {createdForms.map((form,idx) => 
                {
                    if(form.published)
                    return(
                    <div key={form.Formid} className=" rounded-xl group hover:scale-105 duration-500">
                        <div  className=" w-full h-32 md:h-48 flex flex-col items-center justify-between dark:bg-cyan-900/20  dark:bg-none rounded-xl bg-bglite">   
                            <div className="flex flex-row justify-between py-2 px-2 md:px-4 w-full invisible group-hover:visible">
                            <div className=" w-auto h-auto md:w-10  md:h-10 flex items-center justify-center text-rose-700 dark:text-white hover:text-white dark:hover:text-background  font-bold  border-rose-700 dark:border-white hover:border-rose-700 dark:hover:border-primary/90 rounded-full p-1 md:p-0.5 m-1 ">
                                {/* <FiDownload className="text-base md:text-xl"/> */}
                            </div>
                            <div className=" w-auto h-auto md:w-10  md:h-10 flex items-center justify-center text-rose-700 dark:text-white hover:text-white dark:hover:text-background border border-rose-700 dark:border-white hover:border-rose-700 dark:hover:border-primary/90 hover:bg-rose-700 dark:hover:bg-primary/90 font-bold rounded-full p-1 md:p-0.5 m-1 "  onClick={() => handleShareModalOpen(form.Formid)}>
                                <BiLinkAlt className="text-sm md:text-2xl"/>
                            {/* <BsBoxArrowUpRight className="text-sm md:text-lg"/> */}
                            </div>
                            </div>
                            
                            <p className='text-center font-semibold text-rose-700 hover:text-rose-800 dark:text-gray-400 dark:group-hover:text-white md:text-xl text-lg font-fredericka'>{form.name}</p> 

                            <div className="w-full flex justify-between py-2 px-2 md:px-4 invisible ">
                            <div className=" w-auto h-auto md:w-10  md:h-10 flex items-center justify-center text-rose-700 dark:text-white hover:text-white dark:hover:text-background border border-rose-700 dark:border-white hover:border-rose-700 dark:hover:border-primary/90 hover:bg-rose-700 dark:hover:bg-primary/90 rounded-full p-1 md:p-0.5 m-1 font-bold">
                                {/* <BsTable className="text-md md:text-xl" onClick={() => handleresponses(form)}/> */}
                            </div>
                            <div className=" w-auto h-auto md:w-10  md:h-10 flex items-center justify-center text-rose-700 dark:text-white hover:text-white dark:hover:text-background border border-rose-700 dark:border-white hover:border-rose-700 dark:hover:border-primary/90 hover:bg-rose-700 dark:hover:bg-primary/90 rounded-full p-1 md:p-0.5 m-1 font-bold">
                                {/* <MdDelete className="text-lg md:text-xl" onClick={() => handleDelete(form.Formid)}/> */}
                            </div>   
                            </div>               
                        </div>
                        {/* <div className=" w-full h-32 md:h-48 flex items-center justify-center  bg-pink-200 rounded-xl  ">   
                        </div>
                        <div className=" w-full h-32 md:h-48 flex items-center justify-center  bg-yellow-200 rounded-xl ">   
                        </div> */}
                    </div>
                    )

                }
                )}  
                 
                 
                 </>)}
                               
                </div>):
                
                (<div >
                    <p className='text-yellow-400 text-lg text-center transition animate-pulse '>Loading your forms ...</p>
                </div>)}
            </div>
        </div>
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>
                <ModalCloseButton />
              </ModalHeader>

              <ModalBody>
                <div className="flex flex-col gap-4 md:gap-8">
                  <span className="flex text-xl md:text-3xl font-alegreya font-bold text-slate-600">
                    Share your form link with others.
                  </span>
                  <div>
                    <Qrcode url={`https://form-builder-demo.vercel.app/published/${formID}`}/>
                    
                  </div>
                  <div className="flex flex-col gap-4 ">
                    <div className="flex flex-row gap-2 md:gap-2">
                      
                      <span className="flex overflow-x-scroll scrollbar-thin scrollbar-rounded rounded-sm p-1 scrollbar-thumb-slate-300 hover:scrollbar-thumb-slate-400 text-sm border border-slate-300 whitespace-nowrap text-slate-500">
                        form-builder-demo.vercel.app/published/{formID}
                      </span>
                      <span className="flex text-xl font-bold hover:font-extrabold hover:scale-105 justify-center items-center cursor-pointer" onClick ={()=> handleRedirect()}><BsBoxArrowUpRight /></span>
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
                  onClick={handleModalClose}
                >
                  Continue
                </button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
    )
}
export async function getServerSideProps(context: any) {
    console.log("Params id : ", context.params.id);
    return { props: { formID: context.params.id } };
  }

export default RightBar
