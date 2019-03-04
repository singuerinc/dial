import axios from "axios";
import { none, Option, some } from "fp-ts/lib/Option";
import { path } from "ramda";
import * as React from "react";
import { useEffect, useState } from "react";
import { CONDITIONS } from "./conditions";
import { IWeather } from "./IWeather";

const pathToIcon = path<number>(["current", "condition", "code"]);
const pathToTemp = path<number>(["current", "feelslike_c"]);

const loadWeather = async (city: string): Promise<Option<IWeather>> => {
  const KEY = "a4040e11aa1644489e0191018190103";
  return axios
    .get(`https://api.apixu.com/v1/current.json?key=${KEY}&q=${city}`)
    .then(({ data }) => some(data))
    .catch(() => none);
};

export function Weather() {
  const [temp, setTemp] = useState<number>();
  const [icon, setIcon] = useState<number>();

  useEffect(() => {
    const CITY = "Stockholm"; // TODO: dynamic

    loadWeather(CITY).then(data => {
      data.map(pathToTemp).map(setTemp);
      data.map(pathToIcon).map(setIcon);
    });
  }, []);

  return (
    <div className="flex flex-grow-1 flex-shrink-0 flex-row items-center mh3">
      <i className={`silver mr2 f2 wi wi-${CONDITIONS[icon || 0]}`} />
      <h2 className="ma0 fw4 f1 f-5-l near-white">{temp} °C</h2>
    </div>
  );
}
