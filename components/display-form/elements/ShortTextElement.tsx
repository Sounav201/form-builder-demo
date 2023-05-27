import React, { useState } from 'react'
import { FormControl,FormLabel,FormErrorMessage,FormHelperText,Input, Stack,Textarea, Box} from '@chakra-ui/react'

const ShortTextElement = (props:any) => {

    const [input, setinput] = useState("")

  //console.log('Required field : ', props.attributes.required)
  return (
    <div>
        <Stack w={['100%', 550, 700]} marginX="auto" maxWidth={800}   >
       <FormControl isRequired={props.attributes.required} w={['100%', 500, 600]} marginX="auto"> 
       <FormLabel >
        <p style={{color:props.attributes.styling.fontColor}} className={`font-${props.attributes.styling.fontType} text-[${props.attributes.styling.fontColor}] `}>{props.question}</p>
       </FormLabel>
      <div className='mt-6 mb-4'>

        <Input 
        w={['100%',500,600]} 
        size='md' 
        name={props.question} 
        id={props.id}   
        type={props?.attributes?.inputType || "text"} 
        required={props.attributes.required}
        placeholder="Enter your text here" value={input} onChange={(e) => setinput(e.target.value)}></Input>
        
      </div>

      </FormControl>
    </Stack>

    </div>
  )
}

export default ShortTextElement