import { Machine, interpret } from "xstate";

export enum STATES {
  idle = "idle",
  searching = "searching",
  navigating = "navigating"
}

export enum ACTIONS {
  SEARCH = "SEARCH",
  EXIT = "EXIT",
  NAVIGATE = "NAVIGATE"
}

const machine = Machine({
  id: "bookmarks",
  initial: STATES.idle,
  states: {
    [STATES.idle]: {
      on: {
        [ACTIONS.SEARCH]: STATES.searching
      }
    },
    [STATES.searching]: {
      on: {
        [ACTIONS.EXIT]: STATES.idle,
        [ACTIONS.NAVIGATE]: STATES.navigating
      }
    },
    navigating: {
      on: {
        [ACTIONS.EXIT]: STATES.idle,
        [ACTIONS.SEARCH]: STATES.searching
      }
    }
  }
});

export const searchService = interpret(machine);
