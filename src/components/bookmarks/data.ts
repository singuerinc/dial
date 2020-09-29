import * as data from "./data.json";
import { ILink } from "./types";

export const bookmarks: ILink[] = data.default
  .flat()
  .sort((x: ILink, y: ILink) => (x.label[0] > y.label[0] ? 1 : -1));
