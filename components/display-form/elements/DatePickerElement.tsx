import React, { useState } from "react";
import Image from "next/image";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Stack,
  Box,
  Textarea,
} from "@chakra-ui/react";

const DatePickerElement = (props: any) => {


  return (
    <div>
      <Stack w={["100%", 550, 700]} marginX="auto" maxWidth={800}>
        <FormControl w={["100%", 500, 600]} marginX="auto" isRequired={props.attributes.required}>
        <FormLabel ><p className={`font-${props.attributes.styling.fontType}`}>{props.question}</p></FormLabel>

          <div className="mt-6 mb-4">
          <input type={"date"}  placeholder='Date' name={props.question} id={props.id} required={props.attributes.required} />
          </div>
        </FormControl>
      </Stack>
    </div>
  );
};

export default DatePickerElement;
