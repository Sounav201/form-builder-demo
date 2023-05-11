import React from "react";
import { useDrop } from "react-dnd";
import { FormAreaItem, FormAreaProps } from "./FormArea.types";
import { FiPlusCircle, FiSettings } from "react-icons/fi";
import { useCallback, useRef, useState } from "react";
import { ImBin } from "react-icons/im";
import ShortText from "./elements/ShortText";
import {
  ShortTextAttributes,
  CheckboxAttributes,
  ElementAttributes,
  ElementType,
  RatingAttributes,
  FileUploadAttributes,
  DatePickerAttributes,
} from "../element-bank/ElementBank.types";
import Checkbox from "./elements/Checkbox";
import { Button } from "@chakra-ui/react";
import FormElement from "./FormElement";
import LongText from "./elements/LongText";
import Rating from "./elements/Rating";
import FileUpload from "./elements/FileUpload";
import DatePickerInput from "./elements/DatePickerInput";

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
      };
    },
  }));

  return (
    <div>
      <div className="relative m-auto  ">
        <div className="md:w-5/6 lg:w-5/6    mt-16 overflow-visible mx-auto mb-12 bg-violet-200  rounded-md flex flex-col justify-center">
        <div
  className={`text-3xl font-bold mt-4 text-center outline-none w-full font-${props.chosenFont}`}
  contentEditable
  onBlur={(e) => {
    props.onFormHeadingChanged(e.target.innerText);
  }}
  defaultValue={props.formHeading}
  suppressContentEditableWarning={true}
  style={{
    color: "black",
  }}          >
            {props.formHeading}
          </div>

          <ul
            className={
              props.items.length > 0
                ? "py-8 relative m-0 flex flex-col gap-4  items-start text-xl list-none    "
                : "py-8 relative m-0 flex items-start text-xl list-none    "
            }
            ref={drop}
          >
            {props.items.length > 0 &&
              props.items.map((item, index) => {
                switch (item.type) {
                  case ElementType.SHORT_TEXT:
                    return (
                      <li
                        key={index}
                        className="list-none box-border flex md:w-3/4 lg:w-11/12 mx-auto"
                      >
                        <ShortText
                          key={index}
                          {...(item as FormAreaItem<ShortTextAttributes>)}
                          index={index}
                          numbering={index + 1}
                          moveCard={props.moveCard}
                          onDelete={() => props.onItemDelete(item)}
                          onQuestionTextChanged={(questionText) =>
                            props.onQuestionTextChange(item, questionText)
                          }
                          onQuestionSelected={() =>
                            props.onQuestionSelected(item)
                          }
                        />
                        <div className=" flex flex-col gap-4 my-4">
                          <div className="">
                            <Button
                              aria-label="Delete"
                              colorScheme="red"
                              onClick={() => props.onItemDelete(item)}
                              className="absolute group flex justify-center items-center overflow-hidden transform duration-300  "
                            >
                              <span className="absolute left-0 w-full h-0 transition-all bg-rose-700 opacity-100 group-hover:h-full group-hover:top-0  ease "></span>
                              <span className="absolute right-0 flex items-center w-40 md:w-20 h-10 duration-300 transform translate-y-10 translate-x-10 group-hover:translate-y-0 ">
                                <ImBin size="1.5em" />
                              </span>
                              <span
                                className={`relative py-1 px-4 text-xs md:text-base font-monospace transform translate-x-0 group-hover:-translate-x-4 duration-300`}
                              >
                                Delete
                              </span>
                            </Button>
                            {/* <button className='bg-red-600 p-2 rounded-lg inline-flex items-center'  aria-label='Delete'  color="red" onClick={() => props.onItemDelete(item)}><ImBin size={18} className="mr-2" color={"white"} /><span className='text-base'>Delete</span> </button> */}
                          </div>
                          <div className="">
                            <Button
                              aria-label="Properties"
                              colorScheme="yellow"
                              onClick={() => props.setshowSidebar()}
                              className="absolute group flex justify-center items-center overflow-hidden transform duration-300  "
                            >
                              <span className="absolute left-0 w-full h-0 transition-all bg-orange-400 opacity-100 group-hover:h-full group-hover:top-0  ease "></span>
                              <span className="absolute right-0 flex items-center w-40 md:w-20 h-10 duration-300 transform translate-y-10 translate-x-10 group-hover:translate-y-0 ">
                                <FiSettings size="1.5em" />
                              </span>
                              <span
                                className={`relative py-1 px-4 text-xs md:text-base font-monospace transform translate-x-0 group-hover:-translate-x-4 duration-300`}
                              >
                                Properties
                              </span>
                            </Button>
                          </div>
                        </div>
                      </li>
                    );
                  case ElementType.CHECKBOX:
                    return (
                      <li
                        key={index}
                        className="list-none box-border flex md:w-3/4 lg:w-11/12 mx-auto"
                      >
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
                          onQuestionSelected={() =>
                            props.onQuestionSelected(item)
                          }
                          onOptionEdit={(option, choiceIndex) =>
                            props.onOptionEdit(item, option, choiceIndex)
                          }
                          onOptionAdd={() => props.onOptionAdd(item)}
                          onOptionDelete={(choiceIndex) =>
                            props.onOptionDelete(item, choiceIndex)
                          }
                        />
                        <div className=" flex flex-col gap-4 my-4">
                          <div className="">
                            <Button
                              aria-label="Delete"
                              colorScheme="red"
                              onClick={() => props.onItemDelete(item)}
                              className="absolute group flex justify-center items-center overflow-hidden transform duration-300  "
                            >
                              <span className="absolute left-0 w-full h-0 transition-all bg-rose-700 opacity-100 group-hover:h-full group-hover:top-0  ease "></span>
                              <span className="absolute right-0 flex items-center w-40 md:w-20 h-10 duration-300 transform translate-y-10 translate-x-10 group-hover:translate-y-0 ">
                                <ImBin size="1.5em" />
                              </span>
                              <span
                                className={`relative py-1 px-4 text-xs md:text-base font-monospace transform translate-x-0 group-hover:-translate-x-4 duration-300`}
                              >
                                Delete
                              </span>
                            </Button>
                            {/* <button className='bg-red-600 p-2 rounded-lg inline-flex items-center'  aria-label='Delete'  color="red" onClick={() => props.onItemDelete(item)}><ImBin size={18} className="mr-2" color={"white"} /><span className='text-base'>Delete</span> </button> */}
                          </div>
                          <div className="">
                            <Button
                              aria-label="Properties"
                              colorScheme="yellow"
                              onClick={() => props.setshowSidebar()}
                              className="absolute group flex justify-center items-center overflow-hidden transform duration-300  "
                            >
                              <span className="absolute left-0 w-full h-0 transition-all bg-orange-400 opacity-100 group-hover:h-full group-hover:top-0  ease "></span>
                              <span className="absolute right-0 flex items-center w-40 md:w-20 h-10 duration-300 transform translate-y-10 translate-x-10 group-hover:translate-y-0 ">
                                <FiSettings size="1.5em" />
                              </span>
                              <span
                                className={`relative py-1 px-4 text-xs md:text-base font-monospace transform translate-x-0 group-hover:-translate-x-4 duration-300`}
                              >
                                Properties
                              </span>
                            </Button>
                          </div>
                        </div>
                      </li>
                    );
                  case ElementType.LONG_TEXT:
                    return (
                      <li
                        key={index}
                        className="list-none box-border flex md:w-3/4 lg:w-11/12 mx-auto"
                      >
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
                            onQuestionSelected={() =>
                              props.onQuestionSelected(item)
                            }
                          />
                          <div className=" flex flex-col gap-4 my-4">
                            <div className="">
                              <Button
                                aria-label="Delete"
                                colorScheme="red"
                                onClick={() => props.onItemDelete(item)}
                                className="absolute group flex justify-center items-center overflow-hidden transform duration-300  "
                              >
                                <span className="absolute left-0 w-full h-0 transition-all bg-rose-700 opacity-100 group-hover:h-full group-hover:top-0  ease "></span>
                                <span className="absolute right-0 flex items-center w-40 md:w-20 h-10 duration-300 transform translate-y-10 translate-x-10 group-hover:translate-y-0 ">
                                  <ImBin size="1.5em" />
                                </span>
                                <span
                                  className={`relative py-1 px-4 text-xs md:text-base font-monospace transform translate-x-0 group-hover:-translate-x-4 duration-300`}
                                >
                                  Delete
                                </span>
                              </Button>
                              {/* <button className='bg-red-600 p-2 rounded-lg inline-flex items-center'  aria-label='Delete'  color="red" onClick={() => props.onItemDelete(item)}><ImBin size={18} className="mr-2" color={"white"} /><span className='text-base'>Delete</span> </button> */}
                            </div>
                            <div className="">
                              <Button
                                aria-label="Properties"
                                colorScheme="yellow"
                                onClick={() => props.setshowSidebar()}
                                className="absolute group flex justify-center items-center overflow-hidden transform duration-300  "
                              >
                                <span className="absolute left-0 w-full h-0 transition-all bg-orange-400 opacity-100 group-hover:h-full group-hover:top-0  ease "></span>
                                <span className="absolute right-0 flex items-center w-40 md:w-20 h-10 duration-300 transform translate-y-10 translate-x-10 group-hover:translate-y-0 ">
                                  <FiSettings size="1.5em" />
                                </span>
                                <span
                                  className={`relative py-1 px-4 text-xs md:text-base font-monospace transform translate-x-0 group-hover:-translate-x-4 duration-300`}
                                >
                                  Properties
                                </span>
                              </Button>
                            </div>
                          </div>
                        </FormElement>
                      </li>
                    );

                  case ElementType.RATING:
                    return (
                      <li
                        key={index}
                        className="list-none box-border flex md:w-3/4 lg:w-11/12 mx-auto"
                      >
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
                            onQuestionSelected={() =>
                              props.onQuestionSelected(item)
                            }
                          />

                          <div className=" flex flex-col gap-4 my-4">
                            <div className="">
                              <Button
                                aria-label="Delete"
                                colorScheme="red"
                                onClick={() => props.onItemDelete(item)}
                                className="absolute group flex justify-center items-center overflow-hidden transform duration-300  "
                              >
                                <span className="absolute left-0 w-full h-0 transition-all bg-rose-700 opacity-100 group-hover:h-full group-hover:top-0  ease "></span>
                                <span className="absolute right-0 flex items-center w-40 md:w-20 h-10 duration-300 transform translate-y-10 translate-x-10 group-hover:translate-y-0 ">
                                  <ImBin size="1.5em" />
                                </span>
                                <span
                                  className={`relative py-1 px-4 text-xs md:text-base font-monospace transform translate-x-0 group-hover:-translate-x-4 duration-300`}
                                >
                                  Delete
                                </span>
                              </Button>
                              {/* <button className='bg-red-600 p-2 rounded-lg inline-flex items-center'  aria-label='Delete'  color="red" onClick={() => props.onItemDelete(item)}><ImBin size={18} className="mr-2" color={"white"} /><span className='text-base'>Delete</span> </button> */}
                            </div>
                            <div className="">
                              <Button
                                aria-label="Properties"
                                colorScheme="yellow"
                                onClick={() => props.setshowSidebar()}
                                className="absolute group flex justify-center items-center overflow-hidden transform duration-300  "
                              >
                                <span className="absolute left-0 w-full h-0 transition-all bg-orange-400 opacity-100 group-hover:h-full group-hover:top-0  ease "></span>
                                <span className="absolute right-0 flex items-center w-40 md:w-20 h-10 duration-300 transform translate-y-10 translate-x-10 group-hover:translate-y-0 ">
                                  <FiSettings size="1.5em" />
                                </span>
                                <span
                                  className={`relative py-1 px-4 text-xs md:text-base font-monospace transform translate-x-0 group-hover:-translate-x-4 duration-300`}
                                >
                                  Properties
                                </span>
                              </Button>
                            </div>
                          </div>
                        </FormElement>
                      </li>
                    );

                  case ElementType.DATEPICKER:
                    return (
                      <li
                        key={index}
                        className="list-none box-border flex md:w-3/4 lg:w-11/12 mx-auto"
                      >
                        <DatePickerInput
                          key={index}
                          {...(item as FormAreaItem<DatePickerAttributes>)}
                          index={index}
                          numbering={index + 1}
                          moveCard={props.moveCard}
                          onDelete={() => props.onItemDelete(item)}
                          onQuestionTextChanged={(questionText) =>
                            props.onQuestionTextChange(item, questionText)
                          }
                          onQuestionSelected={() =>
                            props.onQuestionSelected(item)
                          }
                        />
                        <div className=" flex flex-col gap-4 my-4">
                          <div className="">
                            <Button
                              aria-label="Delete"
                              colorScheme="red"
                              onClick={() => props.onItemDelete(item)}
                              className="absolute group flex justify-center items-center overflow-hidden transform duration-300  "
                            >
                              <span className="absolute left-0 w-full h-0 transition-all bg-rose-700 opacity-100 group-hover:h-full group-hover:top-0  ease "></span>
                              <span className="absolute right-0 flex items-center w-40 md:w-20 h-10 duration-300 transform translate-y-10 translate-x-10 group-hover:translate-y-0 ">
                                <ImBin size="1.5em" />
                              </span>
                              <span
                                className={`relative py-1 px-4 text-xs md:text-base font-monospace transform translate-x-0 group-hover:-translate-x-4 duration-300`}
                              >
                                Delete
                              </span>
                            </Button>
                            {/* <button className='bg-red-600 p-2 rounded-lg inline-flex items-center'  aria-label='Delete'  color="red" onClick={() => props.onItemDelete(item)}><ImBin size={18} className="mr-2" color={"white"} /><span className='text-base'>Delete</span> </button> */}
                          </div>
                          <div className="">
                            <Button
                              aria-label="Properties"
                              colorScheme="yellow"
                              onClick={() => props.setshowSidebar()}
                              className="absolute group flex justify-center items-center overflow-hidden transform duration-300  "
                            >
                              <span className="absolute left-0 w-full h-0 transition-all bg-orange-400 opacity-100 group-hover:h-full group-hover:top-0  ease "></span>
                              <span className="absolute right-0 flex items-center w-40 md:w-20 h-10 duration-300 transform translate-y-10 translate-x-10 group-hover:translate-y-0 ">
                                <FiSettings size="1.5em" />
                              </span>
                              <span
                                className={`relative py-1 px-4 text-xs md:text-base font-monospace transform translate-x-0 group-hover:-translate-x-4 duration-300`}
                              >
                                Properties
                              </span>
                            </Button>
                          </div>
                        </div>
                      </li>
                    );

                  case ElementType.FILE_UPLOAD:
                    return (
                      <li
                        key={index}
                        className="list-none box-border flex md:w-3/4 lg:w-11/12 mx-auto"
                      >
                        <FormElement>
                          <FileUpload
                            key={index}
                            {...(item as FormAreaItem<FileUploadAttributes>)}
                            index={index}
                            numbering={index + 1}
                            moveCard={props.moveCard}
                            onDelete={() => props.onItemDelete(item)}
                            onQuestionTextChanged={(questionText) =>
                              props.onQuestionTextChange(item, questionText)
                            }
                            onQuestionSelected={() =>
                              props.onQuestionSelected(item)
                            }
                          />
                          <div className=" flex flex-col gap-4 my-4">
                            <div className="">
                              <Button
                                aria-label="Delete"
                                colorScheme="red"
                                onClick={() => props.onItemDelete(item)}
                                className="absolute group flex justify-center items-center overflow-hidden transform duration-300  "
                              >
                                <span className="absolute left-0 w-full h-0 transition-all bg-rose-700 opacity-100 group-hover:h-full group-hover:top-0  ease "></span>
                                <span className="absolute right-0 flex items-center w-40 md:w-20 h-10 duration-300 transform translate-y-10 translate-x-10 group-hover:translate-y-0 ">
                                  <ImBin size="1.5em" />
                                </span>
                                <span
                                  className={`relative py-1 px-4 text-xs md:text-base font-monospace transform translate-x-0 group-hover:-translate-x-4 duration-300`}
                                >
                                  Delete
                                </span>
                              </Button>
                              {/* <button className='bg-red-600 p-2 rounded-lg inline-flex items-center'  aria-label='Delete'  color="red" onClick={() => props.onItemDelete(item)}><ImBin size={18} className="mr-2" color={"white"} /><span className='text-base'>Delete</span> </button> */}
                            </div>
                            <div className="">
                              <Button
                                aria-label="Properties"
                                colorScheme="yellow"
                                onClick={() => props.setshowSidebar()}
                                className="absolute group flex justify-center items-center overflow-hidden transform duration-300  "
                              >
                                <span className="absolute left-0 w-full h-0 transition-all bg-orange-400 opacity-100 group-hover:h-full group-hover:top-0  ease "></span>
                                <span className="absolute right-0 flex items-center w-40 md:w-20 h-10 duration-300 transform translate-y-10 translate-x-10 group-hover:translate-y-0 ">
                                  <FiSettings size="1.5em" />
                                </span>
                                <span
                                  className={`relative py-1 px-4 text-xs md:text-base font-monospace transform translate-x-0 group-hover:-translate-x-4 duration-300`}
                                >
                                  Properties
                                </span>
                              </Button>
                            </div>
                          </div>
                        </FormElement>
                      </li>
                    );
                }
              })}

            <li
              className={
                props.items.length > 0
                  ? "hidden"
                  : `mt-8 cursor-default  w-full `
              }
            >
              <div
                className={
                  props.items.length > 0
                    ? "hidden"
                    : "py-10 px-5 text-black bg-gray-200 rounded-md text-center m-5  border-2 border-dashed border-black"
                }
              >
                <FiPlusCircle
                  size={32}
                  className="inline-block"
                  color="black"
                />
                <div className="inline-block ml-2 text-xl">
                  Drag your first element from the left.
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FormArea;
