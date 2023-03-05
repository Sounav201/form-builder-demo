import React from 'react'
import {MdArrowForward} from 'react-icons/md';
import Link from 'next/link'
import { useRouter } from 'next/router'

const Footer = () => {
  const router = useRouter();
  return (
    <>
    <div className='flex flex-row justify-between bg-cetacean/40 text-slate-400 py-2 md:py-2 px-1 md:px-4'>
        <div className='flex items-center ml-2 md:ml-0'>
            <img src="/fulltitle-nav.png" alt="" className='h-[1.25em] md:h-[1.5em] opacity-40'/>
        </div>
        <div className='flex flex-row gap-2'>
            <p className='flex items-center font-medium font-alegreya hidden lg:flex'>It&apos;s free!</p>
            <Link href="/dashboard/home">
                <button className=" font-medium text-lime-400 border border-lime-400 rounded-full hover:text-white group relative flex justify-center items-center overflow-hidden" >
                <span className="absolute left-0 w-full h-0 transition-all bg-lime-500 opacity-100 group-hover:h-full group-hover:top-0 duration-400 ease"></span>
                {/* <span className="absolute right-0 flex items-center h-10 duration-300 transform translate-x-full group-hover:translate-x-0"><MdArrowForward size="1.5em" /></span> */}
                <span className={`relative py-2 px-5 text-sm md:text-lg font-alegreya font-medium`}>Create your own form now</span>
                        
            </button>
            
            </Link>
        </div>
    </div>
    </>    
  )
}

export default Footer