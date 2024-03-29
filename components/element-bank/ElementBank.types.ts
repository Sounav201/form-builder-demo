import { HTMLAttributes, JSXElementConstructor } from "react";
import { IconType } from "react-icons";

export interface ElementBankProps extends HTMLAttributes<any>{

}

export enum ElementType {
    SHORT_TEXT = "shorttext",
    CHECKBOX = "checkbox",
    LONG_TEXT = "longtext",
    RATING = "rating",
    FILE_UPLOAD = "fileupload",
    DROPDOWN = "dropdown",
    DATEPICKER = "datepicker",
} 

export interface LogicalAttributes{
    
}

export interface StylingAttributes {
    fontColor:string;
    questionImage:string;
    fontType:string;
}
export interface RatingStyleAttributes extends StylingAttributes{
    hoverColor:string;
    fillColor:string;
}

export type ElementAttributes = ShortTextAttributes | CheckboxAttributes | RatingAttributes | FileUploadAttributes | LongTextAttributes | DatePickerAttributes;

//Default structure of Shorttext element
export interface ShortTextAttributes{
    required:Boolean
    styling:StylingAttributes;
    icon:IconType;
    inputType:string;
}
//Default structure of Rating element
export interface RatingAttributes {
    required:Boolean
    styling:RatingStyleAttributes;
    icon:IconType;
    limit:number;
    emoji:string;

}
//Default structure of Checkbox element
export interface CheckboxAttributes{
    required:Boolean;
    styling:StylingAttributes;
    icon:IconType; 
    choices:{
        value:string;
        label:string;
        id:string;
    }[];
}
//Default structure of Longtext element
export interface LongTextAttributes{
    required:Boolean
    styling:StylingAttributes;
    icon:IconType;

}

//Default structure of FileUpload element
export interface FileUploadAttributes{
    required:Boolean
    typeofFile:string
    styling:StylingAttributes
    icon:IconType;
}
export interface DatePickerAttributes{
    required:Boolean
    styling:StylingAttributes
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