import React, { useContext } from 'react'
import AppContext from '../../src/context/appContext';
import {useRouter} from  'next/router' ;
import { MdDelete } from "react-icons/md";
import {FiDownload} from 'react-icons/fi';
import {BsBoxArrowUpRight} from 'react-icons/bs';
import {isMobile} from 'react-device-detect';
const Middle = ({ darkMode, setDarkMode,formsLoading }) => {
    const {user,setUser,createdForms, setCreatedForms} = useContext(AppContext);
    const router = useRouter();
    const handleFormClick = (form) => {
    if(!isMobile)
    {
        console.log(form);
        localStorage.setItem("formAreaItems", JSON.stringify(form.Form_data));
        localStorage.setItem("formHeading", JSON.stringify(form.name));
        router.push(`/forms/${form.Formid}`);
    }
    else
    {
        router.push('/mobileredirect');
    }
        
    }

    const handleDelete = async (ID:any) => {
        try {
            setCreatedForms((oldArray:any) => {
                const newArray = oldArray.filter((oldItem: any) => oldItem.Formid !== ID);
                return [...newArray];
            });
            
            const dataToSend = {user:user,formID:ID}
            const response = await fetch('/api/deleteForm', {
                method:'POST',
            headers:{
              'Content-Type':'application/json'
            },
            body:JSON.stringify(dataToSend)
            })
            if(response.status == 200)
            {
                console.log('Form deleted successfully!');
            }
        
        } catch (error) {
            console.log("Error : ",error)
        }
        


    }
   
    return (
        <div className=" bg-cetacean/70 md:bg-cetacean/80 dark:bg-slate-900/50 shadow-sm w-full rounded-xl ">
            <div className=" p-2 md:p-3 border-gray-100">
                <p className="font-semibold text-white text-lg md:text-xl font-spacemono ">
                    Forms made by you ..
                </p>
                
                {!formsLoading ?
                ( 
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 justify-between cursor-pointer mt-4">
                 {createdForms?.length == 0?
                 (<><div ><p className='text-white text-lg text-center transition cursor-pointer'>No created forms found</p></div></>)
                 :
                 
                 (<>
                
                {createdForms.map((form,idx) => 
                {
                    return(
                    <div key={form.Formid} className=" rounded-xl group hover:scale-105 duration-500">
                        <div  className=" w-full h-32 md:h-48 flex flex-col items-center justify-between dark:bg-cyan-900/20  dark:bg-none rounded-xl bg-bglite">   
                            <div className="flex flex-row justify-between py-2 px-2 md:px-4 w-full invisible group-hover:visible">
                            <div className=" w-auto h-auto md:w-10  md:h-10 flex items-center justify-center text-rose-700 dark:text-white hover:text-white dark:hover:text-background hover:bg-rose-700 dark:hover:bg-primary/90 font-bold border border-rose-700 dark:border-white hover:border-rose-700 dark:hover:border-primary/90 rounded-full p-1 md:p-0.5 m-1 ">
                                <FiDownload className="text-base md:text-xl"/>
                            </div>
                            <div className=" w-auto h-auto md:w-10  md:h-10 flex items-center justify-center text-rose-700 dark:text-white hover:text-white dark:hover:text-background border border-rose-700 dark:border-white hover:border-rose-700 dark:hover:border-primary/90 hover:bg-rose-700 dark:hover:bg-primary/90 font-bold rounded-full p-1 md:p-0.5 m-1 "  onClick={() => handleFormClick(form)}>
                            <BsBoxArrowUpRight className="text-sm md:text-lg"/>
                            </div>
                            </div>
                            
                            <p className='text-center font-semibold text-rose-700 hover:text-rose-800 dark:text-gray-400 dark:group-hover:text-white md:text-xl text-lg font-fredericka'>{form.name}</p> 

                            <div className="w-full flex justify-end py-2 px-2 md:px-4 invisible group-hover:visible">
                            <div className=" w-auto h-auto md:w-10  md:h-10 flex items-center justify-center text-rose-700 dark:text-white hover:text-white dark:hover:text-background border border-rose-700 dark:border-white hover:border-rose-700 dark:hover:border-primary/90 hover:bg-rose-700 dark:hover:bg-primary/90 rounded-full p-1 md:p-0.5 m-1 font-bold">
                                <MdDelete className="text-lg md:text-xl" onClick={() => handleDelete(form.Formid)}/>
                            </div>   
                            </div>               
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