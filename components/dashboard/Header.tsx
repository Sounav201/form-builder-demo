import React, { useContext } from 'react'
import {useState} from 'react';
import {isMobile} from 'react-device-detect';
import {IoMdCloseCircleOutline} from 'react-icons/io';
import {GiHamburgerMenu} from 'react-icons/gi';
import {RiDashboardFill} from 'react-icons/ri';
import {BsFillPersonFill} from 'react-icons/bs';
import {MdOutlineExitToApp} from 'react-icons/md';
import {MdArrowForward} from 'react-icons/md';
import {MdCreateNewFolder} from 'react-icons/md';
import {MdOutlineAllInclusive} from 'react-icons/md';
import {MdFolderShared} from 'react-icons/md';
import {MdAssignmentLate} from 'react-icons/md';
import {MdDrafts} from 'react-icons/md';
import {AiFillHeart} from 'react-icons/ai';
import {IoMdArchive} from 'react-icons/io';
import axios from 'axios';
import { useRouter } from 'next/router'
import AppContext from '../../src/context/appContext';
import { ChakraProvider, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormControl, FormLabel, FormHelperText, Input, Button, useDisclosure } from '@chakra-ui/react';
import { generateUUID } from '../../services/generateUUID';

function Topbar({minimize, setMinimize}) {
    const router = useRouter();
    const [formName, setFormName] = useState('');
    const modal = useDisclosure();
    const handleCreateClick = () => {
        console.log('Create click ') 
        if(isMobile) 
             router.push('/mobileredirect') 
        else{
            modal.onOpen();
        }
    }

    const handleModalClose = () => {
        const formAreaItems = [];
        const formHeading = formName;
        const formID = generateUUID();
        if(typeof window !== "undefined") {
            localStorage.setItem("formAreaItems", JSON.stringify(formAreaItems));
            localStorage.setItem("formHeading", JSON.stringify(formHeading));
            router.push(`/forms/${formID}`);
        }
    }

    return (
        <div className={` top-0 left-0 h-screen w-full bg-slate-900 dark:bg-gray-900 z-50 transform ${minimize ? "-translate-y-0 fixed" : "-translate-y-full absolute"} visible md:invisible transition-transform duration-700 ease-in-out filter  `}>
           
            <div className="flex flex-col justify-center items-center mt-12">
                <button className=" text-white border border-gray-400 hover:border-sky-500 dark:hover:border-indigo-700 w-11/12 rounded-full hover:text-sky-500 dark:hover:text-indigo-500 flex justify-center items-center gap-2"  onClick={handleCreateClick}>
                <span className={`text-lg my-3 font-bold`}>CREATE</span>
                {/* <MdArrowForward size="1.5em" /> */}
                <MdCreateNewFolder size="1.5em" />
                </button>
                <div className=" w-10/12 p-2 my-4 group hover:bg-sky-400/60 dark:hover:bg-indigo-900 flex justify-start rounded-md space-x-4 " >
                    <MdOutlineAllInclusive size="1.5em" className="group-hover:text-white text-gray-300 " />
                    <p className={` text-lg font-bold text-gray-400 group-hover:text-white `} >All Forms</p>
                </div>
                <hr className="w-10/12 mt-1 mb-4 border-1 border-gray-400"></hr>
                <div className=" w-10/12 p-2 my-1 group hover:bg-sky-400/60 dark:hover:bg-indigo-900 flex justify-start rounded-md space-x-4 ">
                    <MdFolderShared size="1.4em" className="group-hover:text-white text-gray-300" />
                    <p className={` text-base font-semibold text-gray-400 group-hover:text-white `}  >SHARED WITH ME</p>
                </div>
                <div className=" w-10/12 p-2 my-2 group hover:bg-sky-400/60 dark:hover:bg-indigo-900 flex justify-start rounded-md space-x-4 ">
                    <MdAssignmentLate size="1.4em" className="group-hover:text-white text-gray-300" />
                    <p className={` text-base font-semibold text-gray-400 group-hover:text-white `} >ASSIGNED FORMS</p>
                </div>
                <div className=" w-10/12 p-2 my-2 group hover:bg-sky-400/60 dark:hover:bg-indigo-900 flex justify-start rounded-md space-x-4 ">
                    <MdDrafts size="1.4em" className="group-hover:text-white text-gray-300" />
                    <p className={` text-base font-semibold text-gray-400 group-hover:text-white `} >MY DRAFTS</p>
                </div>
                <div className=" w-10/12 p-2 my-2 group hover:bg-sky-400/60 dark:hover:bg-indigo-900 flex justify-start rounded-md space-x-4 ">
                    <AiFillHeart size="1.4em"  className=" text-rose-700" />
                    <p className={` text-base font-semibold text-gray-400 group-hover:text-white `} >Favourites</p>
                </div>
                <div className=" w-10/12 p-2 my-2 group hover:bg-sky-400/60 dark:hover:bg-indigo-900 flex justify-start rounded-md space-x-4 ">
                    <IoMdArchive size="1.4em" className="group-hover:text-white text-gray-300" />
                    <p className={` text-base font-semibold text-gray-400 group-hover:text-white `} >Archives</p>
                </div>

               <IoMdCloseCircleOutline size="3em" className={`mt-24 text-white hover:scale-110`} onClick={() => setMinimize(!minimize)}/>
            </div>  
            <Modal isOpen={modal.isOpen} onClose={modal.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <ModalCloseButton />
          </ModalHeader>

          <ModalBody>
            <form
              id="new-note"
              onSubmit={(event) => {
                event.preventDefault();
                // console.log(formName)
                
              }}
            >
              <FormControl>
                <FormLabel>Create New Form</FormLabel>
                <Input type="text" placeholder='Enter Form Name' value={formName} onChange={({ target }) => setFormName(target?.value)} />
              </FormControl>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button type="submit" form="new-note" colorScheme={`whatsapp`} onClick={handleModalClose}>
              Continue
            </Button>
          </ModalFooter>
        </ModalContent>
            </Modal>

        </div>
    )
}

const Header = ({ darkMode, setDarkMode }) => {

    const router = useRouter();
    const {user,setUser} = useContext(AppContext);
    

    const handleLogout = async () => {
        console.log('Logout clicked!')
        
            const params = { key: "static_key" };

            const result = await axios.post("/api/auth/logout", params);
            if (result.status == 200) {
              router.push("/");
              localStorage.removeItem("form_buildertoken");
              localStorage.removeItem("form_builderuser");
              setUser("");
            }
          
        
    }
    const [open, setOpen] = useState(true);
    const [minimize, setMinimize] = useState(false);

    return (
        <div className="flex shadow-sm bg-slate-900/90 dark:bg-slate-900/50 px-4 md:px-8  justify-between items-center h-12 md:h-14 ">
            <Topbar minimize={minimize} setMinimize={setMinimize}/>
            <div className="flex space-x-4 ">
                <GiHamburgerMenu size="1.5em" className="cursor-pointer text-gray-300 visible md:invisible" onClick={() => setMinimize(!minimize)} />
                <img src="/fulltitle-nav.png" alt="" className="h-[1.25em] md:h-[1.5em] opacity-60"/>
            </div>
            <div className="flex gap-4 md:gap-6 text-gray-400 ">

                <BsFillPersonFill size="1.5em" className="cursor-pointer" />
                <MdOutlineExitToApp onClick={handleLogout} size="1.5em" color="secondary" className="cursor-pointer" />
                {/* <p className="text-white text-sm md:text-lg font-semibold cursor-pointer ">Close</p> */}
            </div>

        </div>
    )
}

export default Header
