import React, { useContext } from 'react'
import AppContext from '../../src/context/appContext';
import {useRouter} from  'next/router' 
const Middle = ({ darkMode, setDarkMode,formsLoading }) => {
    const {user,setUser,createdForms, setCreatedForms} = useContext(AppContext);
    const router = useRouter();
    const handleFormClick = (form) => {
    console.log(form);
    localStorage.setItem("formAreaItems", JSON.stringify(form.Form_data));
    localStorage.setItem("formHeading", JSON.stringify(form.name));
    router.push(`/forms/${form.Formid}`);
        
    }
   
    return (
        <div className=" bg-cetacean/70 md:bg-cetacean/70 dark:bg-slate-900/50 shadow-sm w-full rounded-xl ">
            <div className=" p-2 md:p-3 border-gray-100">
                <p className="font-semibold text-white text-lg md:text-xl font-spacemono ">
                    Forms made by you ..
                </p>
                
                {!formsLoading ?
                ( 
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-2 justify-between cursor-pointer mt-4">
                 {createdForms?.length == 0?
                 (<><div ><p className='text-white text-lg text-center transition cursor-pointer'>No created forms found</p></div></>)
                 :
                 
                 (<>
                
                {createdForms.map((form,idx) => 
                {
                    return(
                    <div key={form.Formid} onClick={() => handleFormClick(form)}>
                        <div  className=" w-full  h-32 md:h-48 flex items-center justify-center  bg-blue-200 rounded-xl ">   
                            <p className='text-center font-semibold text-black'>{form.name}</p>                        
                        </div>
                        {/* <div className=" w-full h-32 md:h-48 flex items-center justify-center  bg-pink-200 rounded-xl  ">   
                        </div>
                        <div className=" w-full h-32 md:h-48 flex items-center justify-center  bg-yellow-200 rounded-xl ">   
                        </div> */}
                    </div>
                    )

                }
                )}  
                 
                 
                 </>)}
                               
                </div>):
                
                (<div >
                    <p className='text-yellow-400 text-lg text-center transition animate-pulse '>Loading your forms ...</p>
                </div>)}
            </div>
        </div>
    )
}

export default Middle
