import React, { useEffect, useState } from "react";
import { ElementPropertiesProps } from "./ElementProperties.types";
import { FiSettings, FiTrash2 } from "react-icons/fi";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { AiOutlineCloseSquare } from "react-icons/ai";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  Select,
  Stack,
  Switch,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import {
  RatingAttributes,
  ShortTextAttributes,
} from "../element-bank/ElementBank.types";
const Sidebar = (props: ElementPropertiesProps) => {
  const [fontColor, setfontColor] = useState(
    props.selectedItem ? props.selectedItem.attributes.styling.fontColor : ""
  );
  const [isRequired, setisRequired] = useState(
    props.selectedItem ? props.selectedItem.attributes.required : false
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isSelected, setisSelected] = useState(
    props.selectedItem ? props.selectedItem.isSelected : true
  );
  const [ratingType, setratingType] = useState(
    props.selectedItem != null
      ? props.selectedItem.type == "rating"
        ? (props.selectedItem.attributes as RatingAttributes).emoji
        : ""
      : ""
  );
  const [ratingfillColor, setratingfillColor] = useState(
    props.selectedItem != null
      ? props.selectedItem.type == "rating"
        ? (props.selectedItem.attributes as RatingAttributes).styling.fillColor
        : "#000000"
      : "#000000"
  );
  const [ratinghoverColor, setratinghoverColor] = useState(
    props.selectedItem != null
      ? props.selectedItem.type == "rating"
        ? (props.selectedItem.attributes as RatingAttributes).styling.hoverColor
        : "#c31432"
      : "#c31432"
  );
  const [src, setsrc] = useState(
    props.selectedItem
      ? props.selectedItem.attributes.styling.questionImage
      : ""
  );

  useEffect(() => {
    if (props.selectedItem !== null) {
      console.log("Element : ", props.selectedItem);
      if (props.selectedItem.type == "rating") {
        //console.log("Rating type : ", ratingType)

        setratingType("Star");
        setratingfillColor(
          (props.selectedItem.attributes as RatingAttributes).styling.fillColor
        );
        setratinghoverColor(
          (props.selectedItem.attributes as RatingAttributes).styling.hoverColor
        );
      } else {
        setratingType("");
      }
      setfontColor(props.selectedItem.attributes.styling.fontColor);
      setisRequired(props.selectedItem.attributes.required);
      setsrc(props.selectedItem.attributes.styling.questionImage);
    }

    console.log("Image src : ", src);
  }, [props.selectedItem]);

  if (props.selectedItem === null) {
    return null;
  }

  const handleClose = () => {
    //setShowSidebar(false);
    //isSelected = false;
    // setisSelected(false);
    //console.log('S')
    props.setshowSidebar();
  };

  const handleUpload = (e) => {
    const uploadedFile = e.target.files[0];
    console.log("Uploaded File : ", uploadedFile);
    let fileName = e.target.files[0].name;
    const reader = new FileReader();
    reader.onload = function (onLoadEvent) {
      // console.log('Event file' , onLoadEvent.target.result);
      setsrc(onLoadEvent.target.result as string);
      if (props.selectedItem != null) {
        //props.selectedItem.attributes.styling.questionImage = onLoadEvent.target.result as string;
        props.selectedItem.attributes.styling.questionImage = onLoadEvent.target
          .result as string;
        props.onItemPropertiesChange(props.selectedItem);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleRemove = () => {
    setsrc("");
    if (props.selectedItem != null) {
      props.selectedItem.attributes.styling.questionImage = "";
      props.onItemPropertiesChange(props.selectedItem);
    }
  };

  return (
    <div>
      <div
        className={`top-0 right-0 w-[25vw] bg-slate-900 px-4 overflow-scroll scrollbar-thin scrollbar-rounded scrollbar-thumb-slate-400 hover:scrollbar-thumb-slate-500 text-white fixed h-full z-40 transition  ease-in-out duration-300 ${
          isSelected && props.sidebarStatus
            ? "translate-x-0 "
            : "translate-x-full"
        }`}
      >
        <span className="flex justify-end items-end">
        <AiOutlineCloseSquare
            size="2em"
            className={`text-white hover:scale-110  mt-4 duration-500 cursor-pointer `} onClick={handleClose} />
        </span>
        <h1 className="mt-2 flex text-2xl text-violet-800 font-spacemono font-bold uppercase justify-center items-center">
          Element Properties
        </h1>
        <div className="flex flex-col gap-2 ">
          <div className=" py-2 px-2 flex flex-col">
            <label className="font-medium text-lg text-zinc-300 ">
              Mandatory Field?
            </label>
            <Switch
              size="md"
              mt={1}
              className="px-2"
              colorScheme={"yellow"}
              onChange={() => {
                setisRequired((prevstate) => !prevstate);
                if (props.selectedItem != null) {
                  props.selectedItem.attributes.required =
                    !props.selectedItem.attributes.required;
                  props.onItemPropertiesChange(props.selectedItem);
                }
              }}
            />
            <label className="text-xs text-yellow-400 px-2">
              Prevents submission if this question is empty*
            </label>
          </div>

          {props.selectedItem && props.selectedItem.type == "shorttext" && (
            <>
              <div className="flex flex-col items-center gap-2 ">
                <label className="font-medium text-lg text-zinc-300 ">
                  Input Type
                </label>
                <Select
                  bg="white"
                  borderColor="blue"
                  defaultValue={
                    (props.selectedItem.attributes as ShortTextAttributes)
                      .inputType
                  }
                  color="black"
                  placeholder="Select option"
                  className="font-semibold"
                  onChange={(e) => {
                    if (props.selectedItem !== null) {
                      (
                        props.selectedItem.attributes as ShortTextAttributes
                      ).inputType = e.target.value;
                      // (props.selectedItem.attributes as RatingAttributes).emoji = e.target.value;
                      props.onItemPropertiesChange(props.selectedItem);
                    }
                  }}
                >
                  <option
                    className="bg-purple-500 text-yellow-800"
                    value="text"
                  >
                    Text{" "}
                  </option>
                  <option value="email">Email</option>
                  <option value="number">Number</option>
                </Select>
              </div>
            </>
          )}

          <div className=" flex flex-col px-2 gap-2">
            <label className="font-medium text-lg text-zinc-300 ">
              Text Color
            </label>
            <div className="px-2">
              <input
                className="rounded"
                type="color"
                value={fontColor}
                onChange={(e) => {
                  setfontColor(e.target.value);
                  if (props.selectedItem !== null) {
                    props.selectedItem.attributes.styling.fontColor =
                      e.target.value;
                    props.onItemPropertiesChange(props.selectedItem);
                  }
                }}
              />
            </div>
          </div>

          <div className=" py-2 px-2 flex flex-col">
            <label className="font-medium text-lg text-zinc-300 ">
              Question Image
            </label>
            {src && src.length > 0 && (
              <img
                src={src}
                className="w-20 h-20 m-1 rounded-md border-2 border-white"
              />
            )}

            <input
              className="flex flex-col w-full  py-2 text-xs font-normal text-gray-300 transition ease-in-out m-0 file:mr-4
                    file:py-2 file:px-6
                    file:rounded-full file:border-0
                    file:text-base file:font-semibold  file:text-zinc-200
                    file:bg-gradient-to-b file:from-blue-800 file:to-fuchsia-900
                    hover:file:cursor-pointer hover:file:bg-gradient-to-b hover:file:from-blue-900 hover:file:to-purple-900 hover:file:text-white
                  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              type={"file"}
              name="file"
              onChange={handleUpload}
            />

            <button
              type="button"
              className="p-2 mx-auto w-1/2 rounded-md bg-white font-semibold bg-gradient-to-r from-emerald-500 to-teal-800  text-white hover:bg-gradient-to-r hover:from-teal-800 hover:to-emerald-500 hover:animate-text"
              onClick={handleRemove}
            >
              Clear
            </button>
          </div>

          {ratingType.length > 0 && (
            <div className=" flex flex-col">
              <label className="font-medium">Block Color</label>
              <input
                className="rounded-md my-1"
                type="color"
                value={ratingfillColor}
                onChange={(e) => {
                  setratingfillColor(e.target.value);
                  if (props.selectedItem !== null) {
                    (
                      props.selectedItem.attributes as RatingAttributes
                    ).styling.fillColor = e.target.value;
                    props.onItemPropertiesChange(props.selectedItem);
                  }
                }}
              />
            </div>
          )}
          {ratingType.length > 0 && (
            <div className=" flex flex-col">
              <label className="font-medium">Fill Color</label>
              <input
                className="rounded-md my-1"
                type="color"
                value={ratinghoverColor}
                onChange={(e) => {
                  setratingfillColor(e.target.value);
                  if (props.selectedItem !== null) {
                    (
                      props.selectedItem.attributes as RatingAttributes
                    ).styling.hoverColor = e.target.value;
                    props.onItemPropertiesChange(props.selectedItem);
                  }
                }}
              />
            </div>
          )}

          {ratingType.length > 0 && (
            <div className="py-2 flex flex-col gap-2">
              <label className="font-medium ">Rating type</label>
              <Select
                bg="white"
                borderColor="blue"
                color="black"
                placeholder="Select option"
                className="font-semibold"
                onChange={(e) => {
                  //console.log(e.target.value);
                  setratingType(e.target.value);
                  if (props.selectedItem !== null) {
                    (props.selectedItem.attributes as RatingAttributes).emoji =
                      e.target.value;
                    props.onItemPropertiesChange(props.selectedItem);
                  }
                }}
              >
                <option className="bg-purple-500 text-yellow-800" value="Star">
                  Star{" "}
                </option>
                <option value="Heart">Heart</option>
                <option value="Smiley">Smiley</option>
              </Select>
            </div>
          )}
        </div>

        {/*Set up a close button mechanism by taking care of the states from the Parent component -> DONE  */}
        {/* <div className='bottom-12 right-8 absolute'>
                <Button aria-label='Close' colorScheme={'orange'} onClick={handleClose}>
                    Close
                </Button>
            </div> */}
        
       
      </div>
    </div>
  );
};

export default Sidebar;
