import React,{useState,useEffect} from 'react'
import ShortTextElement from "../components/display-form/elements/ShortTextElement"
import LongTextElement from '../components/display-form/elements/LongTextElement'

const preview = () => {

    const [form, setform] = useState([
        {
            "type": "shorttext",
            "question": "What is your name?",
            "attributes": {
                "required": true,
                "styling": {
                    "fontColor": "#000000"
                }
            },
            "id": "UHGSBlcgJMMbxucWgeaKo",
            "isSelected": true
        },
        {
            "type": "longtext",
            "question": "How was your placement experience?",
            "attributes": {
                "required": false,
                "styling": {
                    "fontColor": "#000000"
                }
            },
            "id": "W8ReUaWkCD64CgFiVbsT8",
            "isSelected": false
        }
    ]);

  return (
    <div className="bg-gray-500 h-screen w-screen flex flex-col ">
        <div className='w-1/2 my-4 rounded-xl p-2 bg-red-600 mx-auto '>
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
            return(<div key={idx} className="w-10/11 mx-auto my-4">
            
            <LongTextElement question={element.question} attributes={element.attributes} />

        </div>)


            }
        })}
    </div>
    </div>
  )
}

export default preview