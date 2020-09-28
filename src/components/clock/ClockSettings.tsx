import { useMachine } from "@xstate/react";
import * as React from "react";
import { assign, Machine } from "xstate";

export type IClockInfo = {
  format: 12 | 24;
  withSeconds: boolean;
};

const machine = Machine<IClockInfo>(
  {
    initial: "idle",
    context: {
      format: 12,
      withSeconds: true
    },
    states: {
      idle: {
        on: {
          WITH_SECONDS_UPDATE: { actions: ["withSecondsUpdate"] },
          FORMAT_UPDATE: { actions: ["formatUpdate"] }
        }
      }
    }
  },
  {
    actions: {
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
    onClose(({ format, withSeconds } = state.context));
  }

  const handleFormatChange = (event: React.ChangeEvent<HTMLSelectElement>) =>
    send({ type: "FORMAT_UPDATE", value: event.target.value });

  const handleWithSecondsChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    send({ type: "WITH_SECONDS_UPDATE", value: event.target.checked });

  return (
    <div className="bg-white text-gray-800 p-6 flex flex-wrap flex-col">
      <h1 className="text-2xl font-bold">Clock</h1>
      <form className="w-full">
        <h2 className="text-lg font-bold">Format</h2>
        <select value={state.context.format} onChange={handleFormatChange}>
          <option value="12">12</option>
          <option value="24">24</option>
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
