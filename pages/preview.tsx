import React,{useState,useEffect} from 'react'
import ShortTextElement from "../components/display-form/elements/ShortTextElement"
import LongTextElement from '../components/display-form/elements/LongTextElement'
import { useRouter } from 'next/router'
import CheckboxElement from '../components/display-form/elements/CheckboxElement'
import FileUploadElement from '../components/display-form/elements/FileUploadElement'
import Link from 'next/link'
import RatingElement from '../components/display-form/elements/RatingElement'
const Preview = () => {

    const router = useRouter();
    const data = router.query;
    const [dummyHeading, setdummyHeading] = useState("Untitled Form")

    const [form, setform] = useState([ ]);

    useEffect(() => {

        if(typeof(window)!= undefined)
        {
          if(localStorage.getItem("formAreaItems"))
          {//console.log('Getter runs!');
            setform(JSON.parse(localStorage.getItem("formAreaItems"))  )
            
          }
          if(localStorage.getItem("formHeading"))
          {
            setdummyHeading(JSON.parse(localStorage.getItem("formHeading")));
          }
          
        }
    
        
      }, [])



  return (
    <div className=" bg-cover min-h-screen flex flex-col bg-background ">
        <div className="bg-transparent fixed left-8 top-6">
             <Link href={"/builder"}>
             <button className="relative border-2 border-violet-800 py-2.5 px-5 font-medium uppercase text-violet-500 transition-colors before:absolute before:left-0 before:top-0 before:-z-10 before:h-full before:w-full before:origin-top-left before:scale-x-0 before:bg-gradient-to-r from-violet-900  to-blue-600 before:transition-transform before:duration-300 before:content-[''] hover:text-white hover:border-violet-800 before:hover:scale-x-100" >
               Return
               </button>
               </Link>
           </div>
 
        <div  className='w-7/13 my-4 bg-cover bg-violet-200 p-2 mx-auto '>
            <div className="text-3xl font-bold my-4 text-center outline-none  w-full ">{dummyHeading}</div>
        {form.length> 0 && form.map((element,idx) => {
            if(element.type == "shorttext")
            {
                return(
                <div key={idx} className="w-10/11 mx-auto my-4">
                    <ShortTextElement question={element.question} attributes={element.attributes} />    
                </div>)
            }
            else if(element.type == "longtext")
            {
            return(
            <div key={idx} className="w-10/11 mx-auto my-4">
            
            <LongTextElement question={element.question} attributes={element.attributes} />

        </div>)
        


            }
            else if(element.type == "checkbox")
            {
                return (
                    <div key={idx} className="w-10/11 mx-auto my-4">
                        <CheckboxElement  question={element.question} attributes={element.attributes} />

                    </div>
                )
            }
            else if(element.type == "fileupload")
            {
                return (
                    <div key={idx} className="w-10/11 mx-auto my-4">
                        <FileUploadElement  question={element.question} attributes={element.attributes} />

                    </div>
                )
            }

            else if(element.type == "rating")
            {
                return (
                    <div key={idx} className="w-10/11 mx-auto my-4">
                    <RatingElement question={element.question} attributes={element.attributes} />
                    </div>
                )
            }

        })}
        </div>
    </div>
  )
}

export default Preview