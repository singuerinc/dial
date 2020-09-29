import { useMachine } from "@xstate/react";
import * as React from "react";
import * as store from "store2";
import { assign, Machine } from "xstate";

type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;

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
          API_KEY_UPDATE: { actions: ["updateApiKey"] },
          CITY_UPDATE: { actions: ["updateCity"] },
          UNIT_UPDATE: { actions: ["updateUnit"] },
          COUNTRY_UPDATE: { actions: ["updateCountry"] }
        }
      }
    }
  },
  {
    actions: {
      save: context => {
        store.set("dial/weather/api/key", context.apiKey);
        store.set("dial/weather/city", context.city);
        store.set("dial/weather/country", context.country);
        store.set("dial/weather/unit", context.unit);
      },
      updateApiKey: assign({ apiKey: (_, event) => event.value }),
      updateCity: assign({ city: (_, event) => event.value }),
      updateUnit: assign({ unit: (_, event) => event.value }),
      updateCountry: assign({ country: (_, event) => event.value })
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

  const handleOnClose = () => {
    send({ type: "SAVE" });
    onClose(({ apiKey, city, country, unit } = state.context));
  };

  const handleApiKeyChange = (event: InputChangeEvent) =>
    send({ type: "API_KEY_UPDATE", value: event.target.value });

  const handleCityChange = (event: InputChangeEvent) =>
    send({ type: "CITY_UPDATE", value: event.target.value });

  const handleCountryChange = (event: InputChangeEvent) =>
    send({ type: "COUNTRY_UPDATE", value: event.target.value });

  const handleUnitChange = (event: React.ChangeEvent<HTMLSelectElement>) =>
    send({ type: "UNIT_UPDATE", value: event.target.value });

  return (
    <div className="settings">
      <h1>Weather</h1>
      <form>
        <h2>API Key</h2>
        <input value={state.context.apiKey} onChange={handleApiKeyChange} />
        <h2>City</h2>
        <input value={state.context.city} onChange={handleCityChange} />
        <h2>Country</h2>
        <input value={state.context.country} onChange={handleCountryChange} />
        <h2>Units</h2>
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
