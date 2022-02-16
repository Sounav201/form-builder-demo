import { ElementAttributes } from "../element-bank/ElementBank.types";
import { FormAreaItem } from "../form-area/FormArea.types";

export interface ElementPropertiesProps {
    selectedItem:  FormAreaItem<ElementAttributes> | null;
    onItemPropertiesChange: (item:FormAreaItem<ElementAttributes>) => any;

}