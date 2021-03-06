import { useMachine } from "@xstate/react";
import { compose, take, without } from "lodash/fp";
import * as React from "react";
import { of } from "rxjs";
import { map as rxMap, mergeMap } from "rxjs/operators";
import { assign, Machine } from "xstate";
import { CloseIcon } from "../../icons/CloseIcon";
import { fetch } from "../../utils/fetch";
import { IFeedItem, IHackerNewsStory } from "./IFeedItem";
import { getItemFromLocalStorage, saveInLocalStorage, setViewedInLocalStorage } from "./storage";

const NUM_OF_STORIES = 10;

const markAsNotViewed = (x: IFeedItem): IFeedItem => ({
  ...x,
  viewed: false
});

const loadItem = async (id: number): Promise<IFeedItem> => {
  // let's try to get it from cache
  const maybeItem: IFeedItem | null = getItemFromLocalStorage(`hn-item-${id}`);

  if (maybeItem === null) {
    // let's load it from the API
    const url = `https://hacker-news.firebaseio.com/v0/item/${id}.json`;
    const story = await fetch<IHackerNewsStory>(url);
    return {
      ...story,
      viewed: false,
      comments_url: `https://news.ycombinator.com/item?id=${story.id}`
    };
  }

  return Promise.resolve(maybeItem);
};

interface IContext {
  top: number[];
  feed: IFeedItem[];
  viewed: number[];
}

const machine = Machine<IContext>(
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
        onEntry: assign<IContext>(() => ({ feed: [] })),
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
        fetch("https://hacker-news.firebaseio.com/v0/topstories.json")
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

  const handleRefresh = () => send("REFRESH");
  const handleRemove = (item: IFeedItem) => () => {
    send({ type: "MARK_AS_VIEWED", data: item });
    send("REFRESH");
  };

  const handleClick = (item: IFeedItem) => () => {
    handleRemove(item)();
    window.open(item.url);
  };

  const feed = state.context.feed.filter(x => !x.viewed);
  const loadingItems = NUM_OF_STORIES - feed.length;

  return (
    <div>
      <h1 className="text-2xl font-medium">Hacker news</h1>
      <ul>
        {feed.map((item: IFeedItem, index) => (
          <li key={index} className="flex">
            <a
              target="#"
              onClick={handleClick(item)}
              className="w-full mr-4 cursor-pointer hover:underline whitespace-no-wrap overflow-hidden"
              style={{ textOverflow: "ellipsis" }}
            >
              {item.title}
            </a>
            <button
              className="w-6 h-6 stroke-current text-oc-gray-800 hover:text-oc-red-600 ml-1"
              onClick={handleRemove(item)}
            >
              <CloseIcon />
            </button>
          </li>
        ))}
        {Array(loadingItems)
          .fill(1)
          .map((_, index) => (
            <li key={index + feed.length} className="flex h-6">
              <div className="h-4 w-full mr-4 opacity-50">Loading...</div>
              <div className="w-6 h-6 ml-1"></div>
            </li>
          ))}
      </ul>
      <button onClick={handleRefresh} className="uppercase mt-4 hn__btn">
        Refresh
      </button>
    </div>
  );
}
