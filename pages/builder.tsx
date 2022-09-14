import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Cookies from "js-cookie";
import ElementBank from '../components/element-bank/ElementBank'
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { FormAreaItem } from "../components/form-area/FormArea.types";
import { ElementAttributes, RatingAttributes } from "../components/element-bank/ElementBank.types";
import { useCallback, useEffect, useState } from "react";
import { nanoid } from "nanoid";
// import {RiPaintBrushFill} from "react-icons/ri";
import {IoIosColorPalette} from "react-icons/io";

import {
  FORM_ITEMS_SESSION_KEY,
  SessionStorageService,
} from "../services/SessionStorageService";
import FormArea from '../components/form-area/FormArea';
import ElementProperties from '../components/element-properties/ElementProperties';
import { FormControl, FormLabel, Select, Stack, Switch, useDisclosure, Button } from '@chakra-ui/react'
import Sidebar from '../components/element-properties/Sidebar';
import { parseCookies } from '../services/parseCookies';
import Swal from 'sweetalert2'

const Home: NextPage = ({initialformAreaItems}:any) => {

  const [selectedItem, setSelectedItem] = useState(
    null as FormAreaItem<ElementAttributes> | null);

  const [formAreaItems, setFormAreaItems] = useState( () =>  initialformAreaItems!= undefined && JSON.parse(initialformAreaItems) || [] as FormAreaItem<ElementAttributes>[]);

  const [showSidebar, setshowSidebar] = useState(false);

  useEffect(() => {
   // Cookies.set("formAreaItems", JSON.stringify(formAreaItems))
  //console.log('State of form : ', formAreaItems);
  }, [formAreaItems])
  



  //Move Form Element
  const moveItem = useCallback((dragIndex:number, hoverIndex:number) => {
   // console.log("Move ITEMS ");
      setFormAreaItems((oldArray:any) => {
        const draggedItem = oldArray[dragIndex];
        console.log("Dragged Item : " ,draggedItem);
        const newArray =[...oldArray];


        return [...newArray]

      });

  },[])


  //Highlight when a question is selected  
  const onQuestionSelected = (item: FormAreaItem<ElementAttributes>) => {
    //console.log("Highlight question");
    setFormAreaItems((oldArray:any) => {
      const index = oldArray.findIndex((i:any) => i.id === item.id);
      if (index !== -1) {
        oldArray.forEach((item:any) => (item.isSelected = false));
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
      setFormAreaItems((oldArray:any) => {
        oldArray.forEach((item:any) => (item.isSelected = false));
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
    setFormAreaItems((oldArray:any) => {
      oldArray.forEach((item:any) => (item.isSelected = false));
      const newArray = oldArray.filter((oldItem:any) => oldItem.id !== item.id);
      //SessionStorageService.saveItem(FORM_ITEMS_SESSION_KEY, newArray);
      return [...newArray];
    });
  };

  //Allow the user to type in their Question to a form element
  const onElementQuestionChanged = (
    item: FormAreaItem<ElementAttributes>,
    questionText: string
  ) => {
    setFormAreaItems((oldArray:any) => {
      const index = oldArray.findIndex((i:any) => i.id === item.id);
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
    setFormAreaItems((oldArray:any) => {
      const index = oldArray.findIndex((i:any) => i.id === item.id);
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
    setFormAreaItems((oldArray:any) => {
      const newChoice = {label:"Type an Option" ,value:"Type an Option", id:nanoid() }

      const index = oldArray.findIndex((i:any) => i.id === item.id);
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
    setFormAreaItems((oldArray:any) => {
      const index = oldArray.findIndex((i:any) => i.id === item.id);

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

  const handlePreviewClick = () => {
    
    //Check if formArea has any elements
    if(formAreaItems.length==0){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Your form has no elements!',
      
    })
  }
  else{
    Swal.fire(
      'Hold on!',
      'Preview feature still under progress. We thank you for your patience 😊',
      'success'
    )
    console.log('Preview state of Form Area : ', formAreaItems);
  }
  }

  const [panelStatus, setpanelStatus] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [open, setOpen] = useState(false);

  return (
    <div>
      <Head>
        <title>Form Builder Demo</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DndProvider backend={HTML5Backend}>
        <div className='h-full min-h-screen bg-slate-900'>
        <div className=" flex flex-col gap-16 fixed items-center right-0 top-6">
            <div className=''>
            <button className="bg-gradient-to-r text-white from-purple-600  to-blue-600 transition-all  duration-300 hover:scale-105  hover:from-blue-800 hover:to-purple-800 py-4 px-8 rounded-sm font-bold " onClick={handlePreviewClick}>Preview</button>
            </div>
            <div className={`flex justify-center items-center `}>
              <div className={` h-96 py-4 px-12 bg-slate-800 text-white duration-300 ${!open && "scale-0"} `}>
                Choose Your Theme
              </div>
              <button className={` absolute bg-blue-500 w-fit p-4 rounded-full duration-300 ${ open && "-translate-x-28 " } `} onClick={() => setOpen(!open)}>
                <IoIosColorPalette size="2em" color="white"/>
              </button>
            </div>
        </div>
        
          <div className='grid grid-cols-12 gap-x-4 '>

            {/*Element Bank  */}
            <div className=' box-border'>
              <ElementBank />

            </div>
            {/*Form Area  */}
            <div className='col-span-12 box-border'>
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
            <div className=''>
              <Sidebar
                
                selectedItem={selectedItem}
                onItemPropertiesChange={(item) => {
                  setFormAreaItems((oldArray:any) => {
                    const index = oldArray.findIndex((i:any) => i.id === item.id);
                  
                    if (index !== -1) {
                      if(item.type !="rating")
                        oldArray[index].attributes.styling = item.attributes.styling;
                      else if(item.type == "rating")
                      {  
                        (oldArray[index].attributes as RatingAttributes).emoji = (item.attributes as RatingAttributes).emoji; 
                        (oldArray[index].attributes as RatingAttributes).styling.fillColor = (item.attributes as RatingAttributes).styling.fillColor; 
                        (oldArray[index].attributes as RatingAttributes).styling.hoverColor = (item.attributes as RatingAttributes).styling.hoverColor; 

                      }
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

Home.getInitialProps = ({req}:any ) => {

  const cookies = parseCookies(req);

  return {initialformAreaItems: cookies.formAreaItems};

  
};

export default Home
