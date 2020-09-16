import { useMachine } from "@xstate/react";
import { compose, curry, path, take, without } from "lodash/fp";
import * as React from "react";
import { of } from "rxjs";
import { mergeMap, map as rxMap, take as rxTake } from "rxjs/operators";
import { assign, Machine } from "xstate";
import { fetch } from "../../utils/fetch";
import { IFeedItem, IHackerNewsStory } from "./IFeedItem";
import { getItemFromLocalStorage, saveInLocalStorage } from "./_storage";

const TOP_STORIES_URL = "https://hacker-news.firebaseio.com/v0/topstories.json";
const toItemUrl = (id: number) =>
  `https://hacker-news.firebaseio.com/v0/item/${id}.json`;

const markAsNotViewed = (x: IFeedItem): IFeedItem => ({
  ...x,
  viewed: false
});

const loadItem = async (id: number): Promise<IFeedItem> => {
  const maybeItem: IFeedItem | null = getItemFromLocalStorage(`hn-item-${id}`);

  if (maybeItem === null) {
    const story = await fetch<IHackerNewsStory>(toItemUrl(id));
    return {
      ...story,
      viewed: false,
      comments_url: `https://news.ycombinator.com/item?id=${story.id}`
    };
  } else {
    return Promise.resolve(maybeItem);
  }
};

interface Context {
  top5: number[];
  feed: IHackerNewsStory[];
}

const machine = Machine<Context>(
  {
    initial: "loadTop",
    context: {
      top5: [],
      feed: []
    },
    states: {
      loadTop: {
        invoke: {
          src: "loadTop5",
          onDone: {
            target: "loadFeed",
            actions: assign({ top5: (_, event) => event.data })
          }
        }
      },
      loadFeed: {
        invoke: {
          src: "loadFeed",
          onDone: "idle"
        },
        on: {
          SAVE_ITEM: {
            actions: assign({ feed: (ctx, event) => [...ctx.feed, event.data] })
          }
        }
      },
      idle: {}
    }
  },
  {
    services: {
      loadTop5: () =>
        fetch(TOP_STORIES_URL).then(compose(take(5), without([]))),
      loadFeed: ctx =>
        of(...ctx.top5)
          .pipe(mergeMap(loadItem, 1))
          .pipe(
            rxMap(item => ({
              type: "SAVE_ITEM",
              data: compose(markAsNotViewed, saveInLocalStorage)(item)
            }))
          )
    }
  }
);

export function HackerNewsFeed() {
  const [state, send] = useMachine(machine);
  const { feed } = state.context;
  console.log(state.value);

  const isLoading = !state.matches("idle");

  // const handleClick = (item: IFeedItem) => () => {
  //   setViewedInLocalStorage(item.id);

  //   const updated = map(x => (x === item ? { ...x, viewed: true } : x), feed);
  //   setFeed(updated);

  //   window.open(item.url);
  // };

  const textColor = (x: boolean) => (x ? "moon-gray" : "white");
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
              className={`pointer underline-hover link fw5 f5 db ${textColor(
                item.viewed
              )} ${textDecoration(item.viewed)}`}
            >
              {item.title}
            </a>
            <a
              className={`pointer gray underline-hover link f7 db ml2`}
              href={item.comments_url}
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
