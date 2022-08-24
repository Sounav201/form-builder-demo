import React, { useEffect, useState } from 'react'
import { ElementPropertiesProps } from './ElementProperties.types'
import { FiSettings, FiTrash2 } from 'react-icons/fi'
import { Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton } from '@chakra-ui/react'
import { FormControl, FormLabel, Select, Stack, Switch, useDisclosure,Button } from '@chakra-ui/react'

const ElementProperties = (props: ElementPropertiesProps) => {

    const [fontColor, setfontColor] = useState(props.selectedItem ? props.selectedItem.attributes.styling.fontColor : "");
    const [fontBackground, setfontBackground] = useState(props.selectedItem ? props.selectedItem.attributes.styling.fontBackground : "");
    const [shouldOpen, setshouldOpen ] = useState(props.selectedItem == null? false : true)
    const [ratingType, setratingType] = useState("")
    
    const { isOpen, onOpen, onClose } = useDisclosure();
    console.log("ELEMENT PROPERTIES SIDEBAR OPEN!");
    console.log('Element Properties : ', props.selectedItem);
    alert(props.selectedItem);

    useEffect(() => {
        if (props.selectedItem !== null) {
            console.log('Element : ', props.selectedItem)
            setfontColor(props.selectedItem.attributes.styling.fontColor);
            setfontBackground(props.selectedItem.attributes.styling.fontBackground);
            
        }

    }, [props.selectedItem])

    if (props.selectedItem === null)
        return null;

    const handleClose = () => {
        console.log("Should close!")
        onClose();
        setshouldOpen(false);
    }
    //console.log(shouldOpen)
    return (
        <div>
            <Drawer placement='right' onClose={onClose} isOpen={isOpen} size={"xs"} closeOnOverlayClick={true}  isFullHeight={false}>
                <DrawerContent bgColor={"purple"}>
                    <DrawerHeader borderBottomWidth='1px' color={"white"}>Element Properties</DrawerHeader>
                    <DrawerBody>

                        <div className='my-4 py-2 flex flex-col'>
                            <label>Text Color</label>
                            <input
                                type="color"
                                value={fontColor}
                                onChange={(e) => {
                                    console.log(e);
                                    setfontColor(e.target.value);
                                    if (props.selectedItem !== null) {
                                        props.selectedItem.attributes.styling.fontColor = e.target.value;
                                        props.onItemPropertiesChange(props.selectedItem);
                                    }
                                }}
                            />

                        </div>
                        <div className='my-4 py-2 flex flex-col'>
                            <label>Text Background Color</label>
                            <input
                                type="color"
                                value={fontBackground}
                                onChange={(e) => {
                                    console.log(e);
                                    setfontBackground(e.target.value);
                                    if (props.selectedItem !== null) {
                                        props.selectedItem.attributes.styling.fontBackground =
                                            e.target.value;
                                        props.onItemPropertiesChange(props.selectedItem);
                                    }
                                }}
                            />

                        </div>



                    </DrawerBody>
                    <DrawerFooter>
            <Button variant='outline' mr={3} onClick={handleClose}>
              Cancel
            </Button>
          </DrawerFooter>
                </DrawerContent>
            </Drawer>


        </div>
    )
}

export default ElementProperties