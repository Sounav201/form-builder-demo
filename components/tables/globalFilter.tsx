import React, { useState } from "react";
import { useAsyncDebounce } from "react-table";
import { BsSearch } from 'react-icons/bs'
// import tw from "twin.macro";

// const SearchContainer = tw.div`
//   mb-6
//   mt-6
//   flex
//   items-center
// `;

// const SearchText = tw.h2`
//   text-xl
// text-gray-600
//   mr-6
// `;

// const Input = tw.input`
//   h-8
//   border-2
//   border-solid
//   border-green-500
//   outline-none
//   p-4
//   rounded-lg
// `;

export function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = useState(globalFilter);
  const onChange = (value) => {
    setGlobalFilter(value || undefined);
  };

  return (
    <div
      className="mb-4 md:mb-6
    flex
    items-center gap-4 md:gap-6"
    >
      <div className="flex flew-row gap-1 md:gap-2">
        <span
          className="text-lg md:text-xl text-slate-700 font-alegreya font-semibold items-center justify-center flex"
        >
          Search
        </span>
        <span className="flex items-center justify-center text-lg text-slate-700">
          <BsSearch />
        </span>
      </div>

      <input
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} records...`}
        className="h-8
        border focus:border-x-2
        border-slate-700
        outline-none
        p-4
        rounded-lg"
      />
    </div>
  );
}
