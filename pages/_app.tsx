import { ChakraProvider } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'
import { createBreakpoints } from '@chakra-ui/theme-tools'
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useState,useEffect } from 'react';
import AppContext from '../src/context/appContext';
import "@fontsource/inter";
import "@fontsource/roboto";
import "@fontsource/montserrat"
import "@fontsource/courier-prime"
import "@fontsource/spartan"
import "@fontsource/biryani"
import "@fontsource/poppins"



const breakpoints = createBreakpoints({
  sm: '30em',
  md: '48em',
  lg: '62em',
  xl: '80em',
  '2xl': '96em',
})

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  colors: {
    primary: '#1a365d',
    purple: '#765FAF',
    700: '#2a69ac',
    secondary:'#ec6f66'
  },
}

const theme = extendTheme({ colors,breakpoints })



function MyApp({ Component, pageProps }: AppProps) {
  const [user,setUser] = useState(null);
  const [createdForms, setCreatedForms] = useState([]);

  //form_builderuser
  useEffect(() => {
    if (user?.length == 0 || user == null) {
      //Check if localStorage has a token role
      if (typeof window != undefined && localStorage.getItem("form_builderuser")) {
        console.log('Found user')
        setUser(localStorage.getItem("form_builderuser"));
      }
    }
  }, []);
 

  
  return (
  <ChakraProvider theme={theme}>
    <AppContext.Provider value={{user,setUser,createdForms, setCreatedForms}}>
   <DndProvider backend={HTML5Backend}> 
  <Component {...pageProps} />
  </DndProvider>
  </AppContext.Provider>
  </ChakraProvider>
  )

}

export default MyApp
