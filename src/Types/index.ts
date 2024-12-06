import { ReactNode } from "react";

export interface childrenProps{
    children:ReactNode
}

export interface ITitle {
  mainText: string;
  additionalText?: string;
  children?:ReactNode
}
