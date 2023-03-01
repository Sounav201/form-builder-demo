import React from 'react'
import { FormControl, FormLabel, FormErrorMessage, FormHelperText, Input, Stack, Box, Button, Checkbox } from '@chakra-ui/react'


const CheckboxElement = (props: any) => {
    return (
        <div>
            <Stack w={['100%', 550, 700]} marginX="auto" maxWidth={800}  >
                <FormControl isRequired={props.attributes.required} w={['100%', 500, 600]} marginX="auto">
                    <FormLabel  >{props.question}</FormLabel>

                    <div className='my-6'>
                        <Stack spacing={[2,2]}>
                        {props.attributes.choices.map((choice, index) => (
                            
                            <Checkbox key={index} value={choice.value}>
                                {choice.label}
                            </Checkbox>
                        ))}

                    </Stack>
                    </div>

                </FormControl>
            </Stack>
        </div>
    )
}

export default CheckboxElement