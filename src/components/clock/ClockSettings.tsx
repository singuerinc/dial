import { useMachine } from "@xstate/react";
import * as React from "react";
import { assign, Machine } from "xstate";

export enum CLOCK_FORMAT {
  TWELVE,
  TWENTY_FOUR
}

export type IClockInfo = {
  format: CLOCK_FORMAT;
  withSeconds: boolean;
};

const machine = Machine<IClockInfo>(
  {
    initial: "idle",
    states: {
      idle: {
        on: {
          SAVE: { actions: ["save"] },
          WITH_SECONDS_UPDATE: { actions: ["withSecondsUpdate"] },
          FORMAT_UPDATE: { actions: ["formatUpdate"] }
        }
      }
    }
  },
  {
    actions: {
      save: context => {
        localStorage.setItem("dial/clock/format", JSON.stringify(context.format));
        localStorage.setItem("dial/clock/with-seconds", JSON.stringify(context.withSeconds));
      },
      formatUpdate: assign({ format: (_, event) => event.value }),
      withSecondsUpdate: assign({ withSeconds: (_, event) => event.value })
    }
  }
);

export type IProps = IClockInfo & {
  onClose: (info: IClockInfo) => void;
};

export function ClockSettings({ onClose, format, withSeconds }: IProps) {
  const [state, send] = useMachine(machine, {
    context: {
      format,
      withSeconds
    }
  });

  function handleOnClose() {
    send({ type: "SAVE" });
    onClose(({ format, withSeconds } = state.context));
  }

  const handleFormatChange = (event: React.ChangeEvent<HTMLSelectElement>) =>
    send({ type: "FORMAT_UPDATE", value: parseInt(event.target.value, 10) });

  const handleWithSecondsChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    send({ type: "WITH_SECONDS_UPDATE", value: event.target.checked });

  return (
    <div className="bg-white text-gray-800 p-6 flex flex-wrap flex-col">
      <h1 className="text-2xl font-bold">Clock</h1>
      <form className="w-full">
        <h2 className="text-lg font-bold">Format</h2>
        <select value={state.context.format} onChange={handleFormatChange}>
          <option value={CLOCK_FORMAT.TWELVE}>12</option>
          <option value={CLOCK_FORMAT.TWENTY_FOUR}>24</option>
        </select>
        <h2 className="text-lg font-bold">with seconds</h2>
        <input
          type="checkbox"
          checked={state.context.withSeconds}
          onChange={handleWithSecondsChange}
        />
      </form>
      <button onClick={handleOnClose}>Save</button>
    </div>
  );
}
