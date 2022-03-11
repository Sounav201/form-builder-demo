import React, { useState } from 'react'
import {
    CheckboxAttributes,
    ElementAttributes,
    ElementBankProps,
    ElementType,
    FormElement,
    ShortTextAttributes,
  } from "./ElementBank.types";
import {AiFillPlusCircle} from 'react-icons/ai'
import { useDisclosure } from '@chakra-ui/react'
import {Drawer,DrawerBody,DrawerFooter,DrawerHeader,DrawerOverlay,DrawerContent,DrawerCloseButton} from '@chakra-ui/react'
import Element from "./Element";
import {AiOutlineArrowDown,AiOutlineCopy, AiOutlineDown,AiOutlineCodepenCircle,AiFillStar,AiOutlinePlus} from 'react-icons/ai'
import {FcRating} from "react-icons/fc"
import {FiUpload} from "react-icons/fi"
import {RiCheckboxMultipleLine} from "react-icons/ri"


const ElementBank = (props:ElementBankProps) => {

    const [width, setwidth] = useState('60');
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [panelStatus, setpanelStatus] = useState(true)
 
    const handleOpen = () => {
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
                    fontBackground:"#D1D5DB",
                    fontColor:"#000000"
                },
                icon:AiOutlineCodepenCircle,
            } as ShortTextAttributes,
            displayName:"Short Text",
        },
        {
            type:ElementType.CHECKBOX,
            question:"Type your Question",
            attributes:{
                required:false,
                styling:{
                    fontBackground:"#D1D5DB",
                    fontColor:"#000000"
                },
                icon:RiCheckboxMultipleLine,
                choices:[{label:"Yes",value:"Yes" ,id:"1"}, {label:"No", value:"No" ,id:"2"}],
            } as CheckboxAttributes,
            displayName:"Checkbox"
        },

    ];


  return (
    <>
        <Drawer placement={"left"} onClose={handleClose} isOpen={isOpen} size={"xs"} isFullHeight={false} >
        <DrawerContent bgColor={"black"}>
          <DrawerHeader borderBottomWidth='1px' color={"white"}>Drag and drop an element on to the form</DrawerHeader>
          <DrawerBody>
            
            {elements.map((element) => {
                return(
                    <Element key={element.type} {...element} handleClose={handleClose}  />
                    
                    )
                })}
          </DrawerBody>
        </DrawerContent>
      </Drawer>

        <div className={panelStatus ?`fixed h-3/4 flex w-60  overflow-auto  transition ease-out duration-500 `: `fixed h-3/4 flex w-60 overflow-auto transition ease-out duration-500 -translate-x-56`} onClick={handleOpen} > 
        <span className={`togglePanel   my-auto text-white rounded-lg  py-4 text-center w-full block inset-y-0 left-2  bg-blue-500   cursor-pointer`} >
            <span className='toggleText pointer text-lg mx-2'>Add Form Elements</span>
            <span className='absolute right-0 mr-2 z-50'><AiFillPlusCircle size={32} className="bg-blue-500"/> </span>
        </span>
        </div>
    </>
  )
}

export default ElementBank