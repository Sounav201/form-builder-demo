import { HTMLAttributes, JSXElementConstructor } from "react";
import { IconType } from "react-icons";

export interface ElementBankProps extends HTMLAttributes<any>{

}

export enum ElementType {
    SHORT_TEXT = "shorttext",
    CHECKBOX = "checkbox"
} 

export interface StylingAttributes {
    fontColor:string;
    fontBackground:string;
}

export type ElementAttributes = ShortTextAttributes | CheckboxAttributes;

export interface ShortTextAttributes{
    styling:StylingAttributes;
    icon:IconType;
}

export interface CheckboxAttributes{
    styling:StylingAttributes;
    icon:IconType; 
    choices:{
        value:string;
        label:string;
    }[];
}

//Default structure of any form element
export interface FormElement<T>{
    type:ElementType;
    question:string;
    attributes:T;
    displayName:string;
}

export interface ElementProps<T> extends FormElement<T>{
    handleClose:() => any;
}