import React, { useState } from 'react'
import { LongTextAttributes } from "../../element-bank/ElementBank.types";
import Image from 'next/image'
import { FormControl, FormLabel, FormErrorMessage, FormHelperText, Input, Stack, Box, Textarea } from '@chakra-ui/react'

const LongTextElement = (props: any) => {
    const [input, setinput] = useState("")


    return (
        <div>
            <Stack w={['100%', 550, 700]} marginX="auto" maxWidth={800}   >
                <FormControl w={['100%', 500, 600]} marginX="auto">
                <FormLabel  >{props.question}</FormLabel>

                    <div className='mt-6 mb-4'>

                        <Textarea w={['100%', 500, 600]} name={props.question} size='md' placeholder="Enter your text here" value={input} onChange={(e) => setinput(e.target.value)} />

                    </div>

                </FormControl>
            </Stack>
        </div>
    )
}

export default LongTextElement