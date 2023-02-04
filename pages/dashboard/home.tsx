import Head from 'next/head'
import Sidebar from '../../components/dashboard/sidebar'
import Container from '../../components/dashboard/Container'
import Header from '../../components/dashboard/Header'
import { useContext, useEffect, useState } from 'react';
import AppContext from '../../src/context/appContext';
import { useRouter } from 'next/router'


export default function Home() {
  const {user,setUser} = useContext(AppContext);
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(true)
  useEffect(() => {
    if (user && user.length > 0) {
      console.log("User logged in");
    
    } else if (typeof window != undefined && localStorage.getItem("user")) {
      console.log("User logged in");
    

    } else {
      router.push("/");
    }
  }, []);

  return (
    <div className={` ${darkMode && "dark"} w-full h-full `}>
      <div className="flex w-full h-full bg-opacity-90 bg-bglite dark:bg-my_bg_img" >
        <Sidebar darkMode={darkMode} setDarkMode={setDarkMode}/>
        <div className="w-full h-full dark:bg-gradient-to-tr dark:from-black/50 dark:to-gray-900/0  ">
          <Header darkMode={darkMode} setDarkMode={setDarkMode}/>
          <Container darkMode={darkMode} setDarkMode={setDarkMode}/>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  )
}
