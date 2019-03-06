import axios from "axios";
import { none, Option, some } from "fp-ts/lib/Option";
import { path } from "ramda";
import * as React from "react";
import { useEffect, useState } from "react";
import { timer } from "rxjs";
import { mergeMap } from "rxjs/operators";
import { CONDITIONS } from "./conditions";
import { IWeather } from "./IWeather";

const INTERVAL_UPDATE = 5 * 60000;
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
    const poll$ = timer(0, INTERVAL_UPDATE)
      .pipe(mergeMap(() => loadWeather(CITY)))
      .subscribe((weather: Option<IWeather>) => {
        weather.map(pathToTemp).map(setTemp);
        weather.map(pathToIcon).map(setIcon);
      });

    return () => poll$.unsubscribe();
  }, []);

  return (
    <div className="flex flex-column flex-shrink-0 items-center mv2">
      <i className={`f2 wi wi-${CONDITIONS[icon || 0]}`} />
      <h1 className="f5 mv1 f4-ns fw6">{temp} °C</h1>
      <h2 className="f6 fw5 tracked ma0 fw2 ttu">{CITY}</h2>
    </div>
  );
}
