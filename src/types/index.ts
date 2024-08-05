import { StaticImageData } from "next/image";

export type LinksPosition = "header" | "drawer";

export type SpecialtiesItem = {
  text: string;
  path: string;
  width: number;
  height: number;
  icon: string;
};

export type statistic = {
  title: string;
  start: number;
  number: number;
  timer?: number;
};

export type Branches = {
  title: string;
  description: string;
  image: StaticImageData;
};
