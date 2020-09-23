import { asEffect, useMachine } from "@xstate/react";
import anime from "animejs";
import { compose, take, without } from "lodash/fp";
import * as React from "react";
import { useRef } from "react";
import { of } from "rxjs";
import { map as rxMap, mergeMap } from "rxjs/operators";
import { assign, Machine } from "xstate";
import { fetch } from "../../utils/fetch";
import { IFeedItem, IHackerNewsStory } from "./IFeedItem";
import { getItemFromLocalStorage, saveInLocalStorage, setViewedInLocalStorage } from "./_storage";

const NUM_OF_STORIES = 10;
const TOP_STORIES_URL = "https://hacker-news.firebaseio.com/v0/topstories.json";
const toItemUrl = (id: number) => `https://hacker-news.firebaseio.com/v0/item/${id}.json`;

const textColor = (isViewed: boolean) => (isViewed ? "moon-gray" : "orange");
const textDecoration = (isViewed: boolean) => (isViewed ? "strike" : "no-underline");

const markAsNotViewed = (x: IFeedItem): IFeedItem => ({
  ...x,
  viewed: false
});

const loadItem = async (id: number): Promise<IFeedItem> => {
  const maybeItem: IFeedItem | null = getItemFromLocalStorage(`hn-item-${id}`);

  if (maybeItem === null) {
    const url = toItemUrl(id);
    const story = await fetch<IHackerNewsStory>(url);
    return {
      ...story,
      viewed: false,
      comments_url: `https://news.ycombinator.com/item?id=${story.id}`
    };
  }

  return Promise.resolve(maybeItem);
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
        entry: "animateIn",
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
        fetch(TOP_STORIES_URL).then(without(ctx.viewed)).then(take(NUM_OF_STORIES)),
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
  const listRef = useRef(null);

  const [state, send] = useMachine(machine, {
    actions: {
      animateIn: asEffect(() => {
        anime({
          targets: listRef.current,
          opacity: [0, 1],
          easing: "easeOutQuad",
          duration: 400,
          delay: 300
        });
      })
    }
  });

  const { feed } = state.context;

  const handleRefresh = () => {
    anime({
      targets: listRef.current,
      opacity: [1, 0],
      easing: "easeOutQuad",
      duration: 400,
      complete: () => send("REFRESH")
    });
  };
  const handleRemove = (item: IFeedItem) => () => send({ type: "MARK_AS_VIEWED", data: item });
  const handleCommentsLink = (item: IFeedItem) => () => window.open(item.comments_url);

  const handleClick = (item: IFeedItem) => () => {
    handleRemove(item)();
    window.open(item.url);
  };

  return (
    <div ref={listRef}>
      <ul>
        {feed
          .filter(x => !x.viewed)
          .map((item: IFeedItem, index) => (
            <li key={index}>
              <a target="#" onClick={handleClick(item)} className="cursor-pointer hover:underline">
                {item.title}
              </a>
              <button
                className="text-xs ml-2 hover:underline hover:text-gray-300 text-gray-600"
                onClick={handleCommentsLink(item)}
              >
                discuss
              </button>
              <button
                className="text-xs ml-2 hover:line-through hover:text-gray-300 text-gray-600"
                onClick={handleRemove(item)}
              >
                remove
              </button>
            </li>
          ))}
      </ul>
      <button onClick={handleRefresh} className="text-xs uppercase mt-4 hover:underline">
        Refresh
      </button>
    </div>
  );
}
