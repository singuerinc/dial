import axios from "axios";
import { path } from "ramda";
import * as React from "react";
import { useEffect, useState } from "react";
import { timer } from "rxjs";
import { mergeMap } from "rxjs/operators";
import { IWeather } from "./IWeather";

const INTERVAL_UPDATE = 5 * 60000;
const KEY = localStorage.getItem("weather");

const pathToDescription = path<string>(["weather", 0, "description"]);
const pathToIcon = path<number>(["weather", 0, "icon"]);
const pathToTemp = path<number>(["main", "temp"]);

const loadWeather = async (city: string): Promise<IWeather | null> => {
  return axios
    .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${KEY}&units=metric`)
    .then(({ data }) => data)
    .catch(() => null);
};

export function Weather() {
  const [weather, setWeather] = useState<IWeather>();
  const city = "Hammarbyhöjden";

  useEffect(() => {
    const poll$ = timer(0, INTERVAL_UPDATE)
      .pipe(mergeMap(() => loadWeather(city)))
      .subscribe((weather: IWeather) => {
        setWeather(weather);
      });

    return () => poll$.unsubscribe();
  }, [city]);

  if (!weather) {
    return null;
  }

  return (
    <div className="flex items-center">
      <div>
        <h1 className="text-3xl leading-none">{pathToTemp(weather)} °C</h1>
        <h2 className="capitalize">{pathToDescription(weather)}</h2>
        <h3 className="text-gray-500">{city}</h3>
      </div>
      <img
        src={`https://openweathermap.org/img/wn/${pathToIcon(weather)}@2x.png`}
        alt={pathToDescription(weather)}
      />
    </div>
  );
}
