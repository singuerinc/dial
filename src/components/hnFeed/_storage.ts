import * as Maybe from "folktale/maybe";
import { IFeedItem } from "./IFeedItem";

export const save = (x: IFeedItem): IFeedItem => {
  localStorage.setItem(`hn-item-${x.id}`, JSON.stringify(x));
  return x;
};

export const load = (id: number): Maybe => {
  const stored = localStorage.getItem(`hn-item-${id}`);
  if (stored !== null) {
    return Maybe.Just(JSON.parse(stored));
  }
  return Maybe.Nothing();
};
