import { Button } from '@chakra-ui/react';
import React from 'react'

import { StylingAttributes } from "./element-bank/ElementBank.types";
interface QuestionProps {
    numbering: number;
    question: string;
    styling: StylingAttributes;
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
    className='text-lg font-bold flex-1 outline-none '
    contentEditable
    onBlur={(e) => {
        props.onQuestionTextChanged(e.target.innerText);
    }}
    defaultValue={props.question}
    suppressContentEditableWarning={true}
    style={{
        color: props.styling.fontColor,
        backgroundColor: props.styling.fontBackground,
    }}
  >

    {props.question}
    </div>
    <div className='ml-2'>
        <Button aria-label='Delete' colorScheme="purple" onClick={props.onDelete}>Delete</Button>
    </div>

    

        
    </div>
  )
}

export default Question