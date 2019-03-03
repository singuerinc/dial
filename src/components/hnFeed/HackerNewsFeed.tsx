import axios from "axios";
import { none, some, Option, Some } from "fp-ts/lib/Option";
import curry from "ramda/es/curry";
import take from "ramda/es/take";
import * as React from "react";
import { useEffect, useState } from "react";
import { of } from "rxjs";
import { mergeMap } from "rxjs/operators";
import styled from "styled-components";
import { IFeedItem } from "./IFeedItem";
import { load, save } from "./_storage";
import { compose, concat } from "fp-ts/lib/function";

const take10 = take<number>(10);

const loadTop = async (): Promise<Option<number[]>> => {
  return axios
    .get("https://hacker-news.firebaseio.com/v0/topstories.json")
    .then(({ data }) => some(data))
    .catch(() => none);
};

export function HackerNewsFeed() {
  const [top, setTop] = useState<number[]>([]);
  const [feed, setFeed] = useState<IFeedItem[]>([]);

  useEffect(() => {
    // load the Top 10 histories ids
    loadTop().then(maybeData => {
      maybeData.map(take10).map(setTop);
    });
  }, []);

  useEffect(() => {
    const loadItem = (
      id: number
    ): Some<IFeedItem>[] | Promise<Option<IFeedItem>> => {
      // let's try to get the item from localStorage
      const maybeStored = load(id);

      // if we got Nothing, let's loaded with the API
      if (maybeStored.isNone()) {
        return axios
          .get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
          .then(({ data }) => some(data))
          .catch(() => none);
      }

      return [maybeStored];
    };

    const result = of(...top).pipe(mergeMap(loadItem, undefined, 1));
    const subscription = result.subscribe(maybeItem => {
      maybeItem.map(save).map(x => {
        setFeed(feed => [...feed, x]);
      });
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [top]);

  return (
    <View>
      <h1>Hacker News Feed</h1>
      <ul>
        {feed.map((item: IFeedItem, index) => (
          <li key={index}>
            <a href={item.url} target="_blank">
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </View>
  );
}

const View = styled.div`
  font-family: "Roboto";
  letter-spacing: 0.1em;
  h1 {
    font-size: 2em;
    font-weight: 400;
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
      a {
        flex: 0 0 100%;
        padding: 1em;
        font-weight: 300;
        display: block;
        color: var(--oc-gray-6);
        text-decoration: none;
      }
    }
  }
`;
