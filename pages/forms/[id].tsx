import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Cookies from "js-cookie";
import ElementBank from "../../components/element-bank/ElementBank";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { FormAreaItem } from "../../components/form-area/FormArea.types";
import {
  ElementAttributes,
  RatingAttributes,
} from "../../components/element-bank/ElementBank.types";
import { useCallback, useContext, useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { IoIosColorPalette } from "react-icons/io";
import {RiArrowGoBackLine} from "react-icons/ri";
import { IoIosSave } from "react-icons/io";
import {
  FormControl,
  FormLabel,
  Select,
  Stack,
  Switch,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import Swal from "sweetalert2";
import Link from "next/link";
import { useRouter } from "next/router";
import AppContext from "../../src/context/appContext";
import Sidebar from "../../components/element-properties/Sidebar";
import FormArea from "../../components/form-area/FormArea";

const Home: NextPage = ({ formID }: any) => {
  const { user } = useContext(AppContext);
  const router = useRouter();

  const [selectedItem, setSelectedItem] = useState(
    null as FormAreaItem<ElementAttributes> | null
  );

  const [formAreaItems, setFormAreaItems] = useState(
    [] as FormAreaItem<ElementAttributes>[]
  );
  const [formHeading, setformHeading] = useState("Untitled Form");
  const [showSidebar, setshowSidebar] = useState(false);

  useEffect(() => {
    if (typeof window != undefined) {
      if (user && user.length > 0) {
        console.log("User logged in", user);
      } else if (localStorage.getItem("form_builderuser")) {
        console.log("User logged in", user);
      } else {
        router.push("/");
      }
      if (localStorage.getItem("formAreaItems")) {
        console.log("Getter runs!");
        setFormAreaItems(JSON.parse(localStorage.getItem("formAreaItems")));
      }
      if (localStorage.getItem("formHeading")) {
        setformHeading(JSON.parse(localStorage.getItem("formHeading")));
      }
    }
  }, []);

  useEffect(() => {
    // Cookies.set("formAreaItems", JSON.stringify(formAreaItems))
    console.log("State of form : ", formAreaItems);

    if (typeof window != undefined) {
      console.log("Setter runs!");
      localStorage.setItem("formAreaItems", JSON.stringify(formAreaItems));
      localStorage.setItem("formHeading", JSON.stringify(formHeading));
    }
  }, [formAreaItems]);

  //Change form heading
  const onFormHeadingChanged = (heading: string) => {
    setformHeading(heading);
  };

  //Move Form Element
  const moveItem = useCallback((dragIndex: number, hoverIndex: number) => {
    // console.log("Move ITEMS ");
    setFormAreaItems((oldArray: any) => {
      const draggedItem = oldArray[dragIndex];
      console.log("Dragged Item : ", draggedItem);
      const newArray = [...oldArray];

      return [...newArray];
    });
  }, []);

  //Highlight when a question is selected
  const onQuestionSelected = (item: FormAreaItem<ElementAttributes>) => {
    //console.log("Highlight question");
    setFormAreaItems((oldArray: any) => {
      const index = oldArray.findIndex((i: any) => i.id === item.id);
      if (index !== -1) {
        oldArray.forEach((item: any) => (item.isSelected = false));
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
      setFormAreaItems((oldArray: any) => {
        oldArray.forEach((item: any) => (item.isSelected = false));
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
    setFormAreaItems((oldArray: any) => {
      oldArray.forEach((item: any) => (item.isSelected = false));
      const newArray = oldArray.filter(
        (oldItem: any) => oldItem.id !== item.id
      );
      //SessionStorageService.saveItem(FORM_ITEMS_SESSION_KEY, newArray);
      return [...newArray];
    });
  };

  //Allow the user to type in their Question to a form element
  const onElementQuestionChanged = (
    item: FormAreaItem<ElementAttributes>,
    questionText: string
  ) => {
    setFormAreaItems((oldArray: any) => {
      const index = oldArray.findIndex((i: any) => i.id === item.id);
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
    choiceIndex: number
  ) => {
    setFormAreaItems((oldArray: any) => {
      const index = oldArray.findIndex((i: any) => i.id === item.id);
      if (index !== -1 && item.type == "checkbox") {
        const newChoice = {
          label: option,
          value: option,
          id: oldArray[index].attributes.choices[choiceIndex].id,
        };
        oldArray[index].attributes.choices[choiceIndex] = newChoice;
        //     console.log(oldArray[index].attributes.choices[choiceIndex])
      }
      //SessionStorageService.saveItem(FORM_ITEMS_SESSION_KEY, oldArray);
      return [...oldArray];
    });
  };

  //Allow the user to add Options to their Checkbox or MCQ component
  const onOptionAdd = (item: FormAreaItem<ElementAttributes>) => {
    setFormAreaItems((oldArray: any) => {
      const newChoice = {
        label: "Type an Option",
        value: "Type an Option",
        id: nanoid(),
      };

      const index = oldArray.findIndex((i: any) => i.id === item.id);
      if (index !== -1) {
        //oldArray[index].attributes.choices= [...oldArray[index].attributes.choices, newChoice];

        oldArray[index].attributes.choices.push(newChoice);
        //console.log(oldArray[index]);
      }

      return [...oldArray];
    });
  };

  const onOptionDelete = (
    item: FormAreaItem<ElementAttributes>,
    choiceIndex: number
  ) => {
    setFormAreaItems((oldArray: any) => {
      const index = oldArray.findIndex((i: any) => i.id === item.id);

      if (index != -1 && item.type == "checkbox") {
        const oldChoices = oldArray[index].attributes.choices;
        const choiceToDelete = oldChoices[choiceIndex];
        const newChoices = oldChoices.filter(
          (oldChoice: any) => oldChoice.id != choiceToDelete.id
        );

        //        console.log("New choices : ", newChoices);
        oldArray[index].attributes.choices = newChoices;
      }

      return [...oldArray];
    });
  };

  const addImage = (item: FormAreaItem<ElementAttributes>, image: any) => {
    console.log("Image string : ", image);
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
    if (formAreaItems.length == 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Your form has no elements!",
      });
    } else {
      router.push(`/previews/${formID}`);

      //console.log('Preview state of Form Area : ', formAreaItems);
    }
  };

  //style={{backgroundImage:"url('./sunset-hair.jpg')"}}
  const handleBackClick = () => {
    router.push("/dashboard/home");
  };

  const handleSaveClick = async () => {
    //Must be a conditional statement to check if the form is new or not
    //If new, then send the data to the backend to create a new form
    //If not new, then send the data to the backend to update the form
    //For New form
    var dataToSend = {
      formHeading: formHeading,
      formAreaItems: formAreaItems,
      user: user,
      formID: formID,
    };

    const response = await fetch("/api/createForm", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    });
    if (response.status == 200) {
      const data = await response.json();
      console.log("Response : ", data);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Your form has been saved!",
      });
    }
  };

  return (
    <div>
      <Head>
        <title>Form Builder Demo</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DndProvider backend={HTML5Backend}>
        <div className="h-full min-h-screen min-w-screen bg-background    ">
          <div className="flex flex-col bg-none fixed left-8 top-6 gap-52 z-20">
            <button
              className="flex flex-row gap-2 relative border-2 border-violet-800 py-2.5 px-5 font-medium uppercase text-violet-500 transition-colors before:absolute before:left-0 before:top-0 before:-z-10 before:h-full before:w-full before:origin-top-left before:scale-x-0 before:bg-gradient-to-r from-violet-900  to-blue-600 before:transition-transform before:duration-300 before:content-[''] hover:text-white hover:border-violet-800 before:hover:scale-x-100"
              onClick={handleBackClick}
            >
            Return
            <RiArrowGoBackLine size='1.5em' />
            </button>
          </div>
          <div className="flex flex-col bg-none fixed right-8 top-6 gap-52 z-20">
            <button
              className="relative border-2 border-violet-800 py-2.5 px-5 font-medium uppercase text-violet-500 transition-colors before:absolute before:left-0 before:top-0 before:-z-10 before:h-full before:w-full before:origin-top-left before:scale-x-0 before:bg-gradient-to-r from-violet-900  to-blue-600 before:transition-transform before:duration-300 before:content-[''] hover:text-white hover:border-violet-800 before:hover:scale-x-100"
              onClick={handlePreviewClick}
            >
              Preview
            </button>
            <div className={` `}>
              {/* <button className={` absolute bg-blue-500 w-fit p-4 rounded-full duration-300 `} >
                  <IoIosColorPalette size="2em" color="white"/>
                </button> */}
            </div>
          </div>
          <div className="flex flex-col group bg-none fixed right-8 bottom-6 gap-52 z-20">
            <button
              onClick={handleSaveClick}
              className="flex flex-row gap-2 relative border-2 border-violet-800 py-2.5 px-5 font-medium uppercase text-violet-500 transition-colors before:absolute before:left-0 before:top-0 before:-z-10 before:h-full before:w-full before:origin-top-left before:scale-x-0 before:bg-gradient-to-r from-violet-900  to-blue-600 before:transition-transform before:duration-300 before:content-[''] hover:text-white hover:border-violet-800 before:hover:scale-x-100"
            >
              Save
              <IoIosSave size="1.5em" className="group-hover:animate-ping" />
            </button>
          </div>

          <div className="grid grid-cols-12 gap-x-4   place-content-center">
            {/*Element Bank  */}
            <div className="md:col-span-1 box-border">
              <ElementBank />
            </div>
            {/*Form Area  */}
            <div className="z-10 md:col-span-10 box-border">
              <FormArea
                moveCard={moveCard}
                items={formAreaItems}
                formHeading={formHeading}
                onDrop={onFormAreaDrop}
                onItemDelete={onElementDelete}
                onQuestionTextChange={onElementQuestionChanged}
                onQuestionSelected={onQuestionSelected}
                setshowSidebar={() => {
                  setshowSidebar(true);
                }}
                onOptionEdit={onOptionEdit}
                onOptionAdd={onOptionAdd}
                onOptionDelete={onOptionDelete}
                moveItem={moveItem}
                onFormHeadingChanged={onFormHeadingChanged}
              />
            </div>
            {/*Element Properties  */}
            <div className="md:col-span-1">
              <Sidebar
                selectedItem={selectedItem}
                onItemPropertiesChange={(item) => {
                  setFormAreaItems((oldArray: any) => {
                    const index = oldArray.findIndex(
                      (i: any) => i.id === item.id
                    );

                    if (index !== -1) {
                      if (item.type != "rating")
                        oldArray[index].attributes.styling =
                          item.attributes.styling;
                      else if (item.type == "rating") {
                        (oldArray[index].attributes as RatingAttributes).emoji =
                          (item.attributes as RatingAttributes).emoji;
                        (
                          oldArray[index].attributes as RatingAttributes
                        ).styling.fillColor = (
                          item.attributes as RatingAttributes
                        ).styling.fillColor;
                        (
                          oldArray[index].attributes as RatingAttributes
                        ).styling.hoverColor = (
                          item.attributes as RatingAttributes
                        ).styling.hoverColor;
                      }
                    }
                    //SessionStorageService.saveItem(FORM_ITEMS_SESSION_KEY, oldArray);
                    return [...oldArray];
                  });
                }}
                setshowSidebar={() => {
                  setshowSidebar(false);
                }}
                sidebarStatus={showSidebar}
                //isSelected={selectedItem.isSelected}
              />
            </div>
          </div>
        </div>
      </DndProvider>
    </div>
  );
};

export async function getServerSideProps(context: any) {
  console.log("Params id : ", context.params.id);
  return { props: { formID: context.params.id } };
}

export default Home;
