import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import ElementBank from '../components/element-bank/ElementBank'
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { FormAreaItem } from "../components/form-area/FormArea.types";
import { ElementAttributes } from "../components/element-bank/ElementBank.types";
import { useCallback, useEffect, useState } from "react";
import { nanoid } from "nanoid";
import {
  FORM_ITEMS_SESSION_KEY,
  SessionStorageService,
} from "../services/SessionStorageService";
import FormArea from '../components/form-area/FormArea';
import ElementProperties from '../components/element-properties/ElementProperties';
import { FormControl, FormLabel, Select, Stack, Switch, useDisclosure,Button } from '@chakra-ui/react'
import Sidebar from '../components/element-properties/Sidebar';

const Home: NextPage = () => {

  const [selectedItem, setSelectedItem] = useState(
    null as FormAreaItem<ElementAttributes> | null);

    const [formAreaItems, setFormAreaItems] = useState([] as FormAreaItem<ElementAttributes>[]);

    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleOpen = () => {
      onOpen();
  }

  const handleClose = () => {
      onClose();
  }


  //Highlight when a question is selected  
  const onQuestionSelected = (item: FormAreaItem<ElementAttributes>) => {
    setFormAreaItems((oldArray) => {
      const index = oldArray.findIndex((i) => i.id === item.id);
      if (index !== -1) {
        oldArray.forEach((item) => (item.isSelected = false));
        oldArray[index].isSelected = true;
      }
      //SessionStorageService.saveItem(FORM_ITEMS_SESSION_KEY, oldArray);
      return [...oldArray];
    });
    setSelectedItem(item);
  };

  //Drop the form element on to Form Area
  const onFormAreaDrop = useCallback(
    (item: FormAreaItem<ElementAttributes>) => {
      setFormAreaItems((oldArray) => {
        oldArray.forEach((item) => (item.isSelected = false));
        const newArray = [
          ...oldArray,
          { ...item, id: nanoid(), isSelected: true },
        ];
       // SessionStorageService.saveItem(FORM_ITEMS_SESSION_KEY, newArray);
        return [...newArray];
      });
    },
    [formAreaItems]
  );

  //Remove a form element from Form Area
  const onElementDelete = (item: FormAreaItem<ElementAttributes>) => {
    setFormAreaItems((oldArray) => {
      oldArray.forEach((item) => (item.isSelected = false));
      const newArray = oldArray.filter((oldItem) => oldItem.id !== item.id);
      //SessionStorageService.saveItem(FORM_ITEMS_SESSION_KEY, newArray);
      return [...newArray];
    });
  };

  //Allow the user to type in their Question to a form element
  const onElementQuestionChanged = (
    item: FormAreaItem<ElementAttributes>,
    questionText: string
  ) => {
    setFormAreaItems((oldArray) => {
      const index = oldArray.findIndex((i) => i.id === item.id);
      if (index !== -1) {
        oldArray[index].question = questionText;
      }
      //SessionStorageService.saveItem(FORM_ITEMS_SESSION_KEY, oldArray);
      return [...oldArray];
    });
  };






  return (
    <div>
      <Head>
        <title>Form Builder Demo</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DndProvider backend={HTML5Backend}>
      <div className='h-full min-h-screen bg-slate-400'>
      <div className='grid grid-cols-12 gap-x-4 '>

      {/*Element Bank  */}
       <div className='col-span-2 box-border'>
        <ElementBank />
        
       </div>
       {/*Form Area  */}
       <div className='col-span-8 box-border'>
       <FormArea
          items={formAreaItems}
          onDrop={onFormAreaDrop}
          onItemDelete={onElementDelete}
          onQuestionTextChange={onElementQuestionChanged}
          onQuestionSelected={onQuestionSelected}
        />
          
       </div>
      {/*Element Properties  */}
       <div className='col-span-2'>
       <Sidebar
          selectedItem={selectedItem}
          onItemPropertiesChange={(item) => {
            setFormAreaItems((oldArray) => {
              const index = oldArray.findIndex((i) => i.id === item.id);
              if (index !== -1) {
                oldArray[index].attributes.styling = item.attributes.styling;
              }
              //SessionStorageService.saveItem(FORM_ITEMS_SESSION_KEY, oldArray);
              return [...oldArray];
            });
          }}
          //isSelected={selectedItem.isSelected}
        />
        
       </div>

      </div>
      </div>
      </DndProvider>
    </div>
  )
}

export default Home
