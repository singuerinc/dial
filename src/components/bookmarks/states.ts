import { assign, Machine } from "xstate";
import { ICategory } from "./ICategory";
import { ILink } from "./ILink";
import { sortByLabelCaseInsensitive, withLabelOrHref } from "./utils";

interface IContext {
  list: ICategory[];
  result: ILink[];
  currentIndex: number;
}

export const machine = Machine<IContext>(
  {
    id: "bookmarks",
    context: {
      currentIndex: -1,
      list: [],
      result: []
    },
    initial: "idle",
    states: {
      idle: {
        entry: [assign({ currentIndex: -1, result: _ => [] })],
        on: {
          SEARCH: {
            target: "searching",
            actions: ["search"]
          }
        }
      },
      searching: {
        entry: [assign({ currentIndex: -1 })],
        on: {
          EXIT: "idle",
          SEARCH: {
            actions: [assign({ currentIndex: -1 }), "search"]
          },
          NAVIGATE: {
            actions: ["navigate"]
          }
        }
      }
    }
  },
  {
    actions: {
      navigate: assign({
        currentIndex: (context, event) => {
          // console.log({ total });
          const total = context.result.length;
          if (total === 0) {
            return -1;
          }

          if (event.direction === 1) {
            const current = context.currentIndex;
            const next = current <= total - 2 ? current + 1 : 0;
            console.log({ total, next });
            return next;
          } else {
            const current = context.currentIndex;
            const prev = current <= 0 ? total - 1 : current - 1;
            console.log({ prev });

            return prev;
          }
        }
      }),
      search: assign({
        result: (context, event) => {
          const value = event.lookup;
          const withValue = withLabelOrHref(value);

          // select those categories that contains links with a title
          // or href that partially matches the value we are currently searching
          const filteredCats = context.list.filter(x => x.links.some(withValue));

          // on those filtered categories take only the links that
          // contains a partial match with the value we are looking for
          const onlyWithLinks = filteredCats.map(cat => {
            const links = cat.links.filter(withValue);
            return links;
          });

          return onlyWithLinks.flat();
        }
      })
    }
  }
);
