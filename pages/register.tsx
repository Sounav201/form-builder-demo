import type { NextPage } from 'next'
import Head from 'next/head'
import { useContext, useState } from 'react'
import { useRouter } from 'next/router'
import AppContext from '../src/context/appContext'
import { text } from 'stream/consumers'
import {HiAtSymbol} from 'react-icons/hi'
import {BiShowAlt} from 'react-icons/bi'
import {BiHide} from 'react-icons/bi'
import Link from 'next/link'

export default function Register() {
  const router = useRouter();
  const {user,setUser} = useContext(AppContext);
  
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setpassword] = useState("")
 
  const handleRegister = async() => {
    console.log('Registration clicked!!!');
   // console.log('Creds : ', email,password);

    try {
      const response = await fetch('/api/auth/register' ,{
        method:"POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password,username}),

      })
      const data = await response.json();
      console.log('Data from API : ', data);
      if(data.message == "Registration Successful")
      {
        alert('Registered')
        
        router.push('/login');
      }
      else if(data.message =="already registered"){
        alert("already exists..try to login")
        router.push('/login');
      }

    } catch (error) {
      console.log('Error : ', error);
      setEmail("");
      setpassword("");
      setUsername("");
    }

  }
  return (
    <div className='bg-slate-900 h-full  '>
      <Head>
        <title>Form Builder Demo</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
 
<div className="m-auto container px-12 sm:px-0 mx-auto">
  <div className="mx-auto  md:w-10/12 lg:w-6/12">
    <div className="m-auto  py-12 sm:p-20 xl:w-10/12">
      <div className="space-y-4">
        <a href="">
          <h2 className='text-center md:text-6xl text-4xl font-bold text-white'>Form Builder</h2>
        </a>
    <div>
    <div className="mt-12 rounded-3xl border bg-background/70 dark:border-gray-700 dark:bg-gray-800 -mx-6 sm:-mx-10 p-8 sm:p-10">
      <div className=' mb-4 mx-auto '>
        <p className='md:text-xl text-white text-center '>Sign Up / Register Now</p>
      </div>
      
      <hr className='mt-6 border-b-1 border-gray-400' />
      
      <form action="" className="mt-10 space-y-8 text-white dark:text-white">
        <div>
          <div className="relative before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-sky-400 dark:before:bg-sky-800 focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300">
            <input value={username} onChange={(e)=> setUsername(e.target.value)} id="" type="text" placeholder="Username" className="w-full bg-transparent pb-3  border-b border-gray-300 dark:placeholder-gray-300 dark:border-gray-600 outline-none  invalid:border-red-400 transition" />
          </div>
        </div>

        <div>
          <div className="relative before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-sky-400 dark:before:bg-sky-800 focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300 flex flex-row">
            <input value={email} onChange={(e)=> setEmail(e.target.value)} id="" type="email" placeholder="Email" className="w-full bg-transparent pb-3  border-b border-gray-300 dark:placeholder-gray-300 dark:border-gray-600 outline-none  invalid:border-red-400 transition" />
            {/* <span className='icon flex items-center px-4'><HiAtSymbol/></span> */}
          </div>
        </div>


        <div className="flex flex-col items-end">
          <div className="w-full relative before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-sky-400 dark:before:bg-sky-800 focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300 flex flex-row">
            <input value={password} onChange={(e) => setpassword(e.target.value) } id="" type="password" placeholder="Password" className="w-full bg-transparent pb-3  border-b border-gray-300 dark:placeholder-gray-300 dark:border-gray-600 outline-none  invalid:border-red-400 transition" />
            {/* <span className='icon flex items-center px-4'><BiShowAlt/></span>
            <span className='icon flex items-center px-4'><BiHide/></span> */}
          </div>
        </div>
        {/* <div className="flex flex-col items-end">
          <div className="w-full relative before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-sky-400 dark:before:bg-sky-800 focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300">
            <input value={password} onChange={(e) => setpassword(e.target.value) } id="" type="password" placeholder="Confirm Password" className="w-full bg-transparent pb-3  border-b border-gray-300 dark:placeholder-gray-300 dark:border-gray-600 outline-none  invalid:border-red-400 transition" />
          </div>
        </div> */}

        <div>
          <button onClick={handleRegister} type="button"
            className="w-full rounded-full bg-sky-500 dark:bg-sky-400 h-11 flex items-center justify-center px-6 py-3 transition hover:bg-sky-600 focus:bg-sky-600 active:bg-sky-800"
          >
            <span className="text-base font-semibold text-white dark:text-gray-900">Register</span>
          </button>
          <div className='flex justify-between'>
            <span className='text-sm tracking-wide text-gray-400 dark:text-sky-400 w-max p-3'>Already have an account?</span>
            <Link href={'/login'}><button  type="reset" className="-ml-3 w-max p-2" >
              <span className="text-base tracking-wide text-sky-600 dark:text-sky-400 hover:text-white">Sign In</span>
            </button></Link>
          </div>
        </div>
      </form>
    </div>
      <div className="border-t pt-12 text-gray-500 dark:border-gray-800">
        <div className="space-x-4 text-center">
          <span>&copy; Form Builder</span>
          <a href="#" className="text-sm hover:text-sky-900 dark:hover:text-gray-300">Contact</a>
          <a href="#" className="text-sm hover:text-sky-900 dark:hover:text-gray-300">Privacy & Terms</a>
        </div>
      </div>
    </div>
    </div>
    </div>
  </div>
</div>
                                   
    </div>
  )
}