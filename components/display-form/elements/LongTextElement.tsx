import React, { useState } from 'react'
import Image from 'next/image'
import { FormControl, FormLabel, FormErrorMessage, FormHelperText, Input, Stack, Box, Textarea } from '@chakra-ui/react'

const LongTextElement = (props: any) => {
    const [input, setinput] = useState("")

   // console.log(props.id)
    return (
        <div>
            <Stack w={['100%', 550, 700]} marginX="auto" maxWidth={800}   >
                <FormControl w={['100%', 500, 600]} marginX="auto">
                <FormLabel >
                <p 
                style={{color:props.attributes.styling.fontColor}}
                className={`font-${props.attributes.styling.fontType} text-[${props.attributes.styling.fontColor}] `}>{props.question}</p>
                </FormLabel>

                    <div className='mt-6 mb-4'>

                        <Textarea        
                         required={props.attributes.required}
                         w={['100%', 500, 600]} name={props.question} id={props.id} size='md' placeholder="Enter your text here" value={input} onChange={(e) => setinput(e.target.value)} />

                    </div>

                </FormControl>
            </Stack>
        </div>
    )
}

export default LongTextElement