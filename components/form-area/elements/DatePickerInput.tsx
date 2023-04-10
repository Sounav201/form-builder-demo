import { useRef } from "react";
import { useDrag, useDrop, XYCoord } from "react-dnd";
import React, { useState } from 'react'
import { DatePickerAttributes } from "../../element-bank/ElementBank.types";
import Question from "../../Question";
import DatePicker from "react-datepicker";
import { FormAreaItem,DragItem } from "../FormArea.types";
import Image from 'next/image'
import { FormControl,FormLabel,FormErrorMessage,FormHelperText,Input, Stack, Box, Textarea} from '@chakra-ui/react'

interface DatePickerProps extends FormAreaItem<DatePickerAttributes> {}

const DatePickerInput = (props:DatePickerProps) => {
  const [startDate, setStartDate] = useState(new Date());
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
  
    const handleDateChange = (e) => {
      console.log(e.target.value,typeof(e.target.value))
      //Format startDate to YYYY-MM-DD
      const date = new Date(startDate)
      const year = date.getFullYear()
      var month = date.getMonth() + 1
      
      const day = date.getDate()
      const formattedDate = `${year}-${month<10 ? '0'+month.toString() : month}-${day}`
      console.log(formattedDate)
    }


  return (
    <div 
    ref={ref} style={{
      opacity: isDragging,
      cursor: "move",
    }}
    data-handler-id={handlerId}
    onClick={() => props.onQuestionSelected()}
    className={isSelected ? `my-4 pt-8 pb-2 md:pt-8 mx-auto rounded-md  w-11/12 relative box-border border-2 border-dotted border-violet-900` : `my-4 pt-8 pb-2 rounded-md md:pt-8 mx-auto box-border border-2 border-transparent  w-11/12 relative`}
    >
  <Stack w={['100%', 550, 700]} marginX="auto" maxWidth={800}   >
        <FormControl w={['100%', 500, 600]} marginX="auto">
        <Question
        required={props.attributes.required}
        questionImage = {props.attributes.styling.questionImage}
        numbering={props.numbering}
        styling={props.attributes.styling}
        question={props.question}
        onDelete={props.onDelete}
        onQuestionTextChanged={props.onQuestionTextChanged}
      />
      <div className='mt-6 mb-4'>

      <input type={"date"} placeholder='Date' name="input-date" onChange={handleDateChange} />

      </div>

      </FormControl>
    </Stack>
    </div>
  )
}

export default DatePickerInput