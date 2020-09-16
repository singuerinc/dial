import { useMachine } from "@xstate/react";
import { compose, take, without } from "lodash/fp";
import * as React from "react";
import { of } from "rxjs";
import { map as rxMap, mergeMap } from "rxjs/operators";
import { assign, Machine } from "xstate";
import { fetch } from "../../utils/fetch";
import { IFeedItem, IHackerNewsStory } from "./IFeedItem";
import {
  getItemFromLocalStorage,
  setViewedInLocalStorage,
  saveInLocalStorage
} from "./_storage";

const NUM_OF_STORIES = 10;
const TOP_STORIES_URL = "https://hacker-news.firebaseio.com/v0/topstories.json";
const toItemUrl = (id: number) =>
  `https://hacker-news.firebaseio.com/v0/item/${id}.json`;

const textColor = (isViewed: boolean) => (isViewed ? "moon-gray" : "orange");
const textDecoration = (isViewed: boolean) =>
  isViewed ? "strike" : "no-underline";

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
  top: number[];
  feed: IFeedItem[];
  viewed: number[];
}

const machine = Machine<Context>(
  {
    initial: "loadTop",
    context: {
      viewed: getItemFromLocalStorage("hn-viewed") ?? [],
      top: [],
      feed: []
    },
    states: {
      loadTop: {
        entry: assign(_ => ({ top: [], feed: [] })),
        invoke: {
          src: "loadTopService",
          onDone: {
            target: "loadFeed",
            actions: assign({ top: (_, event) => event.data })
          }
        }
      },
      loadFeed: {
        entry: assign(_ => ({ feed: [] })),
        invoke: {
          src: "loadFeedService",
          onDone: "idle"
        },
        on: {
          SAVE_ITEM: {
            actions: assign({ feed: (ctx, event) => [...ctx.feed, event.data] })
          }
        }
      },
      idle: {
        on: {
          MARK_AS_VIEWED: {
            actions: ["markAsViewedInStorage", "markAsViewed"]
          },
          REFRESH: "loadTop"
        }
      }
    }
  },
  {
    actions: {
      markAsViewedInStorage: (ctx, event) =>
        setViewedInLocalStorage([...ctx.viewed, event.data.id]),
      markAsViewed: assign((ctx, event) => {
        const item: IHackerNewsStory = event.data;
        const feed = ctx.feed.map(x => {
          if (x.id === item.id) {
            x.viewed = true;
          }
          return x;
        });
        return { viewed: [...ctx.viewed, item.id], feed };
      })
    },
    services: {
      loadTopService: ctx =>
        fetch(TOP_STORIES_URL)
          .then(without(ctx.viewed))
          .then(take(NUM_OF_STORIES)),
      loadFeedService: ctx =>
        of(...ctx.top)
          .pipe(mergeMap(loadItem, 2))
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

  const handleRefresh = () => send("REFRESH");

  const handleRemove = (item: IFeedItem) => () => {
    send({ type: "MARK_AS_VIEWED", data: item });
  };

  const handleClick = (item: IFeedItem) => () => {
    send({ type: "MARK_AS_VIEWED", data: item });
    window.open(item.url);
  };

  return (
    <div className="w-100" style={{ marginTop: "5.2em" }}>
      <ul className="list pa0 ma0 flex flex-column">
        {feed.map((item: IFeedItem, index) => (
          <li key={index} className="w-100 mv1">
            <a
              onClick={handleClick(item)}
              className={`pointer underline-hover link fw5 f5 ${textColor(
                item.viewed
              )} ${textDecoration(item.viewed)}`}
            >
              {item.title}
            </a>
            <a
              className="pointer underline-hover f6 moon-gray mh2"
              onClick={handleRemove(item)}
            >
              remove
            </a>
          </li>
        ))}
      </ul>
      <a
        onClick={handleRefresh}
        className="pointer underline-hover f5 db mv3 light-gray"
      >
        Refresh
      </a>
    </div>
  );
}
