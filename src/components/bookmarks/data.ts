import * as data from "./data.json";
import { ILink } from "./ILink";
import { ICategory } from "./list/IdleList";

// @ts-ignore
export const bookmarks: ILink[] = data.default
  .sort((x: ICategory, y: ICategory) => (x.title > y.title ? 1 : -1))
  .map((cat: ICategory) => {
    const links = cat.links.sort((x: ILink, y: ILink) => (x.label > y.label ? 1 : -1));
    return links;
  })
  .flat()
  .sort((x: ILink, y: ILink) => (x.label[0] > y.label[0] ? 1 : -1));
