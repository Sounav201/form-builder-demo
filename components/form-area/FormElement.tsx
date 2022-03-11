import { FormAreaItem } from "./FormArea.types";
import {FC} from 'react' 
interface FormElementProps extends FormAreaItem<any>{
    index:number
    moveItem:(dragIndex:number, hoverIndex:number) => void
    

}

import React, { ReactChild } from 'react'

const FormElement : FC<{}> =  ({children}, props) => {
  return (
    <>{children}</>
  )
}

export default FormElement