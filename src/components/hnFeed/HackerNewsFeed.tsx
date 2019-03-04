import curry from "ramda/es/curry";
import take from "ramda/es/take";
import without from "ramda/es/without";
import * as React from "react";
import { useEffect, useState } from "react";
import { of } from "rxjs";
import { mergeMap } from "rxjs/operators";
import styled from "styled-components";
import { fetch } from "../../utils/fetch";
import { IFeedItem } from "./IFeedItem";
import {
  getItemFromLocalStorage,
  saveInLocalStorage,
  setViewedInLocalStorage
} from "./_storage";

const take10 = take<number>(10);

const rejectViewed = curry((arr1: number[], arr2: number[]) => {
  return without(arr1, arr2);
});

const setAsNotViewed = (x: IFeedItem): IFeedItem => ({
  ...x,
  viewed: false
});

const loadItem = (id: number) => {
  // let's try to get it from localStorage
  const maybeItem = getItemFromLocalStorage<IFeedItem>(`hn-item-${id}`);

  if (maybeItem.isLeft()) {
    // the item is not in cache, let's load it from the API
    return fetch<IFeedItem>(
      `https://hacker-news.firebaseio.com/v0/item/${id}.json`
    ).run();
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

    const task = fetch<number[]>(
      "https://hacker-news.firebaseio.com/v0/topstories.json"
    );

    // top 10 IDs and not viewed
    task.run().then(num =>
      num
        .map(rejectViewed(viewedIDs))
        .map(take10)
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

    const updated = feed.map(x => (x === item ? { ...x, viewed: true } : x));
    setFeed(updated);

    window.open(item.url);
  };

  const textColor = (x: boolean) => (x ? "white" : "moon-gray");
  const textDecoration = (x: boolean) => (x ? "strike" : "no-underline");

  return (
    <View className="tracked">
      <h1 className="fw4 near-white">Hacker News Feed</h1>
      <ul className="list pa0 w-100 flex flex-wrap">
        {feed.map((item: IFeedItem, index) => (
          <li key={index} className="flex br2 hover-bg-black bg-animate">
            <a
              className={`w-100 flex-shrink-0 flex-grown-0 pointer fw3 f5 db pa3 ${textColor(
                item.viewed
              )} ${textDecoration(item.viewed)}`}
              onClick={handleClick(item)}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </View>
  );
}

const View = styled.div`
  ul {
    margin: 0 -0.5em;
    li {
      flex: 0 1 calc(25% - 1em);
      margin: 0.5em;
    }
  }
`;
