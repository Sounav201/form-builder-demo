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
  const [startDate, setStartDate] = useState(new Date());
  const handleDateChange = (e) => {
    console.log(e.target.value,typeof(e.target.value))

}

  return (
    <div>
      <Stack w={["100%", 550, 700]} marginX="auto" maxWidth={800}>
        <FormControl w={["100%", 500, 600]} marginX="auto">
          <FormLabel>{props.question}</FormLabel>

          <div className="mt-6 mb-4">
          <input type={"date"}  placeholder='Date' name="input-date" onChange={handleDateChange} />
          </div>
        </FormControl>
      </Stack>
    </div>
  );
};

export default DatePickerElement;
