import { ElementAttributes, ElementType } from "../element-bank/ElementBank.types";
export interface FormAreaProps {
    items: FormAreaItem<ElementAttributes>[];
    moveCard: (dragIndex: number, hoverIndex: number) => any;
    onQuestionSelected: (item: FormAreaItem<ElementAttributes>) => any;
    onQuestionTextChange: (item: FormAreaItem<ElementAttributes>, question: string) => any;
    onDrop: (item: FormAreaItem<ElementAttributes>) => any;
    onItemDelete: (item: FormAreaItem<ElementAttributes>) => any;
    setshowSidebar:()=> any;
    onOptionEdit:(item: FormAreaItem<ElementAttributes>,option:string, choiceIndex:number) => any;
    onOptionAdd:(item: FormAreaItem<ElementAttributes>) => any;
    onOptionDelete: (item: FormAreaItem<ElementAttributes>, choiceIndex:number) => any;
    moveItem:(dragIndex:number, hoverIndex:number) => void

  }
  
  
export interface FormAreaItem<T> {
    id: string;
    index:number;
    question: string;
    attributes: T;
    type: ElementType;
    numbering: number;
    isSelected: boolean;
    moveCard: (dragIndex: number, hoverIndex: number) => any;
    onDelete: () => any;
    onQuestionTextChanged: (questionText: string) => any;
    onQuestionSelected: () => any;
    onOptionEdit:(option:string, choiceIndex:number) => any;
    onOptionAdd:() => any;
    onOptionDelete:( choiceIndex:number) => any;

  }
  
  export interface DragItem {
    index: number;
    id: string;
    type: string;
  }
  