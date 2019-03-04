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

  return (
    <View>
      <h1 className="fw4">Hacker News Feed</h1>
      <ul className="list pa0">
        {feed.map((item: IFeedItem, index) => (
          <li key={index}>
            <Link
              className="fw3"
              viewed={item.viewed}
              onClick={handleClick(item)}
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </View>
  );
}

const View = styled.div`
  letter-spacing: 0.1em;
  h1 {
    color: var(--oc-gray-7);
  }

  ul {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    margin: 0 -0.5em;
    li {
      background-color: var(--oc-gray-9);
      border-radius: 3px;
      flex: 0 1 calc(25% - 1em);
      margin: 0.5em;
      transition: background-color 0.3s ease;
      display: flex;
      &:hover {
        background-color: var(--oc-gray-8);
      }
    }
  }
`;

const Link = styled.a<{ viewed: boolean }>`
  flex: 0 0 100%;
  padding: 1em;
  display: block;
  color: ${({ viewed }) => (viewed ? "var(--oc-gray-8)" : "var(--oc-gray-6)")};
  text-decoration: ${({ viewed }) => (viewed ? "line-through" : "none")};
  cursor: pointer;
`;
