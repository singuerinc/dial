import axios from "axios";
import * as React from "react";
import { useEffect, useState } from "react";
import { of } from "rxjs";
import { mergeMap } from "rxjs/operators";
import styled from "styled-components";
import take from "ramda/es/take";

interface IFeedItem {
  by: string;
  descendants: number;
  id: number;
  kids: number[];
  score: number;
  time: number;
  title: string;
  type: string;
  url: string;
}

export function HackerNewsFeed() {
  const [top, setTop] = useState<number[]>([]);
  const [feed, setFeed] = useState<IFeedItem[]>([]);

  useEffect(() => {
    (async () => {
      await axios
        .get("https://hacker-news.firebaseio.com/v0/topstories.json")
        .then(({ data: all }) => {
          setTop(take(10, all));
        });
    })();
  }, []);

  useEffect(() => {
    const result = of(...top).pipe(
      mergeMap(
        id =>
          axios
            .get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
            .then(({ data }) => data),
        undefined,
        1
      )
    );

    const subscription = result.subscribe((x: IFeedItem) => {
      setFeed(feed => [...feed, x]);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [top]);

  return (
    <View>
      {feed.map((item: IFeedItem, index) => (
        <li key={index}>
          <a href={item.url} target="_blank">
            {item.title}
          </a>
        </li>
      ))}
    </View>
  );
}

const View = styled.ul`
  > li > a {
    color: grey;
  }

  @media (min-width: 992px) {
  }
`;
