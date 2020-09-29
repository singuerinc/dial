import { useMachine } from "@xstate/react";
import * as React from "react";
import { interval } from "rxjs";
import { map } from "rxjs/operators";
import { assign, Machine } from "xstate";
import { PreferencesIcon } from "../../icons/Preferences";
import { ClockSettings, CLOCK_FORMAT, IClockInfo } from "./ClockSettings";

const to2 = (x: number) => String(x).padStart(2, "0");

interface IContext {
  date: Date;
  info: IClockInfo;
}

const machine = Machine<IContext>({
  initial: "idle",
  context: {
    date: new Date(),
    info: {
      format: JSON.parse(localStorage.getItem("dial/clock/format") || `0`),
      withSeconds: JSON.parse(localStorage.getItem("dial/clock/with-seconds") || "true")
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

export function Clock() {
  const [state, send] = useMachine(machine);

  function onCloseSettings(info: IClockInfo) {
    send({ type: "SET_INFO", value: info });
    send("IDLE");
  }

  const { date, info } = state.context;

  const hours = date.getHours();
  const hhWithFormat =
    info.format === CLOCK_FORMAT.TWELVE ? (hours === 12 ? 12 : hours % 12) : hours;
  const HH = to2(hhWithFormat);
  const mm = to2(date.getMinutes());
  const ss = to2(date.getSeconds());

  const time = info.withSeconds ? `${HH}:${mm}:${ss}` : `${HH}:${mm}`;

  const handleOnConfig = () => send("CONFIG");

  return (
    <div>
      {state.matches("idle") && (
        <div className="flex">
          <h2 className="text-oc-teal-400 leading-none text-5xl font-medium font-variant-numeric">
            {time}
          </h2>
          <button
            className="ml-2 w-6 h-6 stroke-current text-oc-gray-800 hover:text-oc-teal-400"
            onClick={handleOnConfig}
          >
            <PreferencesIcon />
          </button>
        </div>
      )}
      {state.matches("config") && (
        <ClockSettings
          format={info.format}
          withSeconds={info.withSeconds}
          onClose={onCloseSettings}
        />
      )}
    </div>
  );
}
