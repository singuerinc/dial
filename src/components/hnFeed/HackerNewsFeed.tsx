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
    // load the top histories ids and get first 10
    loadTop().then(maybeTop => {
      compose(
        setTop,
        take10
      )(maybeTop.getOrElse([]));
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
    <>
      <h1>Hacker News Feed</h1>
      <View>
        {feed.map((item: IFeedItem, index) => (
          <li key={index}>
            <a href={item.url} target="_blank">
              {item.title}
            </a>
          </li>
        ))}
      </View>
    </>
  );
}

const View = styled.ul`
  > li {
    margin: 1em 0;
    > a {
      color: grey;
      text-decoration: none;
    }
  }
`;
