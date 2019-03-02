import { none, some, Option } from "fp-ts/lib/Option";
import { IFeedItem } from "./IFeedItem";

export const save = (x: IFeedItem): Option<IFeedItem> => {
  localStorage.setItem(`hn-item-${x.id}`, JSON.stringify(x));
  return some(x);
};

export const load = (id: number): Option<IFeedItem> => {
  const stored = localStorage.getItem(`hn-item-${id}`);
  if (stored !== null) {
    return some(JSON.parse(stored));
  }
  return none;
};
