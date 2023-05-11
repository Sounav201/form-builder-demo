import { Button } from '@chakra-ui/react';
import Image from 'next/image';
import React, { useEffect } from 'react'

import { StylingAttributes } from "./element-bank/ElementBank.types";
interface QuestionProps {
    numbering: number;
    question: string;
    questionImage:string;
    styling: StylingAttributes;
    required:Boolean;
    onDelete: () => any;
    onQuestionTextChanged: (questionText: string) => any;
  }

  

const Question = (props:QuestionProps) => {
 
  
 
  return (
    <div className='my-4 py-2 flex flex-col gap-4 items-center  '>
      {/* <div className='text-md  mr-2'>
          {props.numbering}.
    </div>  */}
    <div 
    className={`text-lg font-semibold flex-1 outline-none  w-full  font-${props.styling.fontType}`}
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
    {   props.required &&  <span className='ml-2 text-red-700'>*</span>
}

    </div>


{props.questionImage && props.questionImage.length> 0  &&<div className=''><Image src={props.questionImage} height={200} width={200} /> </div>}

    

        
    </div>
  )
}

export default Question