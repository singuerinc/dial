import { useMachine } from "@xstate/react";
import { take, without } from "lodash/fp";
import * as React from "react";
import { assign, Machine } from "xstate";
import { fetch } from "../../utils/fetch";
import { IFeedItem, IRedditStory } from "./IFeedItem";
import { getItemFromLocalStorage, saveInLocalStorage, setViewedInLocalStorage } from "./_storage";

const NUM_OF_STORIES = 10;

const markAsNotViewed = (x: IFeedItem): IFeedItem => ({
  ...x,
  viewed: false
});

interface Context {
  top: number[];
  feed: IFeedItem[];
  viewed: number[];
}

const machine = Machine<Context>(
  {
    initial: "load",
    context: {
      viewed: getItemFromLocalStorage("reddit/viewed") ?? [],
      top: [],
      feed: []
    },
    states: {
      load: {
        entry: assign(_ => ({ feed: [] })),
        invoke: {
          src: "loadFeedService",
          onDone: "idle"
        }
      },
      idle: {
        entry: ["aaa"],
        on: {
          MARK_AS_VIEWED: {
            actions: ["markAsViewedInStorage", "markAsViewed"]
          },
          REFRESH: "load"
        }
      }
    }
  },
  {
    actions: {
      aaa: assign({ feed: (context, event) => event.data }),

      markAsViewedInStorage: (ctx, event) =>
        setViewedInLocalStorage([...ctx.viewed, event.data.id]),
      markAsViewed: assign((ctx, event) => {
        const item: IRedditStory = event.data;
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
      loadFeedService: ctx =>
        fetch("https://www.reddit.com/r/snowrunner/new.json")
          // .then(without(ctx.viewed))
          .then(res => res.data)
          .then(x => x.children)
          .then(x => x.map(y => y.data))
          .then(take(NUM_OF_STORIES))
          .then(y => y.map(x => ({ id: x.id, title: x.title, url: x.url })))
      // .then(x => x.map(markAsNotViewed))
      // .then(x => saveInLocalStorage),
    }
  }
);

export function RedditFeed() {
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

  return (
    <div className="my-6">
      <ul>
        {state.context.feed
          .filter(x => !x.viewed)
          .map((item: IFeedItem, index) => (
            <li key={index} className="flex items-baseline">
              <a
                target="#"
                onClick={handleClick(item)}
                className="w-full mr-4 cursor-pointer hover:underline whitespace-no-wrap overflow-hidden"
                style={{ textOverflow: "ellipsis" }}
              >
                {item.title}
              </a>
              <button className="hn__btn" onClick={handleRemove(item)}>
                remove
              </button>
            </li>
          ))}
      </ul>
      <button onClick={handleRefresh} className="uppercase mt-4 hn__btn">
        Refresh
      </button>
    </div>
  );
}
