import { useRef } from "react";
import { useDrag, useDrop, XYCoord } from "react-dnd";
import React, { useState ,useEffect} from 'react'
import { RatingAttributes } from "../../element-bank/ElementBank.types";
import Question from "../../Question";
import { FormAreaItem,DragItem } from "../FormArea.types";
import Image from 'next/image'
import { FormControl,FormLabel,FormErrorMessage,FormHelperText,Input, Stack,Textarea, Box} from '@chakra-ui/react'
import {FaStar,FaRegSmileBeam,FaHeart} from "react-icons/fa"

interface RatingProps extends FormAreaItem<RatingAttributes> {}
//Need to put isSelected boolean 

const Rating = (props:RatingProps) => {

    const [input, setinput] = useState("")
    const isSelected = props.isSelected;
    const [rating,setRating] = useState(null);
    const [hover,setHover] = useState(null);
    const [ratingElement,setratingElement] = useState(props.attributes.emoji ? props.attributes.emoji : "Star")    
    let blockColor = props.attributes.styling.fontColor || "#e4e5e9"
    let hoverColor = props.attributes.styling.hoverColor || "#c31432"
    const rateLimit = props.attributes.limit? props.attributes.limit : 5;

    useEffect(() => {
      console.log('Selected rating element : ', ratingElement);
    }, [ratingElement,isSelected])
    

    const choiceOfElement = props.attributes.emoji;
    


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
        
      <div className="my-2  flex ">
      {[...Array(rateLimit)].map((star,i)=> {
                const ratingVal = i+1;

            return (
                <>
                {choiceOfElement == "Heart" ? 
                (<>
                <label className="hidden md:block">
                    <input type="radio" className="radio hidden" name="rating" value={ratingVal} onClick={() => setRating(ratingVal)}  />
                    
                    <FaHeart
                    className="rating cursor-pointer transition-colors duration-200 mx-1" 
                    color={ratingVal<=(hover||rating) ? hoverColor : blockColor} 
                    size={48}
                    onMouseEnter={() => setHover(ratingVal)} onMouseLeave={() => setHover(null)}
                    />
                </label>
                <label className=" block md:hidden">
                    <input type="radio" className="radio hidden" name="rating" value={ratingVal} onClick={() => setRating(ratingVal)}  />
                    <FaHeart
                    className="rating cursor-pointer transition-colors duration-200 mx-1" 
                    color={ratingVal<=(hover||rating) ? hoverColor : blockColor} 
                    size={27}
                    onMouseEnter={() => setHover(ratingVal)} onMouseLeave={() => setHover(null)}
                    />
                </label>

                
                </>) : choiceOfElement == "Smiley" ? 
                
                (<>
                
                <label className="hidden md:block">
                    <input type="radio" className="radio hidden" name="rating" value={ratingVal} onClick={() => setRating(ratingVal)}  />
                    
                    <FaRegSmileBeam
                    className="rating cursor-pointer transition-colors duration-200 mx-1" 
                    color={ratingVal<=(hover||rating) ? hoverColor : blockColor} 
                    size={48}
                    onMouseEnter={() => setHover(ratingVal)} onMouseLeave={() => setHover(null)}
                    />
                </label>
                <label className=" block md:hidden">
                    <input type="radio" className="radio hidden" name="rating" value={ratingVal} onClick={() => setRating(ratingVal)}  />
                    <FaRegSmileBeam
                    className="rating cursor-pointer transition-colors duration-200 mx-1" 
                    color={ratingVal<=(hover||rating) ? hoverColor : blockColor} 
                    size={27}
                    onMouseEnter={() => setHover(ratingVal)} onMouseLeave={() => setHover(null)}
                    />
                </label>
                
                
                </>) : 
                (<>
                
                <label className="hidden md:block">
                    <input type="radio" className="radio hidden" name="rating" value={ratingVal} onClick={() => setRating(ratingVal)}  />
                    
                    <FaStar
                    className="rating cursor-pointer transition-colors duration-200 mx-1" 
                    color={ratingVal<=(hover||rating) ? hoverColor : blockColor} 
                    size={48}
                    onMouseEnter={() => setHover(ratingVal)} onMouseLeave={() => setHover(null)}
                    />
                </label>
                <label className=" block md:hidden">
                    <input type="radio" className="radio hidden" name="rating" value={ratingVal} onClick={() => setRating(ratingVal)}  />
                    <FaStar
                    className="rating cursor-pointer transition-colors duration-200 mx-1" 
                    color={ratingVal<=(hover||rating) ? hoverColor : blockColor} 
                    size={27}
                    onMouseEnter={() => setHover(ratingVal)} onMouseLeave={() => setHover(null)}
                    />
                </label>

                
                </>)}
                
                </>


)

            })}
        </div>
        {/* <Input w={[350,500,600]} size='md'   type="text" placeholder="Enter your text here" value={input} onChange={(e) => setinput(e.target.value)}></Input> */}

      </div>

      </FormControl>
    </Stack>
    </div>
  )

}

export default Rating