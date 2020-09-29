import { take } from "lodash/fp";
import { assign, Machine } from "xstate";
import { fetch } from "../../utils/fetch";
import { getItemFromLocalStorage } from "./storage";
import { IFeedItem, IRedditStory, RedditResponse } from "./types";

export interface Context {
  feed: IFeedItem[];
  viewed: number[];
}

export const machine = Machine<Context>(
  {
    initial: "load",
    context: {
      viewed: getItemFromLocalStorage("reddit/viewed") ?? [],
      feed: []
    },
    states: {
      load: {
        onEntry: assign<Context>({ feed: () => [] }),
        invoke: {
          src: "loadFeedService",
          onDone: "idle"
        }
      },
      idle: {
        onEntry: ["populateFeed"],
        on: {
          OPEN_ITEM: {
            actions: ["openItem"]
          },
          REFRESH: "load"
        }
      }
    }
  },
  {
    actions: {
      populateFeed: assign({ feed: (_, event) => event.data }),
      openItem: (_, { payload }) => window.open(payload.url)
    },
    services: {
      loadFeedService: () =>
        fetch("https://www.reddit.com/r/snowrunner/new.json")
          .then(res => (res as RedditResponse).data.children)
          .then(x => x.map(y => y.data))
          .then(take(10))
          .then(y =>
            y.map<IFeedItem>((x: IRedditStory) => ({
              id: x.id,
              title: x.title,
              url: x.url,
              viewed: false
            }))
          )
    }
  }
);
