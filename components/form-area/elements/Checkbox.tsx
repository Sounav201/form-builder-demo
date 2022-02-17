import React, { useState } from 'react'
import { CheckboxAttributes } from "../../element-bank/ElementBank.types";
import Question from "../../Question";
import { FormAreaItem } from "../FormArea.types";
import Image from 'next/image'
import { FormControl, FormLabel, FormErrorMessage, FormHelperText, Input, Stack, Box } from '@chakra-ui/react'

interface CheckboxProps extends FormAreaItem<CheckboxAttributes> { }
//Need to put isSelected boolean 
const Checkbox = (props: CheckboxProps) => {

    const isSelected = props.isSelected;
    return (
        <div onClick={() => props.onQuestionSelected()}

            className={isSelected ? `my-4 pt-8 pb-2 md:pt-8 mx-auto  w-11/12 relative box-border border-2 border-dotted border-red-400` : `my-4 pt-8 pb-2 md:pt-8 mx-auto box-border border-2 border-transparent  w-11/12 relative`}
        >
            <Stack w={[350, 550, 700]} marginX="auto" maxWidth={800}  >
                <FormControl w={[350, 500, 600]}>
                    <Question
                        numbering={props.numbering}
                        styling={props.attributes.styling}
                        question={props.question}
                        onDelete={props.onDelete}
                        onQuestionTextChanged={props.onQuestionTextChanged}
                    />
                    <div className='mt-12'>
                        {props.attributes.choices.map((choice, index) => (
                            <div className='my-2 box-border flex' key={index} >
                                <input type="checkbox" className='mt-2' value={choice.value} />
                                <div className='ml-2 text-md' 
                                contentEditable
                                    onBlur={(e) => {
                                        //props.onQuestionTextChanged(e.target.innerText);
                                        props.onOptionEdit(e.target.innerText,index);
                                    }}
                                    defaultValue={choice.label}
                                    suppressContentEditableWarning={true}
                                ><label >{choice.label}</label></div>
                            </div>
                        ))}

                    </div>

                </FormControl>
            </Stack>

        </div>
    )
}

export default Checkbox