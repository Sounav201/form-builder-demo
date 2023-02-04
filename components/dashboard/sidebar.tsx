import React from 'react';
import {useState} from 'react';
import { useRouter } from 'next/router';
import {isMobile} from 'react-device-detect';
// import FolderSharedIcon from '@material-ui/icons/FolderShared';
import {MdFolderShared} from 'react-icons/md';
// import AssignmentLateIcon from '@material-ui/icons/AssignmentLate';
import {MdAssignmentLate} from 'react-icons/md';
// import DraftsIcon from '@material-ui/icons/Drafts';
import {MdDrafts} from 'react-icons/md';
// import FavoriteIcon from '@material-ui/icons/Favorite';
import {AiFillHeart} from 'react-icons/ai';
// import ArchiveIcon from '@material-ui/icons/Archive';
import {IoMdArchive} from 'react-icons/io';
// import AllInclusiveIcon from '@material-ui/icons/AllInclusive';
import {MdOutlineAllInclusive} from 'react-icons/md';
// import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import {MdCreateNewFolder} from 'react-icons/md';
// import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
// import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import {MdOutlineArrowBackIos} from 'react-icons/md';
// import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
// import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import {MdArrowForward} from 'react-icons/md';
// import FingerprintIcon from '@material-ui/icons/Fingerprint';
import {FiCodesandbox} from 'react-icons/fi';
// import AddIcon from '@material-ui/icons/Add';
// import CreateIcon from '@material-ui/icons/Create';
// import AiFillFolderAdd from 'react-icons/ai';
// import ReceiptRoundedIcon from '@material-ui/icons/ReceiptRounded';

const Sidebar = ({ darkMode, setDarkMode }) => {
    const [open, setOpen] = useState(true);
    const router = useRouter();

    return (
        <div className={` h-auto bg-gray-900 dark:bg-gray-900 absolute md:relative md:duration-300 invisible md:visible shadow-2xl ${open ? " w-6/12 md:w-3/12  ":" w-1/11 md:w-1/13 "} `}>
            <div className=" border-b py-3 mt-1 flex justify-center ">
                <div className='inline-flex gap-1 md:gap-2'>
                    <FiCodesandbox  size="1.5em" className={`absolute text-rose-600 float-left ${!open && "justify-center" } relative`} />
                    <h1 className={ ` text-base md:text-xl text-rose-600 font-bold md:duration-300 origin-left ${!open && " hidden scale-0 " } `}>Dashboard</h1>
                </div>
                <MdOutlineArrowBackIos size="1.5em" className={`bg-gray-700/75 p-0.5 text-white rounded-full absolute -right-3 top-4 border md:duration-300 cursor-pointer ${ !open && "rotate-180" }`} onClick={() => setOpen(!open)} />
                {/* <KeyboardArrowRightIcon className={`bg-gray-700 text-white rounded-full absolute -right-3 top-3 border cursor-pointer ${open ? "invisible":"visible"}`} onClick={() => setOpen(!open)} /> */}
                {/* <p>|</p>
                <p className="text-red-500 font-semibold text-xl">My Forms</p> */}

            </div>
            <div className="p-1 md:p-3 space-y-14">
                <div className="space-y-4" >
                <div className="space-y-3 shadow-sm  border-solid pt-3 md:pt-4 " >
                    {/* <h1 className={`flex text-yellow-400 text-base md:text-lg justify-center font-semibold ${!open && "hidden"} `}>MY FORMS</h1> */}
                    <button className=" font-medium text-blue-400 border-2 border-blue-400 w-full  rounded-full hover:text-white group relative flex justify-center items-center overflow-hidden" onClick={() => {(isMobile) ? router.push('/mobileRedirect') : router.push('/builder')}}>
                        <span className="absolute left-0 w-full h-0 transition-all bg-blue-400 opacity-100 group-hover:h-full group-hover:top-0 duration-400 ease"></span>
                        <span className="absolute right-0 flex items-center w-40 md:w-20 h-10 duration-300 transform translate-x-full group-hover:translate-x-0"><MdArrowForward size="1.5em" /></span>
                        <span className={`relative py-1 text-xs md:text-lg font-monospace ${!open && "hidden"}`}>CREATE</span>
                        <span className={` relative pb-0.5 rounded-full text-xs md:text-lg ${open && "hidden"}`}><MdCreateNewFolder size="1.5em" /></span>
                    </button>
                    <div className="">
                        <div className={`flex p-1 md:p-3 text-gray-300  space-x-2 md:space-x-4 group hover:bg-blue-900 hover:text-white  cursor-pointer rounded-xl ${open ? "justify-start":"justify-center"} `}>
                            <MdOutlineAllInclusive size="1.5em" className=" group-hover:text-white text-gray-300 " />
                            <p className={` font-semibold text-sm md:text-base hover:text-white ${!open && "hidden"} `} >All Forms</p>
                        </div>
                    </div>
                    {/* <div className="">
                        <div className={`flex p-1 md:p-3 text-gray-300  space-x-2 md:space-x-4 hover:bg-blue-900 hover:text-white  cursor-pointer rounded-xl ${open ? "justify-start":"justify-center"} `}>
                            <CreateNewFolderIcon className="text-gray-300" />
                            <p className={` font-semibold text-sm md:text-base hover:text-white ${!open && "hidden"} `} >Create a new folder</p>
                        </div>
                    </div> */}

                </div>
                <hr className="w-full mt-1 mb-4 border-1 border-gray-400"></hr>
                    <div className="">
                        <div className={`flex p-1 md:p-3 text-gray-400  space-x-2 md:space-x-4 group hover:bg-blue-900 hover:text-white  cursor-pointer ${open ? "justify-start":"justify-center"} `}>
                            <MdFolderShared size="1.5em" className=" text-gray-300 group-hover:text-white" />
                            <p className={` text-sm md:text-base hover:text-white ${!open && "hidden"} `}  >SHARED WITH ME</p>
                        </div>
                    </div>
                    <div className="">
                        <div className={`flex p-1 md:p-3 text-gray-400  space-x-2 md:space-x-4 group hover:bg-blue-900 hover:text-white  cursor-pointer ${open ? "justify-start":"justify-center"} `}>
                            <MdAssignmentLate size="1.5em" className="text-gray-300 group-hover:text-white" />
                            <p className={` text-sm md:text-base hover:text-white ${!open && "hidden"} `} >ASSIGNED FORMS</p>
                        </div>
                    </div>
                    <div className="">
                        <div className={`flex p-1 md:p-3 text-gray-400  space-x-2 md:space-x-4 group hover:bg-blue-900 hover:text-white  cursor-pointer ${open ? "justify-start":"justify-center"} `}>
                            <MdDrafts size="1.5em" className="text-gray-300 group-hover:text-white" />
                            <p className={` text-sm md:text-base hover:text-white ${!open && "hidden"} `} >MY DRAFTS</p>
                        </div>
                    </div>
                    <div className="">
                        <div className={`flex p-1 md:p-3 text-gray-400  space-x-2 md:space-x-4 group hover:bg-blue-900 hover:text-white  cursor-pointer ${open ? "justify-start":"justify-center"} `}>
                            <AiFillHeart size="1.5em"  className="text-rose-700" />
                            <p className={` text-sm md:text-base hover:text-white ${!open && "hidden"} `} >Favourites</p>
                        </div>
                    </div>
                    <div className="">
                        <div className={`flex p-1 md:p-3 text-gray-400  space-x-2 md:space-x-4 group hover:bg-blue-900 hover:text-white  cursor-pointer ${open ? "justify-start":"justify-center"} `}>
                            <IoMdArchive size="1.5em" className="text-gray-300 group-hover:text-white" />
                            <p className={` text-sm md:text-base hover:text-white ${!open && "hidden"} `} >Archives</p>
                        </div>
                    </div>

                </div>
                
                {/* <div className="space-y-6" >
                    <h1 className="text-gray-400">taking    </h1>
                    <div className="">
                        <div className="flex p-3 text-gray-700  space-x-4 0 hover:bg-gray-50 hover:text-blue-600  cursor-pointer  ">
                            <LayersIcon className="text-gray-300" />
                            <p className="text-gray-600  " >Validate</p>
                        </div>
                    </div>


                </div> */}
            </div>

        </div>
    )
}

export default Sidebar
