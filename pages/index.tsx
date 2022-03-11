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
import { FormControl, FormLabel, Select, Stack, Switch, useDisclosure, Button } from '@chakra-ui/react'
import Sidebar from '../components/element-properties/Sidebar';

const Home: NextPage = () => {

  const [selectedItem, setSelectedItem] = useState(
    null as FormAreaItem<ElementAttributes> | null);

  const [formAreaItems, setFormAreaItems] = useState([] as FormAreaItem<ElementAttributes>[]);

  const [showSidebar, setshowSidebar] = useState(false);


  //Move Form Element
  const moveItem = useCallback((dragIndex:number, hoverIndex:number) => {
      setFormAreaItems((oldArray) => {
        const draggedItem = oldArray[dragIndex];
        console.log("Dragged Item : " ,draggedItem);
        const newArray =[...oldArray];


        return [...newArray]

      });

  },[])


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

  //Allow the user to update Options to their Checkbox or MCQ component
  const onOptionEdit = (
    item: FormAreaItem<ElementAttributes>,
    option: string,
    choiceIndex: number,
  ) => {
    setFormAreaItems((oldArray) => {
      const index = oldArray.findIndex((i) => i.id === item.id);
      if (index !== -1 && item.type == 'checkbox') {
        const newChoice = { label: option, value: option , id:oldArray[index].attributes.choices[choiceIndex].id}
        oldArray[index].attributes.choices[choiceIndex] = newChoice
   //     console.log(oldArray[index].attributes.choices[choiceIndex])
      }
      //SessionStorageService.saveItem(FORM_ITEMS_SESSION_KEY, oldArray);
      return [...oldArray];
    });
  };

  //Allow the user to add Options to their Checkbox or MCQ component
  const onOptionAdd = (
    item:FormAreaItem<ElementAttributes>,

  ) => {
    setFormAreaItems((oldArray) => {
      const newChoice = {label:"Type an Option" ,value:"Type an Option", id:nanoid() }

      const index = oldArray.findIndex((i) => i.id === item.id);
      if(index!==-1)
      {
        //oldArray[index].attributes.choices= [...oldArray[index].attributes.choices, newChoice];

        oldArray[index].attributes.choices.push(newChoice)
       //console.log(oldArray[index]);
      
      }

      return [...oldArray]
    });

  };

  const onOptionDelete = (
    item:FormAreaItem<ElementAttributes>,
    choiceIndex: number,
  ) => {
    setFormAreaItems((oldArray) => {
      const index = oldArray.findIndex((i) => i.id === item.id);

      if(index!=-1 && item.type=="checkbox")
      { 
        const oldChoices = oldArray[index].attributes.choices;
        const choiceToDelete = oldChoices[choiceIndex]
        const newChoices = oldChoices.filter((oldChoice:any)=> oldChoice.id!=choiceToDelete.id)

//        console.log("New choices : ", newChoices);
        oldArray[index].attributes.choices = newChoices;
      }
      

      return [...oldArray]
    });

  };

  const moveCard = (dragIndex: number, hoverIndex: number) => {
    const items: any[] = JSON.parse(JSON.stringify(formAreaItems));
    const itemToMove = items[dragIndex];
    items.splice(dragIndex, 1);
    items.splice(hoverIndex, 0, itemToMove);
    setFormAreaItems(items);
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
                moveCard={moveCard}
                items={formAreaItems}
                onDrop={onFormAreaDrop}
                onItemDelete={onElementDelete}
                onQuestionTextChange={onElementQuestionChanged}
                onQuestionSelected={onQuestionSelected}
                setshowSidebar={() => { setshowSidebar(true) }}
                onOptionEdit={onOptionEdit}
                onOptionAdd={onOptionAdd}
                onOptionDelete={onOptionDelete}
                moveItem={moveItem}
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
                setshowSidebar={() => { setshowSidebar(false) }}
                sidebarStatus={showSidebar}
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
