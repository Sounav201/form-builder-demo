import React from 'react'

const Middle = () => {
    return (
        <div className=" bg-slate-900/50 shadow-sm w-full rounded-xl ">
            <div className=" p-2 md:p-3 border-gray-100">
                <p className="font-semibold text-blue-500 md:text-xl font-spacemono ">
                    Forms made by you ..
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-1 md:gap-2 justify-between cursor-pointer ">
                
                    <div className=" w-full  h-20 md:h-40 flex items-center justify-center  bg-blue-200 rounded-xl md:m-1 ">   
                    </div>
                    <div className=" w-full  h-20 md:h-40 flex items-center justify-center  bg-pink-200 rounded-xl md:m-1 ">   
                    </div>
                    <div className=" w-full  h-20 md:h-40 flex items-center justify-center  bg-yellow-200 rounded-xl md:m-1 ">   
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Middle
