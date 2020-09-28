import { useMachine } from "@xstate/react";
import * as React from "react";
import { assign, Machine } from "xstate";

export type IClockInfo = {
  format: 12 | 24;
};

const machine = Machine<IClockInfo>(
  {
    initial: "idle",
    context: {
      format: 12
    },
    states: {
      idle: {
        on: {
          FORMAT_UPDATE: { actions: ["formatUpdate"] }
        }
      }
    }
  },
  {
    actions: {
      formatUpdate: assign({ format: (_, event) => event.value })
    }
  }
);

export type IProps = IClockInfo & {
  onClose: (info: IClockInfo) => void;
};

export function ClockSettings({ onClose, format }: IProps) {
  const [state, send] = useMachine(machine, {
    context: {
      format
    }
  });

  function handleOnClose() {
    onClose(({ format } = state.context));
  }

  const handleFormatChange = (event: React.ChangeEvent<HTMLSelectElement>) =>
    send({ type: "FORMAT_UPDATE", value: event.target.value });

  return (
    <div className="bg-white text-gray-800 p-6 flex flex-wrap flex-col">
      <i onClick={handleOnClose}>Close</i>
      <h1 className="text-2xl font-bold">Clock</h1>
      <form className="w-full">
        <h2 className="text-lg font-bold">Format</h2>
        <select value={state.context.format} onChange={handleFormatChange}>
          <option value="12">12</option>
          <option value="24">24</option>
        </select>
      </form>
    </div>
  );
}
