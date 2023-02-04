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
            className={isDragging ? 'my-6 border-2 border-white p-3 bg-violet-800 hover:bg-transparent transition duration-300 rounded-xl cursor-pointer' : 'my-6 p-3 border-2 border-violet-800 bg-transparent hover:bg-transparent hover:scale-105 transition duration-300 rounded-xl cursor-pointer'}>
            <Flex>
                <Icon as={attributes.icon} fontSize={"2xl"} color={"#5B21B6"} className={"w-5 h-7 mx-2 text-violet-200 hover:text-violet-100 transition duration-300 ease-in-out"} />
                <Text ml={5} className="text-violet-800 text-base" as="em" fontWeight={"bold"}>{displayName}</Text>
            </Flex>

        </div>

    )
}

export default Element