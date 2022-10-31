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
    const [dummyform, setdummyform] = useState([]);
 

    const [form, setform] = useState([ ]);

    useEffect(() => {

        if(typeof(window)!= undefined)
        {
          if(localStorage.getItem("formAreaItems"))
          {//console.log('Getter runs!');
            setdummyform(JSON.parse(localStorage.getItem("formAreaItems"))  )
            setform(JSON.parse(localStorage.getItem("formAreaItems"))  )
            
          }
          
        }
    
        
      }, [])



  return (
    <div style={{backgroundImage:"url('./subtle-prism.svg')"}} className=" bg-cover min-h-screen flex flex-col ">
        <div className="bg-transparent fixed left-8 top-6">
             <Link href={"/builder"}>
             <button className="bg-gradient-to-r text-white cursor-pointer from-purple-600  to-blue-600 transition-all  duration-300 hover:scale-105  hover:from-blue-800 hover:to-purple-800 py-2 px-4 rounded-sm font-semibold " >
               Go Back
               </button>
               </Link>
           </div>
 
        <div style={{backgroundImage:"url('./scattered-forcefields.svg')"}} className='w-7/13 my-4 bg-cover rounded-xl p-2 mx-auto '>
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