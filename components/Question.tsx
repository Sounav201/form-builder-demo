import { Button } from '@chakra-ui/react';
import React from 'react'

import { StylingAttributes } from "./element-bank/ElementBank.types";
interface QuestionProps {
    numbering: number;
    question: string;
    styling: StylingAttributes;
    required:Boolean;
    onDelete: () => any;
    onQuestionTextChanged: (questionText: string) => any;
  }

  

const Question = (props:QuestionProps) => {
 
 
  return (
    <div className='my-4 py-2 flex items-center  '>
      <div className='text-md  mr-2'>
          {props.numbering}.
    </div> 
    <div 
    className='text-lg font-semibold flex-1 outline-none  w-full '
    contentEditable
    onBlur={(e) => {
        props.onQuestionTextChanged(e.target.innerText);
    }}
    defaultValue={props.question}
    suppressContentEditableWarning={true}
    style={{
        color: props.styling.fontColor,
    }}
  >

    {props.question}
    </div>
{   props.required &&  <span className='ml-2 text-red-700'>*</span>
}

    

        
    </div>
  )
}

export default Question