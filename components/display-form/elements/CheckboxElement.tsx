import React,{useState} from 'react'
import { FormControl, FormLabel, FormErrorMessage, FormHelperText, Input, Stack, Box, Button, Checkbox } from '@chakra-ui/react'


const CheckboxElement = (props: any) => {

    const [selectedValue, setSelectedValue] = useState('');

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedValue(event.target.value);
    }

    return (
        <div>
            <Stack w={['100%', 550, 700]} marginX="auto" maxWidth={800}  >
                <FormControl   isRequired={props.attributes.required} w={['100%', 500, 600]} marginX="auto">
                    <FormLabel ><p className={`font-${props.attributes.styling.fontType}`}>{props.question}</p></FormLabel>

                    <div className='my-6'>
                        <Stack spacing={[2,2]}>
                        {props.attributes.choices.map((choice, index) => (
                            
                            <Checkbox 
                            name={props.question}  
                            key={index} 
                            value={choice.value}
                            id={props.id}
                            required={props.attributes.required}
                            isChecked={selectedValue === choice.value}
                            onChange={handleCheckboxChange}
                            >
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