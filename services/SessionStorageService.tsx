import { type } from "os";
import { useEffect } from "react";

export const FORM_ITEMS_SESSION_KEY = "form_area_items";
export class SessionStorageService {
  static saveItem(key: string, data: any) {
      useEffect(() => {
        if(typeof(window)!== undefined)
        {
      sessionStorage.setItem(key, JSON.stringify(data));
        }
      }, [])
      
  }
  static getItem(key: string) {

    
      if(typeof(window)!== undefined){
    const item = sessionStorage.getItem(key);
    if (item !== null) {
      return JSON.parse(item);
    }
    return null;
    }
  }
}
