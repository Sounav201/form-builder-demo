import { useRef } from "react";
import { useDrag, useDrop, XYCoord } from "react-dnd";
import React, { useState ,useEffect} from 'react'
import { FileUploadAttributes } from "../../element-bank/ElementBank.types";
import Question from "../../Question";
import { FormAreaItem,DragItem } from "../FormArea.types";
import Image from 'next/image'
import { FormControl,FormLabel,FormErrorMessage,FormHelperText,Input, Stack,Textarea, Box} from '@chakra-ui/react'
import { useDropzone } from 'react-dropzone'
import {BsUpload} from "react-icons/bs"

interface FileUploadProps extends FormAreaItem<FileUploadAttributes> {}

const FileUpload = (props:FileUploadProps) => {
    const isSelected = props.isSelected;
    const [files,setFiles] = useState([])

    useEffect(() => {
        if(files.length>0)
            console.log("Files :  ",files)
    }, [files])
    const {getRootProps, getInputProps} = useDropzone({

    accept:("image/*") as any,
    onDrop:(acceptedFiles) => {
        setFiles(acceptedFiles.map((file) => Object.assign(file,{
            preview:URL.createObjectURL(file)
            
        }))
    )
    //console.log(preview)

    console.log("File upload successful!");

    }

    
    })


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
    <div 
    ref={ref} style={{
      opacity: isDragging,
      cursor: "move",
    }}
    data-handler-id={handlerId}
    onClick={() => props.onQuestionSelected()}
    className={isSelected ? `my-4 pt-8 pb-2 md:pt-8 mx-auto  w-11/12 relative box-border border-2 border-dotted border-red-400` : `my-4 pt-8 pb-2 md:pt-8 mx-auto box-border border-2 border-transparent  w-11/12 relative`}
    >
    <Stack w={[350, 550, 700]} marginX="auto" maxWidth={800}   >
       <FormControl w={[350, 500, 600]} marginX="auto"> 
        <Question
        required={props.attributes.required}
        numbering={props.numbering}
        styling={props.attributes.styling}
        question={props.question}
        onDelete={props.onDelete}
        onQuestionTextChanged={props.onQuestionTextChanged}
      />
      <div className='mt-6 mb-4'>
        <div {...getRootProps()} className="border-2 border-dashed border-black bg-transparent my-4">
        <div className="flex place-content-center items-center" >
                        <input  {...getInputProps()}/>
                        <div className="mx-auto my-2 md:my-4 grid grid-rows-2  gap-y-1 md:gap-y-2">
                            
                            <BsUpload  className="mx-auto" color="black" size={24}/>
                            
                            <div className="text-xl text-black text-center">Upload files here</div>
                            <span className="text-md text-black">Max upload limit: 3MB</span>
                        </div>
                </div>    

        </div>

      </div>

      </FormControl>
    </Stack>
    </div>
  )

}

export default FileUpload