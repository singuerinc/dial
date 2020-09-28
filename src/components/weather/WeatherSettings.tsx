import { useMachine } from "@xstate/react";
import * as React from "react";
import { assign, Machine } from "xstate";

export type IWeatherInfo = {
  city: string;
  country: string;
  unit: "standard" | "metric" | "imperial";
};

const machine = Machine<IWeatherInfo>(
  {
    initial: "idle",
    context: {
      city: "New York",
      country: "useMachine",
      unit: "standard"
    },
    states: {
      idle: {
        on: {
          CITY_UPDATE: { actions: ["cityUpdate"] },
          UNIT_UPDATE: { actions: ["unitUpdate"] },
          COUNTRY_UPDATE: { actions: ["countryUpdate"] }
        }
      }
    }
  },
  {
    actions: {
      cityUpdate: assign({ city: (_, event) => event.value }),
      unitUpdate: assign({ unit: (_, event) => event.value }),
      countryUpdate: assign({ country: (_, event) => event.value })
    }
  }
);

export type IProps = IWeatherInfo & {
  onClose: (info: IWeatherInfo) => void;
};

export function WeatherSettings({ onClose, city, country, unit }: IProps) {
  const [state, send] = useMachine(machine, {
    context: {
      city,
      country,
      unit
    }
  });

  console.log(state.context);

  function handleOnClose() {
    onClose(({ city, country, unit } = state.context));
  }

  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    send({ type: "CITY_UPDATE", value: event.target.value });

  const handleCountryChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    send({ type: "COUNTRY_UPDATE", value: event.target.value });

  const handleUnitChange = (event: React.ChangeEvent<HTMLSelectElement>) =>
    send({ type: "UNIT_UPDATE", value: event.target.value });

  return (
    <div className="bg-white text-gray-800 p-6 flex flex-wrap flex-col">
      <h1 className="text-2xl font-bold">Weather</h1>
      <form className="w-full">
        <h2 className="text-lg font-bold">City</h2>
        <input value={state.context.city} onChange={handleCityChange} />

        <h2 className="text-lg font-bold">Country</h2>
        <input value={state.context.country} onChange={handleCountryChange} />
        <h2 className="text-lg font-bold">Units</h2>
        <select value={state.context.unit} onChange={handleUnitChange}>
          <option value="standard">Standard</option>
          <option value="metric">Metric</option>
          <option value="imperial">Imperial</option>
        </select>
      </form>
      <button onClick={handleOnClose}>Save</button>
    </div>
  );
}
