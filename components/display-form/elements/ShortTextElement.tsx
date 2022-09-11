import React, { useState } from 'react'
import { FormControl,FormLabel,FormErrorMessage,FormHelperText,Input, Stack,Textarea, Box} from '@chakra-ui/react'

const ShortTextElement = (props:any) => {

    const [input, setinput] = useState("")

  //console.log('Required field : ', props.attributes.required)
  return (
    <div>
        <Stack w={[350, 550, 700]} marginX="auto" maxWidth={800}   >
       <FormControl isRequired={props.attributes.required} w={[350, 500, 600]} marginX="auto"> 
        <FormLabel  >{props.question}</FormLabel>
      <div className='mt-6 mb-4'>

        <Input w={[350,500,600]} size='md'   type="text" placeholder="Enter your text here" value={input} onChange={(e) => setinput(e.target.value)}></Input>
        
      </div>

      </FormControl>
    </Stack>

    </div>
  )
}

export default ShortTextElement