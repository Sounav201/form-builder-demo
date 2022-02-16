import React from 'react'
import { ElementAttributes, ElementProps } from "./ElementBank.types";
import { useDrag } from "react-dnd";
import Icon from '@chakra-ui/icon'
import { Link } from '@chakra-ui/layout'
import { useEffect } from 'react'

import { Divider, Flex, Heading, Text } from '@chakra-ui/layout'


const Element = ({ type, question, displayName, attributes,handleClose }: ElementProps<ElementAttributes>) => {

    const [{ isDragging }, dragRef] = useDrag(
        () => ({
            type: "form-element",
            item: {
                type,
                question,
                attributes,
            },
            collect: (monitor) => ({
                isDragging: !!monitor.isDragging(),
            }),
        }),
        []
    );
    useEffect(() => {
        if(isDragging)
         { // console.log('Item being dragged!'); 
             
          handleClose();
        }

    }, [isDragging])


    return (
        <div ref={dragRef} style={{
            opacity: isDragging ? 0.5 : 1,
            cursor: "move",}}
            className={isDragging ? 'my-8 border-2 border-white border-solid p-3 bg-purple-800 hover:bg-transparent transition duration-300 rounded-lg cursor-pointer' : 'my-8 p-3 bg-purple-800 hover:bg-transparent transition duration-300 rounded-lg cursor-pointer'}>
            <Flex>
                <Icon as={attributes.icon} fontSize={"2xl"} color={"white"} className={"w-5 h-7 ml-2 -mr-1 text-violet-200 hover:text-violet-100 transition duration-300 ease-in-out"} />
                <Text ml={5} color={"yellow.300"} as="em" fontWeight={"bold"}>{displayName}</Text>
            </Flex>

        </div>

    )
}

export default Element