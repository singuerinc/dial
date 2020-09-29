import { useMachine } from "@xstate/react";
import axios from "axios";
import { path } from "lodash/fp";
import * as React from "react";
import { timer } from "rxjs";
import { map, mergeMap } from "rxjs/operators";
import * as store from "store2";
import { assign, EventObject, Machine } from "xstate";
import { PreferencesIcon } from "../../icons/Preferences";
import { IWeather } from "./IWeather";
import { IWeatherInfo, WeatherSettings } from "./WeatherSettings";

const INTERVAL_UPDATE = 5 * 60000;

const pathToDescription = path(["weather", 0, "description"]);
const pathToIcon = path(["weather", 0, "icon"]);
const pathToTemp = path(["main", "temp"]);

const loadWeather = async ({ apiKey, city, country, unit }: IWeatherInfo): Promise<IWeather> => {
  console.log({ apiKey, city, country, unit });

  return axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}&units=${unit}`
    )
    .then(({ data }) => data)
    .catch(() => null);
};

type IContext = IWeatherInfo & { weather: IWeather };

const machine = Machine<IContext>({
  initial: "idle",
  states: {
    idle: {
      invoke: {
        src: ctx => {
          console.log("yeah");
          return timer(0, INTERVAL_UPDATE)
            .pipe(mergeMap(() => loadWeather(ctx)))
            .pipe(map(weather => ({ type: "SET_WEATHER", payload: weather })));
        }
      },
      on: {
        SET_WEATHER: {
          actions: [assign({ weather: (_, event) => event.payload })]
        },
        CONFIG: "config"
      }
    },
    config: {
      on: {
        SET_INFO: {
          actions: [
            assign({
              apiKey: (_, event) => event.payload.apiKey,
              city: (_, event) => event.payload.city,
              country: (_, event) => event.payload.country,
              unit: (_, event) => event.payload.unit
            })
          ]
        },
        IDLE: "idle"
      }
    }
  }
});

export function Weather() {
  const [state, send] = useMachine(machine, {
    context: {
      apiKey: store.get("dial/weather/api/key") ?? "",
      city: store.get("dial/weather/city") ?? "New York",
      country: store.get("dial/weather/country") ?? "US",
      unit: store.get("dial/weather/unit") ?? "imperial"
    }
  });

  const weather = state.context.weather;

  const onCloseSettings = (info: IWeatherInfo) => {
    send({ type: "SET_INFO", payload: info });
    send("IDLE");
  };

  const handleOnConfig = () => send("CONFIG");

  return (
    <div className="flex items-center">
      {state.matches("config") && (
        <WeatherSettings
          apiKey={state.context.apiKey}
          city={state.context.city}
          country={state.context.country}
          unit={state.context.unit}
          onClose={onCloseSettings}
        />
      )}
      {state.matches("idle") && weather && (
        <>
          <div>
            <h1 className="text-3xl leading-none">{pathToTemp(weather)} °C</h1>
            <h2 className="capitalize">{pathToDescription(weather)}</h2>
            <h3 className="text-gray-500">{state.context.city}</h3>
          </div>
          <img
            src={`https://openweathermap.org/img/wn/${pathToIcon(weather)}@2x.png`}
            alt={pathToDescription(weather)}
          />
          <button
            className="w-6 h-6 stroke-current text-oc-gray-800 hover:text-oc-red-600"
            onClick={handleOnConfig}
          >
            <PreferencesIcon />
          </button>
        </>
      )}
    </div>
  );
}
