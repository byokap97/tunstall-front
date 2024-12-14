import { SVGProps } from "react";

export type IconImgProps = {
  width?: number;
  height?: number;
  alt?: string;
};

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface Menu {
  categories: Category[];
}

export interface Category {
  id: string;
  name: string;
  items: MenuItem[];
}

export interface MenuItem {
  id: string;
  description: string;
  price: number;
}

export interface Table {
  id: number;
  state: TableState;
  request: MenuItem[];
}

export enum TableState {
  Empty = "Empty",
  Waiting = "Waiting",
  Attended = "Attended",
}
