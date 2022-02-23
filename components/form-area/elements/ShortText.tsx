import React, { useState } from 'react'
import { ShortTextAttributes } from "../../element-bank/ElementBank.types";
import Question from "../../Question";
import { FormAreaItem } from "../FormArea.types";
import Image from 'next/image'
import { FormControl,FormLabel,FormErrorMessage,FormHelperText,Input, Stack, Box} from '@chakra-ui/react'

interface ShortTextProps extends FormAreaItem<ShortTextAttributes> {}
//Need to put isSelected boolean 

const ShortText = (props:ShortTextProps) => {

    const [input, setinput] = useState("")
    const isSelected = props.isSelected;


  return (
    <div 
    onClick={() => props.onQuestionSelected()}
    className={isSelected ? `my-4 pt-8 pb-2 md:pt-8 mx-auto  w-11/12 relative box-border border-2 border-dotted border-red-400` : `my-4 pt-8 pb-2 md:pt-8 mx-auto box-border border-2 border-transparent  w-11/12 relative`}
    >
    <Stack w={[350, 550, 700]} marginX="auto" maxWidth={800}   >
       <FormControl w={[350, 500, 600]} marginX="auto"> 
        <Question
        numbering={props.numbering}
        styling={props.attributes.styling}
        question={props.question}
        onDelete={props.onDelete}
        onQuestionTextChanged={props.onQuestionTextChanged}
      />
      <div className='mt-12 mb-4'>

        <Input w={[350,500,600]} size='lg'   type="text" placeholder="Enter your text here" value={input} onChange={(e) => setinput(e.target.value)}></Input>

      </div>

      </FormControl>
    </Stack>
    </div>
  )
}

export default ShortText