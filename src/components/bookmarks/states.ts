import { curry, includes, toLower } from "lodash/fp";
import { assign, Machine } from "xstate";
import { ILink } from "./types";

export const withLabelOrHref = curry((value: string, link: ILink) => {
  const v = toLower(value);
  const l = toLower(link.label);
  const h = toLower(link.href);
  return includes(v, l) || includes(v, h);
});

interface IContext {
  list: ILink[];
  result: ILink[];
  selectedItemIndex: number;
}

export const machine = Machine<IContext>(
  {
    initial: "idle",
    context: {
      selectedItemIndex: -1,
      list: [],
      result: []
    },
    states: {
      idle: {
        onEntry: [assign<IContext>({ selectedItemIndex: -1, result: () => [] })],
        on: {
          SEARCH: {
            target: "searching",
            actions: ["search"]
          }
        }
      },
      searching: {
        onEntry: [assign<IContext>({ selectedItemIndex: -1, result: ctx => ctx.list })],
        on: {
          EXIT: "idle",
          SEARCH: {
            actions: [assign<IContext>({ selectedItemIndex: -1 }), "search"]
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
        selectedItemIndex: (context, { direction }) => {
          const { result, selectedItemIndex } = context;
          const total = result.length;

          if (total === 0) {
            return -1;
          }

          if (direction === 1) {
            return selectedItemIndex <= total - 2 ? selectedItemIndex + 1 : 0;
          } else {
            return selectedItemIndex <= 0 ? total - 1 : selectedItemIndex - 1;
          }
        }
      }),
      search: assign({
        result: ({ list }, { lookup }) => {
          const value = lookup || "";
          if (value === "") return [];
          return list.filter(withLabelOrHref(value));
        }
      })
    }
  }
);
