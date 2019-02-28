import * as React from "react";
import { ICategory } from "./bookmarks/ICategory";
import { Bookmarks } from "./bookmarks/Bookmarks";
import * as data from "./bookmarks/data.json";
import { ILink } from "./bookmarks/ILink";

// TODO: move this to a service
// @ts-ignore
const sortedList: ICategory[] = data.default
  .sort((x: ICategory, y: ICategory) => (x.title > y.title ? 1 : -1))
  .map((cat: ICategory) => {
    const links = cat.links.sort((x: ILink, y: ILink) =>
      x.label > y.label ? 1 : -1
    );
    return { ...cat, links };
  });

export function Dial() {
  return (
    <div>
      <Bookmarks list={sortedList} />
    </div>
  );
}
