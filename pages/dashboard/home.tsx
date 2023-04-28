import Head from 'next/head'
import Sidebar from '../../components/dashboard/sidebar'
import Container from '../../components/dashboard/Container'
import Header from '../../components/dashboard/Header'
import { useContext, useEffect, useState } from 'react';
import AppContext from '../../src/context/appContext';
import { useRouter } from 'next/router'
import Footer from '../../components/dashboard/Footer'


export default function Home() {
  const {user,setUser,createdForms, setCreatedForms} = useContext(AppContext);
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(true);
  const [formsLoading, setFormsLoading] = useState(true);
  useEffect(() => {
    if (user && user.length > 0) {
      console.log("User logged in" );
  
    } else if (typeof window != undefined && localStorage.getItem("form_builderuser")) {
      console.log("User logged in" );
      

    } else {
      router.push("/login");
    }
    
  }, []);

  useEffect(() => {
    async function fetchCreatedForms(user) {
      const response = await fetch('/api/fetchCreatedForms',{
        method:"POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user }),

      })
      if(response.status == 200)
      {
        const data = await response.json();
        console.log('Data from API : ', data?.data);
        
        setCreatedForms(data?.data);
  
      }
      setFormsLoading(false);
    }
    
    if(user && user.length>0)
    { console.log('Fetching created applications')
      fetchCreatedForms(user);
    }
  }, [user])
  

  return (
    <div className={` ${darkMode && "dark"} w-full h-full `}>
      <div className="flex w-full h-full bg-opacity-90 bg-lightbg dark:bg-my_bg_img" >
        <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} />
        <div className="w-full h-full dark:bg-gradient-to-tr dark:from-black/50 dark:to-gray-900/0  mb-5">
          <Header darkMode={darkMode} setDarkMode={setDarkMode}/>
          <Container darkMode={darkMode} setDarkMode={setDarkMode} formsLoading={formsLoading} />
        </div>
      </div>
      <div className="bg-black">
      <Footer />
      </div>
    </div>
  )
}
