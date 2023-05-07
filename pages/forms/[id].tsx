import type { NextPage } from "next";
import React, { Dispatch, SetStateAction } from "react";
import { AddThemeTabButton } from "../../types/formTheme";
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
import { IoMdCloseCircleOutline } from "react-icons/io";
import { AiOutlineCloseSquare } from "react-icons/ai";
import { RiArrowGoBackLine } from "react-icons/ri";
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

const styles = {
  sideImage:
    "card-pop-in md:object-cover md:object-contain hover:scale-105 ease-out duration-500 hover:cursor-pointer overflow-hidden shadow-sm shadow-black ",
};

const sideImages = [
  "https://images.unsplash.com/photo-1660385938160-b0dd49ef09d9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  "https://images.unsplash.com/photo-1460355976672-71c3f0a4bdac?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80",
  "https://images.unsplash.com/photo-1476842634003-7dcca8f832de?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  "https://images.unsplash.com/photo-1560004849-db18a2018f77?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  "https://images.unsplash.com/photo-1501472081208-b511e0536e15?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80",
  "https://images.unsplash.com/photo-1475070929565-c985b496cb9f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  "https://images.unsplash.com/photo-1516319915504-015b432d407c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1442&q=80",
  "https://images.unsplash.com/photo-1483982258113-b72862e6cff6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  "https://images.unsplash.com/photo-1475359476683-cb0be9a3bcfc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  "https://images.unsplash.com/photo-1600102547096-b47c89b02055?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  "https://images.unsplash.com/photo-1494587351196-bbf5f29cff42?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80",
  "https://images.unsplash.com/photo-1524087086535-177f3752451c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  "https://images.unsplash.com/photo-1489846986031-7cea03ab8fd0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1473&q=80",
  "https://images.unsplash.com/photo-1530974664676-36b51a281dc8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
];

const Home: NextPage = ({ formID }: any) => {
  const { user } = useContext(AppContext);
  const router = useRouter();
  const [newImage, setNewImage] = useState("");
  const [activeImage, setActiveImage] = useState(0);
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
      if(localStorage.getItem("formBackground")){
        setNewImage(JSON.parse(localStorage.getItem("formBackground")));
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
      localStorage.setItem("formHeading", JSON.stringify(formHeading));
      console.log('Bg image: ',sideImages[activeImage])
      localStorage.setItem("formBackground", JSON.stringify(sideImages[activeImage]));
    }
  }, [formAreaItems,activeImage]);
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

  const tabButtons = [
    {
      text: "Themes",
      style: " font-semibold font-alegreya text-lg text-slate-300 shadow-sm shadow-slate-600",
      selectedStyle:
        " font-bold font-alegreya text-lg text-slate-100 bg-blue-900 -shadow-md ease-in duration-200 ",
      selectedAltStyle:
        " font-bold font-alegreya text-lg text-slate-200 bg-blue-900 -shadow-md ease-in duration-200 ",
    },

    {
      text: "Fonts",
      style: "  font-semibold font-alegreya text-lg text-slate-300 shadow-sm shadow-slate-600",
      selectedStyle:
        " font-bold font-alegreya text-lg text-slate-100 bg-blue-900 -shadow-md ease-in duration-200",
      selectedAltStyle:
        " font-bold font-alegreya text-lg text-slate-200 bg-blue-900 -shadow-md ease-in duration-200 ",
    },
  ];

  type ThemeParams = {
    activeButton: AddThemeTabButton;
    setActiveButton: Dispatch<SetStateAction<number>>;
  };

  const Fonts = (props: ThemeParams) => {
    const { activeButton, setActiveButton } = props;
    return (
      <>
        <div className="flex flex-col justify-center items-end ">
          
          <div className="flex flex-col w-full justify-center items-center ">
            <span className={`font-semibold text-slate-300 font-poppins`}>
              Choose your custom font
            </span>
            <hr className="w-7/12 mt-1 mb-4 border-1 border-slate-400"></hr>
          </div>
        </div>
      </>
    );
  };

  const Themes = (props: ThemeParams) => {
    const { activeButton, setActiveButton } = props;
    return (
      <>
        <div className="flex flex-col justify-center items-end ">
          
          <div className="flex flex-col w-full justify-center items-center ">
            <span className={` font-semibold text-slate-300 font-poppins`}>
              Choose your background theme
            </span>
            <hr className="w-8/12 mt-1 mb-4 border-1 border-slate-400"></hr>
          </div>
          <div className="grid grid-cols-2 mx-3  mb-4 px-1 md:px-2 gap-x-2 gap-y-3 ">
            {sideImages.map((image, i) => {
              return (
                <img
                  src={image}
                  alt=""
                  key={i}
                  className={styles.sideImage}
                  onClick={() => {
                    setNewImage("");
                    setActiveImage(i);
                  }}
                />
              );
            })}
          </div>
          {/* <div className="p-0">
            <div className="overflow-hidden rounded-lg">
              <img
                src={newImage ? newImage : sideImages[activeImage]}
                alt="Enter the correct image url below"
                className="w-auto h-auto md:w-[600px] md:h-[400px] overflow-hidden card-pop-out hover:scale-110 duration-500 object-cover hover:cursor-pointer "
              />
            </div>
          </div> */}
        </div>
      </>
    );
  };

  function Topbar({ minimize, setMinimize }) {
    const [activeButton, setActiveButton] = useState(0);
    return (
      <div
        className={` top-0 right-0 h-screen w-1/3 bg-slate-900 dark:bg-gray-900 z-50 transition  ease-in-out duration-500 fixed ${
          minimize ? "translate-x-0 " : "translate-x-full "
        } overflow-y-scroll scrollbar-thin scrollbar-rounded scrollbar-thumb-slate-400 hover:scrollbar-thumb-slate-500 `}
      >
        <div className="flex flex-col justify-center items-end ">
        <AiOutlineCloseSquare
            size="2em"
            className={`text-white hover:scale-110  my-2 mx-4 duration-500 cursor-pointer`}
            onClick={() => setMinimize(!minimize)}
          />
          </div>
        <div className="card-pop-in flex justify-center items-center w-11/12  mb-6 mx-auto shadow-sm shadow-slate-600">
        
          {tabButtons.map((button, i) => {
            return (
              <div className="w-full" key={i}>
                <button
                  className={
                    " flex justify-center w-full h-full py-2 md:py-3 " +
                    (i === activeButton
                      ? "button-pop-out-2 ease-in duration-300"
                      : button.style) +
                    " " +
                    (i === activeButton ? button.selectedStyle : "")
                  }
                  onClick={() => {
                    setActiveButton(i);
                  }}
                >
                  {button.text}
                </button>
              </div>
            );
          })}
        </div>
        {activeButton === 0 && (
          <Themes
            activeButton={tabButtons[activeButton]}
            setActiveButton={setActiveButton}
          />
        )}
        {activeButton === 1 && (
          <Fonts
            activeButton={tabButtons[activeButton]}
            setActiveButton={setActiveButton}
          />
        )}
      </div>
    );
  }

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
      formBackground:sideImages[activeImage] ? sideImages[activeImage] : ''
    };

    const response = await fetch("/api/createForm", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    });

    if(response.status == 200) {
      const data = await response.json();
      console.log("Response : ", data);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Your form has been saved!",
      });
    }
  };

  const [minimize, setMinimize] = useState(false);
  return (
    <div>
      <Head>
        <title>Form Builder Demo</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DndProvider backend={HTML5Backend}>
        <div
          style={{
            backgroundImage: `url(${
              newImage ? newImage : sideImages[activeImage]
            })`,
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
            // position: 'sticky',
            // width: '100%',
            // height: '100%',
            // minHeight: '100vh',
            // minWidth: '100vw',
            backgroundPosition: "center",
            backgroundSize: "cover",
            overflow: "hidden",
          }}
          className="h-full min-h-screen min-w-screen bg-background"
        >
          <Topbar minimize={minimize} setMinimize={setMinimize} />
          <div className="flex flex-col bg-none fixed left-8 top-6 gap-52 z-20">
            <button
              className="flex flex-row gap-2 relative border-2 border-violet-800 py-2.5 px-5 font-medium uppercase text-violet-500 transition-colors before:absolute before:left-0 before:top-0 before:-z-10 before:h-full before:w-full before:origin-top-left before:scale-x-0 before:bg-gradient-to-r from-violet-900  to-blue-600 before:transition-transform before:duration-300 before:content-[''] hover:text-white hover:border-violet-800 before:hover:scale-x-100"
              onClick={handleBackClick}
            >
              Return
              <RiArrowGoBackLine size="1.5em" />
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
              <button
                className={` absolute bg-blue-500 w-fit p-4 rounded-full duration-300 hover:scale-110`}
                onClick={() => setMinimize(!minimize)}
              >
                <IoIosColorPalette
                  size="2em"
                  color="white"
                  className={` text-white `}
                />
              </button>
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
                      if (item.type != "rating") {
                        oldArray[index].attributes.styling =
                          item.attributes.styling;
                        oldArray[index].attributes = item.attributes;
                      } else if (item.type == "rating") {
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
