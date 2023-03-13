import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { useGlobalFilter, useSortBy, useTable } from "react-table";
// import tw from "twin.macro";
import { GlobalFilter } from "./globalFilter";

// const Table = tw.table`
//   table-fixed
//   text-base
//   text-gray-900
// `;

// const TableHead = tw.thead`
//   p-2
// `;

// const TableRow = tw.tr`
// border
// border-green-500
// `;

// const TableHeader = tw.th`
// border
// border-green-500
// p-2
// `;

// const TableBody = tw.tbody`
// `;

// const TableData = tw.td`
// border
// border-green-500
// p-5
// `;

// const Button = tw.button`
//   pl-4
//   pr-4
//   pt-2
//   pb-2
//   text-black
//   rounded-md
//   bg-green-300
//   hover:bg-green-200
//   transition-colors
// `;

export function Fillers({formData}) {
  const [products, setProducts] = useState([]);
  // console.log("responses", formData.responses);
  // const filler = formData.responses;
  // console.log("filler: ", filler);

  const fetchProducts = async () => {
    const products = await formData.responses;
    console.log("Products: ",products);
    // const products = res.data;

      // console.log("Products: ", products);
      if (products)
        setProducts(products);
      
    
  };

  // const data = useMemo(
  //   () => [
  //     {
  //       id: 1,
  //       title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
  //       price: 109.95,
  //       description:
  //         "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
  //       category: "men's clothing",
  //       image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  //       rating: {
  //         rate: 3.9,
  //         count: 120,
  //       },
  //     },
  //     {
  //       id: 1,
  //       title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
  //       price: 109.95,
  //       description:
  //         "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
  //       category: "men's clothing",
  //       image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  //       rating: {
  //         rate: 3.9,
  //         count: 120,
  //       },
  //     },
  //     {
  //       id: 1,
  //       title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
  //       price: 109.95,
  //       description:
  //         "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
  //       category: "men's clothing",
  //       image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  //       rating: {
  //         rate: 3.9,
  //         count: 120,
  //       },
  //     },
  //   ],
  //   []
  // );

  // const columns = useMemo(
  //   () => [
  //     {
  //       Header: "Id",
  //       accessor: "id",
  //     },
  //     {
  //       Header: "Price",
  //       accessor: "price",
  //     },
  //     {
  //       Header: "Title",
  //       accessor: "title",
  //     },
  //   ],
  //   []
  // );

  const productsData = useMemo(() => [...products], [products]);
  // console.log(products[0]);
  const productsColumns = useMemo(
    () =>
      products[0]
        ? Object.keys(products[0])
            .filter((key) => key !== "")
            .map((key) => {
              if (key === "image")
                return {
                  Header: key,
                  accessor: key,
                  // Cell: ({ value }) => <img src={value} alt=''/>,
                  // maxWidth: 70,
                };

              return { Header: key, accessor: key };
            })
        : [],
    [products]
  );

  // const tableHooks = (hooks) => {
  //   hooks.visibleColumns.push((columns) => [
  //     ...columns,
  //     {
  //       id: "Edit",
  //       Header: "Edit",
  //       Cell: ({ row }) => (
  //         <button
  //           onClick={() => alert("Editing: " + row.values.price)}
  //           className="px-2 md:px-4 py-1 md:py-2 text-white rounded-md bg-lime-500 hover:bg-lime-600  transition-colors font-alegreya text-base md:text-lg"
  //         >
  //           Edit
  //         </button>
  //       ),
  //     },
  //   ]);
  // };

  const tableInstance = useTable(
    {
      columns: productsColumns,
      data: productsData,
    },
    useGlobalFilter,
    // tableHooks,
    useSortBy
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    preGlobalFilteredRows,
    setGlobalFilter,
    state,
  } = tableInstance;

  useEffect(() => {
    if(formData) fetchProducts();
  }, [formData]);

  const isEven = (idx) => idx % 2 === 0;

  return (
    <div className="px-4 md:px-16 py-4 md:py-8 w-full overflow-auto">
      <GlobalFilter
        preGlobalFilteredRows={preGlobalFilteredRows}
        setGlobalFilter={setGlobalFilter}
        globalFilter={state.globalFilter}
      />
      <table
        {...getTableProps()}
        className="table-fixed text-lg md:text-xl text-slate-700 font-alegreya "
      >
        <thead className="p-2">
          {headerGroups.map((headerGroup,index) => (
            <tr key={index}
              {...headerGroup.getHeaderGroupProps()}
              className="border
            border-slate-400"
            >
              {headerGroup.headers.map((column, index) => (
                <th key={index}
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className="border-2 bg-violet-200
                  border-slate-800
                  p-2 "
                >
                  <div className="flex flex-row items-center justify-center gap-2">
                    <span className="flex">{column.render("Header")}</span>
                    <span className="flex text-slate-900 text-base md:text-lg">
                      {column.isSorted
                        ? column.isSortedDesc
                          ? " ▼"
                          : " ▲"
                        : " ▲"}
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} className='bg-white'>
          {rows.map((row, index) => {
            prepareRow(row);

            return (
              <tr key={index}
                {...row.getRowProps()}
                className={isEven(index) ? "bg-white" : "bg-violet-200 "}
              >
                {row.cells.map((cell, index) => (
                  <td key={index}
                    {...cell.getCellProps()}
                    className="border
                  border-slate-400 p-2  "
                  >
                    <span className="flex items-center justify-center text-xs md:text-base font-oxygen text-slate-900">{cell.render('Cell')}</span>
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
