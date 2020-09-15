import curry from "ramda/es/curry";
import map from "ramda/es/map";
import path from "ramda/es/path";
import pipe from "ramda/es/pipe";
import compose from "ramda/es/compose";
import take from "ramda/es/take";
import without from "ramda/es/without";
import * as React from "react";
import { useEffect, useState } from "react";
import { of } from "rxjs";
import { mergeMap } from "rxjs/operators";
import { assign, Machine } from "xstate";
import { fetch } from "../../utils/fetch";
import { IFeedItem } from "./IFeedItem";
import { useMachine } from "@xstate/react";
import {
  getItemFromLocalStorage,
  saveInLocalStorage,
  setViewedInLocalStorage
} from "./_storage";

const TOP_STORIES_URL = "https://hacker-news.firebaseio.com/v0/topstories.json";
const toItemUrl = (id: number) =>
  `https://hacker-news.firebaseio.com/v0/item/${id}.json`;

const pathToCommentsUrl = path<string>(["comments_url"]);

const rejectViewed = curry((arr1: number[], arr2: number[]) =>
  without(arr1, arr2)
);

const setAsNotViewed = (x: IFeedItem): IFeedItem => ({
  ...x,
  viewed: false
});

const addLinkToComments = (x: IFeedItem): IFeedItem => ({
  ...x,
  comments_url: `https://news.ycombinator.com/item?id=${x.id}`
});

const loadItem = (id: number) => {
  // let's try to get it from localStorage
  const maybeItem = getItemFromLocalStorage(`hn-item-${id}`);

  if (maybeItem === null) {
    // the item is not in cache, let's load it from the API
    return fetch(toItemUrl(id));
  }

  return maybeItem;
};

const machine = Machine(
  {
    initial: "loadTop",
    context: {
      top25: [],
      feed: []
    },
    states: {
      loadTop: {
        invoke: {
          src: "loadTop25",
          onDone: {
            target: "loadFeed",
            actions: assign({ top25: (_, event) => event.data })
          }
        }
      },
      loadFeed: {
        invoke: {
          src: "loadFeed",
          onDone: {
            target: "idle",
            actions: assign({ feed: (_, event) => event.data })
          }
        }
      },
      idle: {}
    }
  },
  {
    services: {
      loadTop25: (ctx, event) => callback => {
        return fetch(TOP_STORIES_URL).then((ids: number[]) => {
          const nonViewedTop25 = compose<number[], number[], number[]>(
            take(25),
            rejectViewed([])
          );

          return nonViewedTop25(ids);
        });
      },
      loadFeed: (ctx, event) => {
        return of(ctx.top25)
          .pipe(mergeMap(loadItem, undefined, 1))
          .subscribe({
            next(item) {
              console.log(item);

              // const itemFeed = pipe(
              //   saveInLocalStorage,
              //   setAsNotViewed,
              //   addLinkToComments
              // )(item);
              // setFeed([...feed, itemFeed]);
            }
          });
      }
    }
  }
);

export function HackerNewsFeed() {
  const [isLoading, setIsLoading] = useState(true);
  const [top, setTop] = useState<number[]>([]);
  const [feed, setFeed] = useState<IFeedItem[]>([]);

  const [state, send] = useMachine(machine);

  console.log(state.value);

  // useEffect(() => {
  //   // get from localStorage those ids that already viewed
  //   const viewedIDs = getItemFromLocalStorage("hn-viewed") ?? [];
  //   const task = fetch(TOP_STORIES_URL);

  //   // top 10 IDs and not viewed
  //   task.then((num: number[]) => {
  //     const top25 = pipe(rejectViewed(viewedIDs), take(25), () => num);
  //     // console.log({ top25 });

  //     console.log(top25());

  //     setTop(top25());
  //   });
  // }, []);

  // useEffect(() => {
  //   if (top.length === 0) {
  //     return;
  //   }

  //   setIsLoading(true);
  //   console.log({ top });

  //   const poll$ = of(...top)
  //     .pipe(mergeMap(loadItem, undefined, 1))
  //     .subscribe({
  //       next(item) {
  //         console.log(item);

  //         const itemFeed = pipe(
  //           saveInLocalStorage,
  //           setAsNotViewed,
  //           addLinkToComments
  //         )(item);
  //         setFeed([...feed, itemFeed]);
  //       },
  //       complete() {
  //         setIsLoading(false);
  //       }
  //     });

  //   return () => {
  //     poll$.unsubscribe();
  //   };
  // }, [top, feed]);

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
      <h1 className="fw4 f3">
        Hacker News
        {isLoading && <small className="f5 ml2 light-gray">Loading...</small>}
      </h1>
      <ul className="list pa0 ma0 flex flex-column">
        {feed.map((item: IFeedItem, index) => (
          <li key={index} className="flex items-end w-100 mv1">
            <a
              className={`pointer underline-hover link fw3 f5 db ${textColor(
                item.viewed
              )} ${textDecoration(item.viewed)}`}
              onClick={handleClick(item)}
            >
              {item.title}
            </a>
            <a
              className={`pointer gray underline-hover link f7 db ml2`}
              href={pathToCommentsUrl(item)}
              target="_blank"
            >
              Comments
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
