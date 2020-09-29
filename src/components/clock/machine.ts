import { interval } from "rxjs";
import { map } from "rxjs/operators";
import * as store from "store2";
import { assign, Machine } from "xstate";
import { CLOCK_FORMAT, IClockInfo } from "./ClockSettings";

interface IContext {
  date: Date;
  info: IClockInfo;
}

export const machine = Machine<IContext>({
  initial: "idle",
  context: {
    date: new Date(),
    info: {
      format: store.get("dial/clock/format") ?? CLOCK_FORMAT.TWENTY_FOUR,
      withSeconds: store.get("dial/clock/with-seconds") ?? true
    }
  },
  states: {
    idle: {
      invoke: {
        src: () => interval(1000).pipe(map(() => ({ type: "SET_DATE", value: new Date() })))
      },
      on: {
        SET_DATE: {
          actions: assign({ date: (_, event) => event.value })
        },
        CONFIG: "config"
      }
    },
    config: {
      on: {
        SET_INFO: {
          actions: assign({ info: (_, event) => event.value })
        },
        IDLE: "idle"
      }
    }
  }
});
