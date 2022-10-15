import React from 'react'
import { useDrop } from "react-dnd";
import { FormAreaItem, FormAreaProps } from "./FormArea.types";
import { FiPlusCircle, FiSettings } from "react-icons/fi"
import { useCallback, useRef, useState } from "react";
import { ImBin } from "react-icons/im";
import ShortText from "./elements/ShortText";
import {
  CheckboxAttributes,
  ElementAttributes,
  ElementType,
  RatingAttributes,
  FileUploadAttributes
} from "../element-bank/ElementBank.types";
import Checkbox from "./elements/Checkbox";
import { Button } from '@chakra-ui/react';
import FormElement from './FormElement';
import LongText from './elements/LongText';
import Rating from './elements/Rating';
import FileUpload from './elements/FileUpload';


const FormArea = (props: FormAreaProps) => {
  const [{ handlerId }, drop] = useDrop(() => ({
    accept: ["form-element", "form-area-element"],
    drop: (item: FormAreaItem<ElementAttributes>, monitor) => {
      if (item.index === undefined) {
        props.onDrop(item);
      }
      //console.log(monitor);
    },
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
  }));

  const [filled, setfilled] = useState(false);

  return (
    <div>

      <div className='relative m-auto  '>

        <div  className='md:w-5/6 lg:w-5/6    mt-16 overflow-visible mx-auto mb-12 bg-slate-300  rounded-md flex flex-col justify-center'>

          <ul className={props.items.length > 0 ? 'py-32 relative m-0 flex flex-col items-start text-xl list-none    ' : 'py-32 relative m-0 flex items-start text-xl list-none    '}
            ref={drop}>

            {props.items.length > 0 && props.items.map((item, index) => {
              switch (item.type) {
                case ElementType.SHORT_TEXT:
                  return (
                    <li key={index} className='list-none box-border flex md:w-3/4 lg:w-11/12 mx-auto'>
                      <FormElement>
                        <ShortText
                          key={index}
                          {...item}
                          index={index}
                          numbering={index + 1}
                          moveCard={props.moveCard}
                          onDelete={() => props.onItemDelete(item)}
                          onQuestionTextChanged={(questionText) =>
                            props.onQuestionTextChange(item, questionText)
                          }
                          onQuestionSelected={() => props.onQuestionSelected(item)}

                        />
                        <div className=' flex flex-col my-4'>
                          <div className='my-2'>
                            <Button aria-label='Delete' leftIcon={<ImBin />} colorScheme="red" onClick={() => props.onItemDelete(item)}>Delete</Button>
                            {/* <button className='bg-red-600 p-2 rounded-lg inline-flex items-center'  aria-label='Delete'  color="red" onClick={() => props.onItemDelete(item)}><ImBin size={18} className="mr-2" color={"white"} /><span className='text-base'>Delete</span> </button> */}

                          </div>
                          <div className='my-2'>
                            <Button leftIcon={<FiSettings />} aria-label='Properties' colorScheme="yellow" onClick={() => props.setshowSidebar()}>Properties</Button>
                          </div>

                        </div>
                      </FormElement>
                    </li>
                  );
                case ElementType.CHECKBOX:
                  return (
                    <li key={index} className='list-none box-border flex md:w-3/4 lg:w-11/12 mx-auto'>
                      <Checkbox
                        key={index}
                        {...(item as FormAreaItem<CheckboxAttributes>)}
                        index={index}
                        numbering={index + 1}
                        moveCard={props.moveCard}
                        onDelete={() => props.onItemDelete(item)}
                        onQuestionTextChanged={(questionText) =>
                          props.onQuestionTextChange(item, questionText)
                        }
                        onQuestionSelected={() => props.onQuestionSelected(item)}
                        onOptionEdit={(option, choiceIndex) => props.onOptionEdit(item, option, choiceIndex)}
                        onOptionAdd={() => props.onOptionAdd(item)}
                        onOptionDelete={(choiceIndex) => props.onOptionDelete(item, choiceIndex)}
                      />
                      <div className='flex flex-col my-4'>
                        <div className='my-2'>
                          <Button aria-label='Delete' leftIcon={<ImBin />} colorScheme="red" onClick={() => props.onItemDelete(item)}>Delete</Button>
                          {/* <button className='bg-red-600 p-2 rounded-lg inline-flex items-center'  aria-label='Delete'  color="red" onClick={() => props.onItemDelete(item)}><ImBin size={18} className="mr-2" color={"white"} /><span className='text-base'>Delete</span> </button> */}

                        </div>
                        <div className='my-2'>
                          <Button leftIcon={<FiSettings />} aria-label='Properties' colorScheme="yellow" onClick={() => props.setshowSidebar()}>Properties</Button>
                        </div>

                      </div>

                    </li>
                  );
                case ElementType.LONG_TEXT:
                  return (
                    <li key={index} className='list-none box-border flex md:w-3/4 lg:w-11/12 mx-auto'>
                      <FormElement>

                        <LongText
                          key={index}
                          {...item}
                          index={index}
                          numbering={index + 1}
                          moveCard={props.moveCard}
                          onDelete={() => props.onItemDelete(item)}
                          onQuestionTextChanged={(questionText) =>
                            props.onQuestionTextChange(item, questionText)
                          }
                          onQuestionSelected={() => props.onQuestionSelected(item)}

                        />
                        <div className=' flex flex-col my-4 '>
                          <div className='my-2'>
                            <Button aria-label='Delete' leftIcon={<ImBin />} colorScheme="red" onClick={() => props.onItemDelete(item)}>Delete</Button>
                            {/* <button className='bg-red-600 p-2 rounded-lg inline-flex items-center'  aria-label='Delete'  color="red" onClick={() => props.onItemDelete(item)}><ImBin size={18} className="mr-2" color={"white"} /><span className='text-base'>Delete</span> </button> */}

                          </div>
                          <div className='my-2'>
                            <Button leftIcon={<FiSettings />} aria-label='Properties' colorScheme="yellow" onClick={() => props.setshowSidebar()}>Properties</Button>
                          </div>

                        </div>
                      </FormElement>
                    </li>
                  );

                case ElementType.RATING:
                  return (
                    <li key={index} className='list-none box-border flex md:w-3/4 lg:w-11/12 mx-auto'>
                      <FormElement>
                        <Rating
                          key={index}
                          {...(item as FormAreaItem<RatingAttributes>)}
                          index={index}
                          numbering={index + 1}
                          moveCard={props.moveCard}
                          onDelete={() => props.onItemDelete(item)}
                          onQuestionTextChanged={(questionText) =>
                            props.onQuestionTextChange(item, questionText)
                          }
                          onQuestionSelected={() => props.onQuestionSelected(item)}

                        />

                        <div className=' flex flex-col my-4 mx-auto'>
                          <div className='my-2'>
                            <Button aria-label='Delete' leftIcon={<ImBin />} colorScheme="red" onClick={() => props.onItemDelete(item)}>Delete</Button>
                            {/* <button className='bg-red-600 p-2 rounded-lg inline-flex items-center'  aria-label='Delete'  color="red" onClick={() => props.onItemDelete(item)}><ImBin size={18} className="mr-2" color={"white"} /><span className='text-base'>Delete</span> </button> */}
                          </div>
                          <div className='my-2'>
                            <Button leftIcon={<FiSettings />} aria-label='Properties' colorScheme="yellow" onClick={() => props.setshowSidebar()}>Properties</Button>
                          </div>
                        </div>
                      </FormElement>

                    </li>
                  );

                  case ElementType.FILE_UPLOAD:
                    return (
                      <li key={index} className='list-none box-border flex md:w-3/4 lg:w-11/12 mx-auto'>
                      <FormElement>
                        <FileUpload
                          key={index}
                          {...(item as FormAreaItem<FileUploadAttributes>)}
                          index={index}
                          numbering={index + 1}
                          moveCard={props.moveCard}
                          onDelete={() => props.onItemDelete(item)}
                          onQuestionTextChanged={(questionText) => props.onQuestionTextChange(item, questionText)}
                          onQuestionSelected={() => props.onQuestionSelected(item)}
                          />
                          <div className=' flex flex-col my-4 mx-auto'>
                          <div className='my-2'>
                            <Button aria-label='Delete' leftIcon={<ImBin />} colorScheme="red" onClick={() => props.onItemDelete(item)}>Delete</Button>
                            {/* <button className='bg-red-600 p-2 rounded-lg inline-flex items-center'  aria-label='Delete'  color="red" onClick={() => props.onItemDelete(item)}><ImBin size={18} className="mr-2" color={"white"} /><span className='text-base'>Delete</span> </button> */}
                          </div>
                          <div className='my-2'>
                            <Button leftIcon={<FiSettings />} aria-label='Properties' colorScheme="yellow" onClick={() => props.setshowSidebar()}>Properties</Button>
                          </div>
                        </div>


                      </FormElement>
                      </li>
                    )


              }

            })}


            <li className={props.items.length > 0 ? 'hidden' : `mt-8 cursor-default  w-full `}>

              <div className={props.items.length > 0 ? 'hidden' : 'py-10 px-5 text-black bg-gray-200 rounded-md text-center m-5  border-2 border-dashed border-black'}>

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