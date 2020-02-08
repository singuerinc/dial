import uniq from "ramda/es/uniq";
import { IFeedItem } from "./IFeedItem";

export const parse = (s: string) => {
  return JSON.parse(s);
};

export const setViewedInLocalStorage = (id: number) => {
  const task = localStorage.getItem("hn-viewed") ?? "[]";
  const stored = parse(task);
  const viewed = uniq([...stored, id]);

  localStorage.setItem("hn-viewed", JSON.stringify(viewed));
};

export const getItemFromLocalStorage = (key: string) => {
  const value = localStorage.getItem(key) ?? "[]";
  return value === "[]" ? null : parse(value);
};

export const saveInLocalStorage = (x: IFeedItem) => {
  localStorage.setItem(`hn-item-${x.id}`, JSON.stringify(x));
  return x;
};
