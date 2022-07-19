import { HTMLAttributes, JSXElementConstructor } from "react";
import { IconType } from "react-icons";

export interface ElementBankProps extends HTMLAttributes<any>{

}

export enum ElementType {
    SHORT_TEXT = "shorttext",
    CHECKBOX = "checkbox",
    LONG_TEXT = "longtext",
    RATING = "rating",
    FILE_UPLOAD = "fileupload"
} 

export interface LogicalAttributes{
    
}

export interface StylingAttributes {
    fontColor:string;
    fontBackground:string;
}

export type ElementAttributes = ShortTextAttributes | CheckboxAttributes;

//Default structure of Shorttext element
export interface ShortTextAttributes{
    required:Boolean
    styling:StylingAttributes;
    icon:IconType;
}

//Default structure of Checkbox element
export interface CheckboxAttributes{
    required:Boolean;
    styling:StylingAttributes;
    icon:IconType; 
    choices:{
        value:string;
        label:string;
        id:String;
    }[];
}

export interface LongTextAttributes{
    required:Boolean
    styling:StylingAttributes;
    icon:IconType;

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