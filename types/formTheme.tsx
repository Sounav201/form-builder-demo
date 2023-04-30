import { HTMLAttributes } from "react";

export type AddThemeTabButton = {
  text: string,
  style: className,
  selectedStyle: className,
  selectedAltStyle: className,
}

type className = HTMLAttributes<HTMLElement>["className"];