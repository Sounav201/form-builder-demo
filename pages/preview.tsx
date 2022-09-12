import React,{useState,useEffect} from 'react'
import ShortTextElement from "../components/display-form/elements/ShortTextElement"
import LongTextElement from '../components/display-form/elements/LongTextElement'

const preview = () => {

    const [form, setform] = useState([
        {
            "type": "shorttext",
            "question": "Question 1",
            "attributes": {
                "required": false,
                "styling": {
                    "fontColor": "#000000"
                }
            },
            "id": "Gvu7PVA6XXHaj2vfEO4oq",
            "isSelected": false
        },
        {
            "type": "longtext",
            "question": "Question 2",
            "attributes": {
                "required": false,
                "styling": {
                    "fontColor": "#000000"
                }
            },
            "id": "U0SiGfRzWkostHSJluYSU",
            "isSelected": true
        },
        {
            "type": "shorttext",
            "question": "Question 3",
            "attributes": {
                "required": false,
                "styling": {
                    "fontColor": "#000000"
                }
            },
            "id": "D90DYr3SQp1DhIRRXk2o6",
            "isSelected": false
        }
    ]);

  return (
    <div style={{backgroundImage:"url('./sunset-hair.jpg')"}} className="bg-gray-500 h-screen w-screen flex flex-col ">
        <div className='w-1/2 my-4 rounded-xl p-2 bg-yellow-600 mx-auto '>
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
        })}
    </div>
    </div>
  )
}

export default preview