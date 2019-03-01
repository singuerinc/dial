import * as Maybe from "folktale/maybe";
import { IFeedItem } from "./IFeedItem";

export const save = (x: IFeedItem) => {
  return localStorage.setItem(`hn-item-${x.id}`, JSON.stringify(x));
};

export const load = (id: number): Maybe => {
  const stored = localStorage.getItem(`hn-item-${id}`);
  if (stored !== null) {
    return Maybe.Just(JSON.parse(stored));
  }
  return Maybe.Nothing();
};
