import React,{useState,useEffect} from 'react'
import ShortTextElement from "../components/display-form/elements/ShortTextElement"
import LongTextElement from '../components/display-form/elements/LongTextElement'
import { useRouter } from 'next/router'
import CheckboxElement from '../components/display-form/elements/CheckboxElement'
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
    <div style={{backgroundImage:"url('./sunset-hair.jpg')"}} className="bg-gray-500 h-screen w-screen flex flex-col ">
        <div className='w-1/2 my-4 rounded-xl p-2 bg-yellow-600/25 mx-auto '>
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
        })}
    </div>
    </div>
  )
}

export default Preview