import uniq from "ramda/es/uniq";
import { IFeedItem } from "./IFeedItem";

export const parse = (s: string) => JSON.parse(s);

export const setViewedInLocalStorage = (stored: number[]) => {
  const viewed = uniq(stored);
  localStorage.setItem("hn-viewed", JSON.stringify(viewed));
  return viewed;
};

export const getItemFromLocalStorage = (key: string) => {
  const value = localStorage.getItem(key) ?? "[]";
  return value === "[]" ? null : parse(value);
};

export const saveInLocalStorage = (x: IFeedItem) => {
  localStorage.setItem(`hn-item-${x.id}`, JSON.stringify(x));
  return x;
};
