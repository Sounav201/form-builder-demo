import { useRef } from "react";
import { useDrag, useDrop, XYCoord } from "react-dnd";
import React, { useState } from 'react'
import { CheckboxAttributes } from "../../element-bank/ElementBank.types";
import Question from "../../Question";
import { DragItem, FormAreaItem } from "../FormArea.types";
import Image from 'next/image'
import { FormControl, FormLabel, FormErrorMessage, FormHelperText, Input, Stack, Box, Button  } from '@chakra-ui/react'
import {AiOutlineClose} from 'react-icons/ai';
interface CheckboxProps extends FormAreaItem<CheckboxAttributes> { }
//Need to put isSelected boolean 
const Checkbox = (props: CheckboxProps) => {


    const isSelected = props.isSelected;

    const ref = useRef<HTMLDivElement>(null);

    const [{ isDragging }, drag] = useDrag(
      () => ({
        type: "form-area-element",
        item: () => {
          return { id: props.id, index: props.index, question: props.question, attributes: props.attributes, isSelected: props.isSelected, type: props.type };
        },
        collect: (monitor) => {
          return {
            isDragging: monitor.isDragging() ? 0.3 : 1,
          };
        },
      }),
      []
    );
    const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: any }
  >({
    accept: "form-area-element",
    collect: (monitor) => {
      return {
        handlerId: monitor.getHandlerId()
      };
    },
    hover: (item: DragItem, monitor) => {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = props.index;
  
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
  
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
  
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
  
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
  
      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;
  
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
  
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
  
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
  
      // Time to actually perform the action
      props.moveCard(dragIndex, hoverIndex);
  
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    }
  });
  drag(drop(ref));
  
  

    return (
        <div onClick={() => props.onQuestionSelected()}
        ref={ref} style={{
            opacity: isDragging,
            cursor: "move",
          }}
          data-handler-id={handlerId}
      
            className={isSelected ? `my-4 pt-8 pb-2 md:pt-8 mx-auto  w-11/12 relative box-border border-2 border-dotted border-violet-900` : `my-4 pt-8 pb-2 md:pt-8 mx-auto box-border border-2 border-transparent  w-11/12 relative`}
        >
            <Stack w={[300, 550, 700]} marginX="auto" maxWidth={800}  >
                <FormControl w={[300, 500, 600]} marginX="auto">
                    <Question
                        numbering={props.numbering}
                        required={props.attributes.required}
                        styling={props.attributes.styling}
                        questionImage = {props.attributes.styling.questionImage}
                        question={props.question}
                        onDelete={props.onDelete}
                        onQuestionTextChanged={props.onQuestionTextChanged}
                    />
                    <div className='mt-12'>
                        {props.attributes.choices.map((choice, index) => (
                            <div className='my-2 box-border flex justify-between group-hover:bg-blue-300' key={index} >
                                <div className='flex'>
                                <input type="checkbox" className='mt-2 mx-auto rounded-full  ' value={choice.value} />
                                <div className='ml-2 text-md px-1' 
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
                                <button className='bg-red-500 rounded-full p-1 hover:bg-red-400 transition duration-300 'onClick={() => props.onOptionDelete(index)}  ><AiOutlineClose size={18} /></button>
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