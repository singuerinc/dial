import curry from "ramda/es/curry";
import map from "ramda/es/map";
import take from "ramda/es/take";
import without from "ramda/es/without";
import * as React from "react";
import { useEffect, useState } from "react";
import { of } from "rxjs";
import { mergeMap } from "rxjs/operators";
import { fetch } from "../../utils/fetch";
import { IFeedItem } from "./IFeedItem";
import {
  getItemFromLocalStorage,
  saveInLocalStorage,
  setViewedInLocalStorage
} from "./_storage";

const TOP_STORIES_URL = "https://hacker-news.firebaseio.com/v0/topstories.json";
const ITEM_URL = (id: number) =>
  `https://hacker-news.firebaseio.com/v0/item/${id}.json`;

const take20 = take<number>(20);
const rejectViewed = curry((arr1: number[], arr2: number[]) =>
  without(arr1, arr2)
);

const setAsNotViewed = (x: IFeedItem): IFeedItem => ({
  ...x,
  viewed: false
});

const loadItem = (id: number) => {
  // let's try to get it from localStorage
  const maybeItem = getItemFromLocalStorage<IFeedItem>(`hn-item-${id}`);

  if (maybeItem.isLeft()) {
    // the item is not in cache, let's load it from the API
    return fetch<IFeedItem>(ITEM_URL(id)).run();
  }

  return [maybeItem];
};

export function HackerNewsFeed() {
  const [top, setTop] = useState<number[]>([]);
  const [feed, setFeed] = useState<IFeedItem[]>([]);

  useEffect(() => {
    // get from localStorage those ids that already viewed
    const viewedIDs = getItemFromLocalStorage<number[]>("hn-viewed").getOrElse(
      []
    );

    const task = fetch<number[]>(TOP_STORIES_URL);

    // top 10 IDs and not viewed
    task.run().then(num =>
      num
        .map(rejectViewed(viewedIDs))
        .map(take20)
        .map(setTop)
    );
  }, []);

  useEffect(() => {
    const result = of(...top).pipe(mergeMap(loadItem, undefined, 1));
    const subscription = result.subscribe(maybeItem => {
      maybeItem
        .map(saveInLocalStorage)
        .map(setAsNotViewed)
        .map(x => {
          setFeed(feed => [...feed, x]);
        });
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [top]);

  const handleClick = (item: IFeedItem) => () => {
    setViewedInLocalStorage(item.id);

    const updated = map(x => (x === item ? { ...x, viewed: true } : x), feed);
    setFeed(updated);

    window.open(item.url);
  };

  const textColor = (x: boolean) => (x ? "moon-gray" : "black");
  const textDecoration = (x: boolean) => (x ? "strike" : "no-underline");

  return (
    <div>
      <h1 className="fw4 f3">Hacker News Feed</h1>
      <ul className="list pa0 ma0 flex flex-column">
        {feed.map((item: IFeedItem, index) => (
          <li key={index} className="flex w-100 mv1">
            <a
              className={`pointer underline-hover link fw3 f5 db ${textColor(
                item.viewed
              )} ${textDecoration(item.viewed)}`}
              onClick={handleClick(item)}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
