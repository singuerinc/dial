import * as data from "./data.json";
import { ICategory } from "./ICategory";
import { ILink } from "./ILink";

// @ts-ignore
export const bookmarks: ICategory[] = data.default
  .sort((x: ICategory, y: ICategory) => (x.title > y.title ? 1 : -1))
  .map((cat: ICategory) => {
    const links = cat.links.sort((x: ILink, y: ILink) =>
      x.label > y.label ? 1 : -1
    );
    return { ...cat, links };
  });
