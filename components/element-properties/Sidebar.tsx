import React, { useEffect, useState } from 'react'
import { ElementPropertiesProps } from './ElementProperties.types'
import { FiSettings, FiTrash2 } from 'react-icons/fi'
import { Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton } from '@chakra-ui/react'
import { FormControl, FormLabel, Select, Stack, Switch, useDisclosure, Button } from '@chakra-ui/react'
import { RatingAttributes } from '../element-bank/ElementBank.types'
const Sidebar = (props: ElementPropertiesProps) => {


    const [fontColor, setfontColor] = useState(props.selectedItem ? props.selectedItem.attributes.styling.fontColor : "");
    const [isRequired, setisRequired] = useState(props.selectedItem ? props.selectedItem.attributes.required : false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isSelected, setisSelected] = useState(props.selectedItem ? props.selectedItem.isSelected : true)
    const [ratingType, setratingType] = useState(props.selectedItem !=null ?  props.selectedItem.type == "rating" ?  (props.selectedItem.attributes as RatingAttributes).emoji : "" : "")
    const [ratingfillColor,setratingfillColor] = useState(props.selectedItem !=null ?  props.selectedItem.type == "rating" ?  (props.selectedItem.attributes as RatingAttributes).styling.fillColor : "#000000" : "#000000")
    const [ratinghoverColor, setratinghoverColor] = useState(props.selectedItem !=null ?  props.selectedItem.type == "rating" ?  (props.selectedItem.attributes as RatingAttributes).styling.hoverColor : "#c31432" : "#c31432")

    useEffect(() => {
        if (props.selectedItem !== null) {
            console.log("Element : ", props.selectedItem)
            if(props.selectedItem.type == "rating")
            {
                //console.log("Rating type : ", ratingType)

                setratingType("Star")
                setratingfillColor((props.selectedItem.attributes as RatingAttributes).styling.fillColor)
                setratinghoverColor((props.selectedItem.attributes as RatingAttributes).styling.hoverColor)
            }
            else{
                setratingType("")
            }
            setfontColor(props.selectedItem.attributes.styling.fontColor);
            setisRequired(props.selectedItem.attributes.required);

        }

    }, [props.selectedItem])

    if (props.selectedItem === null) {
        return null;
    }




    const handleClose = () => {
        //setShowSidebar(false);
        //isSelected = false;
        // setisSelected(false);
        //console.log('S')
        props.setshowSidebar();
    }

    

    return (
        <div>   <div
            className={`top-0 right-0 w-[20vw] bg-blue-600  p-10 pl-20 text-white fixed h-full z-40 transition  ease-in-out duration-300 ${isSelected && props.sidebarStatus ? "translate-x-0 " : "translate-x-full"
                }`}>

            <h4 className="mt-20 text-2xl font-semibold text-white">
                Element Properties
            </h4>

            <div className='my-4 py-2 flex flex-col'>
                <label className='font-medium '>Required Field?</label>
                <Switch size='md' mt={1} colorScheme={'red'} onChange={() => {
                    setisRequired(prevstate => !prevstate);
                    if (props.selectedItem != null) {
                        props.selectedItem.attributes.required = !props.selectedItem.attributes.required
                        props.onItemPropertiesChange(props.selectedItem);
                    }
                }} />
                <label className='text-sm text-yellow-400'>Prevent submission if this question is empty.</label>
            </div>


            <div className='my-4 py-2 flex flex-col'>
                <label className='font-medium '>Text Color</label>
                <input
                    className='rounded-md my-1'
                    type="color"
                    value={fontColor}
                    onChange={(e) => {
                        setfontColor(e.target.value);
                        if (props.selectedItem !== null) {
                            props.selectedItem.attributes.styling.fontColor = e.target.value;
                            props.onItemPropertiesChange(props.selectedItem);
                        }
                    }}
                />

            </div>
    
            {ratingType.length> 0 && (
                <div className='my-2 py-2 flex flex-col'>
                    <label className='font-medium'>Block Color</label>
                    <input 
                        className='rounded-md my-1'
                        type="color"
                        value={ratingfillColor}
                        onChange = {(e) => {
                            setratingfillColor(e.target.value);
                            if(props.selectedItem !== null)
                            {
                                (props.selectedItem.attributes as RatingAttributes).styling.fillColor = e.target.value;
                                props.onItemPropertiesChange(props.selectedItem);
                            }
                        }}

                         />
                </div>
            )}
              {ratingType.length> 0 && (
                <div className='my-2 py-2 flex flex-col'>
                    <label className='font-medium'>Fill Color</label>
                    <input 
                        className='rounded-md my-1'
                        type="color"
                        value={ratinghoverColor}
                        onChange = {(e) => {
                            setratingfillColor(e.target.value);
                            if(props.selectedItem !== null)
                            {
                                (props.selectedItem.attributes as RatingAttributes).styling.hoverColor = e.target.value;
                                props.onItemPropertiesChange(props.selectedItem);
                            }
                        }}

                         />
                </div>
            )}

            {ratingType.length > 0 && (
                <div className='my-2 py-2 flex flex-col'>
                    <label className='font-medium '>Rating type</label>
                    <Select bg='tomato' borderColor='tomato'
                    color='black' placeholder='Select option' onChange={(e) => {
                        //console.log(e.target.value);
                        setratingType(e.target.value);
                        if(props.selectedItem!==null)
                        {
                            (props.selectedItem.attributes as RatingAttributes).emoji = e.target.value;
                            props.onItemPropertiesChange(props.selectedItem);
                        }
                    }}>
                        <option className='bg-purple-500 text-yellow-800' value='Star'>Star </option>
                        <option value='Heart'>Heart</option>
                        <option value='Smiley'>Smiley</option>
                    </Select>

                </div>

            )}


            {/*Set up a close button mechanism by taking care of the states from the Parent component -> DONE  */}
            <div className='my-24'>
                <Button aria-label='Close' colorScheme={'orange'} onClick={handleClose}>
                    Close
                </Button>
            </div>

        </div></div>
    )
}

export default Sidebar