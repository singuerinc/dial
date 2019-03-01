import axios from "axios";
import take from "ramda/es/take";
import compose from "ramda/es/compose";
import concat from "ramda/es/concat";
import * as React from "react";
import { useEffect, useState } from "react";
import { of } from "rxjs";
import { mergeMap } from "rxjs/operators";
import styled from "styled-components";
import { IFeedItem } from "./IFeedItem";
import { load, save } from "./_storage";
import * as Maybe from "folktale/maybe";

const take10 = take<number>(10);
const isNothing = Maybe.Nothing.hasInstance;

const loadTop = async () => {
  return axios
    .get("https://hacker-news.firebaseio.com/v0/topstories.json")
    .then(({ data }) => Maybe.Just(data))
    .catch(() => Maybe.Nothing());
};

export function HackerNewsFeed() {
  const [top, setTop] = useState<number[]>([]);
  const [feed, setFeed] = useState<IFeedItem[]>([]);

  useEffect(() => {
    // load the Top 10 histories ids
    loadTop().then(maybeTop => {
      const top = maybeTop.map(take10).getOrElse([]);
      setTop(top);
    });
  }, []);

  useEffect(() => {
    const loadItem = (id: number) => {
      // let's try to get the item from localStorage
      const maybeStored = load(id);

      // if we got Nothing, let's loaded with the API
      if (isNothing(maybeStored)) {
        return axios
          .get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
          .then(({ data }) => Maybe.Just(data))
          .catch(() => Maybe.Nothing());
      }

      return [maybeStored];
    };

    const result = of(...top).pipe(mergeMap(loadItem, undefined, 1));
    const subscription = result.subscribe(maybeItem => {
      if (!isNothing(maybeItem)) {
        const item: IFeedItem = maybeItem.getOrElse();
        save(item);
        setFeed(feed => [...feed, item]);
      }
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

const View = styled.ul`
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
