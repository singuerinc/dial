import { ILink } from "./ILink";

export interface ICategory {
  index: number;
  title: string;
  links: ILink[];
  className?: string;
}
