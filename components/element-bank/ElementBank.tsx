import React, { useState } from 'react'
import {
    CheckboxAttributes,
    ElementAttributes,
    ElementBankProps,
    ElementType,
    FormElement,
    ShortTextAttributes,
    LongTextAttributes,
    RatingAttributes,
    FileUploadAttributes,
    DatePickerAttributes,
  } from "./ElementBank.types";
import {AiFillPlusCircle} from 'react-icons/ai'
import { useDisclosure } from '@chakra-ui/react'
import {HiArrowRight} from 'react-icons/hi'
import {Drawer,DrawerBody,DrawerFooter,DrawerHeader,DrawerOverlay,DrawerContent,DrawerCloseButton} from '@chakra-ui/react'
import Element from "./Element";
import {AiOutlineArrowDown,AiOutlineCopy, AiOutlineDown,AiOutlineCodepenCircle,AiFillStar,AiOutlinePlus,AiTwotoneCalendar} from 'react-icons/ai'
import {BsTextareaResize, BsUpload} from "react-icons/bs";
import {FcRating} from "react-icons/fc"
import {FiUpload} from "react-icons/fi"
import {RiCheckboxMultipleLine} from "react-icons/ri"


const ElementBank = (props:ElementBankProps) => {

    const [width, setwidth] = useState('60');
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [panelStatus, setpanelStatus] = useState(true)
 
    const handleOpen = () => {
//        console.log('Sidebar panel opens!')
        setpanelStatus(false)
        onOpen();
    }

    const handleClose = () => {
        onClose();
        setpanelStatus(true);
    }
    

    const elements: FormElement<ElementAttributes>[] = [
        {
            type:ElementType.SHORT_TEXT,
            question:"Type your Question",
            attributes:{
                required:false,
                styling:{
                    fontColor:"#000000",
                    questionImage:"",
                    fontType:'inter'
                },
                icon:AiOutlineCodepenCircle,
                inputType:"text",
            } as ShortTextAttributes,
            displayName:"Short Text",
        },
        {
            type:ElementType.CHECKBOX,
            question:"Type your Question",
            attributes:{
                required:false,
                styling:{
                    fontColor:"#000000",
                    questionImage:"",
                    fontType:'inter'
                },
                icon:RiCheckboxMultipleLine,
                choices:[{label:"Yes",value:"Yes" ,id:"1"}, {label:"No", value:"No" ,id:"2"}],
            } as CheckboxAttributes,
            displayName:"Checkbox"
        },
        {
            type:ElementType.LONG_TEXT,
            question:"Type your Question",
            attributes:{
                required:false,
                styling:{
                    fontColor:"#000000",
                    questionImage:"",
                    fontType:'inter'

                },
                icon:BsTextareaResize,
            } as LongTextAttributes,
            displayName:"Long Text",
        },
        

        {
            type:ElementType.RATING,
            question:"Type your Question",
            attributes:{
                required:false,
                styling:{
                    fontColor:"#000000",
                    hoverColor:"#c31432",
                    fillColor: "#000000",
                    questionImage:"",
                    fontType:'inter'

                },
                icon:FcRating,
                limit:5,
                emoji:"Star"
            } as RatingAttributes,
            displayName:"Rating",
        },
        {
            type:ElementType.FILE_UPLOAD,
            question:"Type your Question",
            attributes:{
                required:false,
                styling:{
                    fontColor:"#000000",
                    questionImage:"",
                    fontType:'inter'
                },
                icon:BsUpload,
                typeofFile:"image"
            } as FileUploadAttributes,
            displayName:"File Upload",
            
        },
        {
            type:ElementType.DATEPICKER,
            question:"Type your Question",
            attributes:{
                required:false,
                styling:{
                    fontColor:"#000000",
                    questionImage:"",
                    fontType:'inter'
                },
                icon:AiTwotoneCalendar,
            } as DatePickerAttributes,
            displayName:"Date Picker",

        }
        
    ];


  return (
    <>
        <Drawer placement={"left"} onClose={handleClose} isOpen={isOpen} size={"xs"} isFullHeight={false} >
        <DrawerContent bgColor={"#000116"} >
          <DrawerHeader borderBottomWidth='1px' color={"#FFFFFF"} className="text-center flex flex-row"> 
          <div>Drag & Drop an element to add it to your form </div>
          <div className='items-end flex'><HiArrowRight size="1.5em"/></div>
          </DrawerHeader>
          <DrawerBody>
            
            {elements.map((element) => {
                return(
                    <Element key={element.type} {...element} handleClose={handleClose}  />
                    
                    )
                })}
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <div className={panelStatus ?`fixed h-fit flex w-68 overflow-auto my-72 transition ease-out duration-500 z-50`: `fixed h-full flex w-56 overflow-auto transition ease-out duration-500 -translate-x-56`} 
      onClick={handleOpen} > 
            <div className={`togglePanel flex my-auto text-violet-600 rounded-r-2xl py-2 px-4 justify-center gap-1.5 w-full  bg-black  border-y-2 border-r-2 border-violet-800    cursor-pointer`} >
                <p className='flex toggleText pointer items-center text-2xl font-bold font-montserrat '>Add Form Elements</p>
                <AiFillPlusCircle size="2.5em" className="bg-background rounded-full" />
            </div>
        </div>
    </>
  )
}

export default ElementBank