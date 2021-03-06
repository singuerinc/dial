import { uniq } from "lodash/fp";
import { IFeedItem } from "./types";

export const parse = (s: string) => JSON.parse(s);

export const setViewedInLocalStorage = (stored: number[]) => {
  const viewed = uniq(stored);
  localStorage.setItem("reddit/viewed", JSON.stringify(viewed));
  return viewed;
};

export const getItemFromLocalStorage = (key: string) => {
  const value = localStorage.getItem(key) ?? "[]";
  return value === "[]" ? null : parse(value);
};

export const saveInLocalStorage = (x: IFeedItem) => {
  localStorage.setItem(`reddit/item-${x.id}`, JSON.stringify(x));
  return x;
};
