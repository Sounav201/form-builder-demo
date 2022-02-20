import React, { useState } from 'react'
import { CheckboxAttributes } from "../../element-bank/ElementBank.types";
import Question from "../../Question";
import { FormAreaItem } from "../FormArea.types";
import Image from 'next/image'
import { FormControl, FormLabel, FormErrorMessage, FormHelperText, Input, Stack, Box, Button } from '@chakra-ui/react'
import {AiOutlineClose} from 'react-icons/ai';
interface CheckboxProps extends FormAreaItem<CheckboxAttributes> { }
//Need to put isSelected boolean 
const Checkbox = (props: CheckboxProps) => {

    const isSelected = props.isSelected;
    return (
        <div onClick={() => props.onQuestionSelected()}

            className={isSelected ? `my-4 pt-8 pb-2 md:pt-8 mx-auto  w-11/12 relative box-border border-2 border-dotted border-red-400` : `my-4 pt-8 pb-2 md:pt-8 mx-auto box-border border-2 border-transparent  w-11/12 relative`}
        >
            <Stack w={[350, 550, 700]} marginX="auto" maxWidth={800}  >
                <FormControl w={[350, 500, 600]} marginX="auto">
                    <Question
                        numbering={props.numbering}
                        styling={props.attributes.styling}
                        question={props.question}
                        onDelete={props.onDelete}
                        onQuestionTextChanged={props.onQuestionTextChanged}
                    />
                    <div className='mt-12'>
                        {props.attributes.choices.map((choice, index) => (
                            <div className='my-2 box-border flex justify-between group-hover:bg-blue-300' key={index} >
                                <div className='flex'>
                                <input type="checkbox" className='mt-2 rounded-full' value={choice.value} />
                                <div className='ml-2 text-md ' 
                                contentEditable
                                    onBlur={(e) => {
                                        props.onOptionEdit(e.target.innerText,index);
                                    }}
                                    defaultValue={choice.label}
                                    suppressContentEditableWarning={true}
                                ><label >{choice.label}</label></div>
                                </div>
                                {/* <Button leftIcon={<AiOutlineClose/>}   size={'xs'} color="#D1D5DB" bg="#D1D5DB" borderColor={'#ccd0d5'}   _hover={{ bg: '#E53E3E' }}></Button> */}
                                {/*Use Nested Classes   */}
                                <button className='bg-red-500 rounded-full p-1 hover:bg-red-400 transition duration-300 '><AiOutlineClose /></button>
                            </div>
                        ))}

        <Stack w={300} mt={8} spacing={4} direction={"row"} >
            <button className='bg-green-600 transition-duration-300 hover:bg-green-500 rounded-md p-2 text-sm text-white ' onClick={() => props.onOptionAdd()}>Add Option</button>
            <button className='bg-blue-600 transition-duration-300 hover:bg-blue-500 rounded-md p-2 text-sm text-white'>Add Comment</button>
        </Stack>


                    </div>

                </FormControl>
            </Stack>

        </div>
    )
}

export default Checkbox