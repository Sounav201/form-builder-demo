import React from 'react'

function mobileRedirect() {
  return (
    <div className="flex flex-col h-screen w-screen justify-center items-center bg-slate-200 dark:bg-mobileRedirect_bg">
        <div className=' h-auto w-[80%] '><img src='/desktop_png.png' 
            alt='desktop_png'/>
        </div>
        <h1 className=' w-full text-xl md:text-5xl text-center font-spacemono font-bold  text-slate-600 dark:text-gray-400 justify-center items-center'>
          {"Uh Oh! This page isn't available in Mobile. "}<br/>
          {"Please open in Desktop."}</h1>
    </div>
  )
}

export default mobileRedirect