import { useMachine } from "@xstate/react";
import * as React from "react";
import { assign, Machine } from "xstate";

export enum WEATHER_UNIT {
  "standard" = "standard",
  "metric" = "metric",
  "imperial" = "imperial"
}

export type IWeatherInfo = {
  apiKey: string;
  city: string;
  country: string;
  unit: WEATHER_UNIT;
};

const machine = Machine<IWeatherInfo>(
  {
    initial: "idle",
    states: {
      idle: {
        on: {
          SAVE: { actions: ["save"] },
          API_KEY_UPDATE: { actions: ["apiKeyUpdate"] },
          CITY_UPDATE: { actions: ["cityUpdate"] },
          UNIT_UPDATE: { actions: ["unitUpdate"] },
          COUNTRY_UPDATE: { actions: ["countryUpdate"] }
        }
      }
    }
  },
  {
    actions: {
      save: context => {
        localStorage.setItem("dial/weather/api/key", JSON.stringify(context.apiKey));
        localStorage.setItem("dial/weather/city", JSON.stringify(context.city));
        localStorage.setItem("dial/weather/country", JSON.stringify(context.country));
        localStorage.setItem("dial/weather/unit", JSON.stringify(context.unit));
      },
      apiKeyUpdate: assign({ apiKey: (_, event) => event.value }),
      cityUpdate: assign({ city: (_, event) => event.value }),
      unitUpdate: assign({ unit: (_, event) => event.value }),
      countryUpdate: assign({ country: (_, event) => event.value })
    }
  }
);

export type IProps = IWeatherInfo & {
  onClose: (info: IWeatherInfo) => void;
};

export function WeatherSettings({ onClose, apiKey, city, country, unit }: IProps) {
  const [state, send] = useMachine(machine, {
    context: {
      apiKey,
      city,
      country,
      unit
    }
  });

  function handleOnClose() {
    send({ type: "SAVE" });
    onClose(({ apiKey, city, country, unit } = state.context));
  }

  const handleApiKeyChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    send({ type: "API_KEY_UPDATE", value: event.target.value });

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
        <h2 className="text-lg font-bold">API Key</h2>
        <input value={state.context.apiKey} onChange={handleApiKeyChange} />
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
