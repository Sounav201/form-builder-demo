import React from 'react'
import { useDrop } from "react-dnd";
import { FormAreaItem, FormAreaProps } from "./FormArea.types";
import { FiPlusCircle } from "react-icons/fi"
import { useCallback, useRef, useState } from "react";
import ShortText from "./elements/ShortText";
import {
  CheckboxAttributes,
  ElementAttributes,
  ElementType,
} from "../element-bank/ElementBank.types";
import Checkbox from "./elements/Checkbox";

const FormArea = (props: FormAreaProps) => {
    const [, drop] = useDrop(() => ({
        accept: "form-element",
        drop: (item: FormAreaItem<ElementAttributes>) => {
          props.onDrop(item);
        },
      }));
    
    const [filled, setfilled] = useState(false);

  return (
    <div>
    
    <div className='relative m-auto mt-16 w-full h-auto min-w-fit min-h-fit  bg-gray-800 flex justify-center'>

<div className='w-3/4 lg:px-24 max-w-fit  mt-16 overflow-visible mx-auto mb-12 bg-gray-300 rounded-md flex flex-col justify-center'>

    <ul className={props.items.length>0 ? 'py-32 relative m-0 flex flex-col items-start text-xl list-none    ' : 'py-32 relative m-0 flex items-start text-xl list-none    '} ref={drop}>

        {/* {props.items.length>0 && canvasRef.current.map((element, idx) => {

            return (
                <li key={element.uuid} className='mt-8 cursor-default  w-full '>

                    <FormElementHolder questionNo={idx + 1} element={element} removeElement={() => removeElementfromCanvas(element)} canvasRef={canvasRef.current} _setCanvas={_setCanvas} />

                </li>
            )

        })}
       */}

      {props.items.length>0 && props.items.map((item, index) => {
        switch (item.type) {
          case ElementType.SHORT_TEXT:
            return (
            <li className='list-none box-border'>
              <ShortText
                key={index}
                {...item}
                numbering={index + 1}
                onDelete={() => props.onItemDelete(item)}
                onQuestionTextChanged={(questionText) =>
                  props.onQuestionTextChange(item, questionText)
                }
                onQuestionSelected={() => props.onQuestionSelected(item)}
              />
              </li>
            );
          case ElementType.CHECKBOX:
            return (
              <li>
              <Checkbox
                key={index}
                {...(item as FormAreaItem<CheckboxAttributes>)}
                numbering={index + 1}
                onDelete={() => props.onItemDelete(item)}
                onQuestionTextChanged={(questionText) =>
                  props.onQuestionTextChange(item, questionText)
                }
                onQuestionSelected={() => props.onQuestionSelected(item)}
              />
              </li>
            );
        }
      })}


        <li className={props.items.length>0 ? 'hidden' : `mt-8 cursor-default  w-full `}>

            <div className={props.items.length>0 ? 'hidden' : 'py-10 px-5 text-black bg-gray-200 rounded-md text-center m-5  border-2 border-dashed border-black'}>

                <FiPlusCircle size={32} className='inline-block' color='black' />
                <div className='inline-block ml-2 text-xl'>Drag your first element from the left.</div>
            </div>

        </li>

    </ul>

</div>
</div>

    </div>
  )
}

export default FormArea