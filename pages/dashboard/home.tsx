import Head from 'next/head'
import Sidebar from '../../components/dashboard/sidebar'
import Container from '../../components/dashboard/Container'
import Header from '../../components/dashboard/Header'
import { useContext, useEffect } from 'react';
import AppContext from '../../src/context/appContext';
import { useRouter } from 'next/router'


export default function Home() {
  const {user,setUser} = useContext(AppContext);
  const router = useRouter();

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
    <div className="w-full h-full">
      <div className="flex w-full h-full bg-my_bg_img" >
        <Sidebar />
        <div className="w-full h-full bg-gradient-to-tr from-black/50 to-gray-900/0  ">
          <Header />
          <Container />
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  )
}
