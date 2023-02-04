import React from 'react'

const Middle = ({ darkMode, setDarkMode }) => {
    return (
        <div className=" bg-cetacean/70 md:bg-cetacean/70 dark:bg-slate-900/50 shadow-sm w-full rounded-xl ">
            <div className=" p-2 md:p-3 border-gray-100">
                <p className="font-semibold text-white text-lg md:text-xl font-spacemono ">
                    Forms made by you ..
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-2 justify-between cursor-pointer mt-4">
                
                    <div className=" w-full  h-32 md:h-48 flex items-center justify-center  bg-blue-200 rounded-xl ">   
                    </div>
                    <div className=" w-full h-32 md:h-48 flex items-center justify-center  bg-pink-200 rounded-xl  ">   
                    </div>
                    <div className=" w-full h-32 md:h-48 flex items-center justify-center  bg-yellow-200 rounded-xl ">   
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Middle
