import { useMachine } from "@xstate/react";
import * as React from "react";
import { PreferencesIcon } from "../../icons/Preferences";
import { ClockSettings, CLOCK_FORMAT, IClockInfo } from "./ClockSettings";
import { machine } from "./machine";

const to2 = (x: number) => String(x).padStart(2, "0");

export function Clock() {
  const [state, send] = useMachine(machine);

  const onCloseSettings = (info: IClockInfo) => {
    send({ type: "SET_INFO", value: info });
    send("IDLE");
  };

  const handleOnConfig = () => send("CONFIG");

  const {
    date,
    info: { format, withSeconds }
  } = state.context;

  const twelveFormat = format === CLOCK_FORMAT.TWELVE;
  const rawHours = date.getHours();
  const hours = twelveFormat ? (rawHours === 12 ? 12 : rawHours % 12) : rawHours;

  const [time] = [""]
    .map(() => `${to2(hours)}:`)
    .map(str => `${str}${to2(date.getMinutes())}`)
    .map(str => (withSeconds ? `${str}:${to2(date.getSeconds())}` : str))
    .map(str => (twelveFormat ? `${str} ${rawHours < 12 ? "am" : "pm"}` : str));

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
        <ClockSettings format={format} withSeconds={withSeconds} onClose={onCloseSettings} />
      )}
    </div>
  );
}
