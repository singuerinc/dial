import axios from "axios";
import { none, Option, some } from "fp-ts/lib/Option";
import { path } from "ramda";
import * as React from "react";
import { useEffect, useState } from "react";
import { CONDITIONS } from "./conditions";
import { IWeather } from "./IWeather";

const CITY = "Stockholm"; // TODO: dynamic
const KEY = "a4040e11aa1644489e0191018190103"; // TODO: dynamic

const pathToIcon = path<number>(["current", "condition", "code"]);
const pathToTemp = path<number>(["current", "feelslike_c"]);

const loadWeather = async (city: string): Promise<Option<IWeather>> => {
  return axios
    .get(`https://api.apixu.com/v1/current.json?key=${KEY}&q=${city}`)
    .then(({ data }) => some(data))
    .catch(() => none);
};

export function Weather() {
  const [temp, setTemp] = useState<number>();
  const [icon, setIcon] = useState<number>();

  useEffect(() => {
    const load = () =>
      loadWeather(CITY).then(data => {
        data.map(pathToTemp).map(setTemp);
        data.map(pathToIcon).map(setIcon);
      });

    const interval = setInterval(() => load(), 1000 * 60 * 2);

    load();

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-row flex-shrink-0 items-end">
      <i className={`mr2 f2 wi wi-${CONDITIONS[icon || 0]}`} />
      <h2 className="ma0 fw4 f3">{temp} °C</h2>
    </div>
  );
}
