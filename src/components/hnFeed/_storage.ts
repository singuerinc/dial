import { IO } from "fp-ts/lib/IO";
import { fromNullable, none, Option, some } from "fp-ts/lib/Option";
import { IFeedItem } from "./IFeedItem";
import { Either, tryCatch2v } from "fp-ts/lib/Either";
import uniq from "ramda/es/uniq";

export const parse = <T>(s: string): Either<Error, T> => {
  return tryCatch2v(() => JSON.parse(s), reason => new Error(String(reason)));
};

export const setViewedInLocalStorage = (id: number) => {
  const task = new IO(() => fromNullable(localStorage.getItem("hn-viewed")));
  const arr = task.run().getOrElse("");
  const stored = parse<number[]>(arr).getOrElse([]);
  const viewed = uniq([...stored, id]);

  localStorage.setItem("hn-viewed", JSON.stringify(viewed));
};

export const getItemFromLocalStorage = <T>(key: string): Either<Error, T> => {
  const task = new IO(() => fromNullable(localStorage.getItem(key)));
  const value = task.run().getOrElse("");
  return parse(value);
};

// export const saveIdsInLocalStorage = (x: number) => {
//   localStorage.setItem(`hn-item-ids`, JSON.stringify(x));
//   return x;
// };

export const saveInLocalStorage = (x: IFeedItem) => {
  localStorage.setItem(`hn-item-${x.id}`, JSON.stringify(x));
  return x;
};
