import * as data from "./data.json";
import { ILink } from "./ILink";
import { ICategory } from "./list/IdleList";

export const bookmarks: ILink[] = data.default
  .sort((x: ICategory, y: ICategory) => (x.title > y.title ? 1 : -1))
  .map((cat: ICategory) => cat.links.sort((x: ILink, y: ILink) => (x.label > y.label ? 1 : -1)))
  .flat()
  .sort((x: ILink, y: ILink) => (x.label[0] > y.label[0] ? 1 : -1));
