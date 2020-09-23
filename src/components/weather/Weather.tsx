import axios from "axios";
import { path } from "ramda";
import * as React from "react";
import { useEffect, useState } from "react";
import { timer } from "rxjs";
import { mergeMap } from "rxjs/operators";
import { IWeather } from "./IWeather";

const INTERVAL_UPDATE = 5 * 60000;
const KEY = localStorage.getItem("weather");

const pathToIcon = path<number>(["weather", 0, "icon"]);
const pathToTemp = path<number>(["main", "temp"]);

const loadWeather = async (city: string): Promise<IWeather | null> => {
  return axios
    .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${KEY}&units=metric`)
    .then(({ data }) => data)
    .catch(() => null);
};

interface IProps {
  city: string;
}

export function Weather({ city }: IProps) {
  const [temp, setTemp] = useState<number>();
  const [icon, setIcon] = useState<number>();

  useEffect(() => {
    const poll$ = timer(0, INTERVAL_UPDATE)
      .pipe(mergeMap(() => loadWeather(city)))
      .subscribe((weather: IWeather) => {
        setTemp(pathToTemp(weather));
        setIcon(pathToIcon(weather));
      });

    return () => poll$.unsubscribe();
  }, [city]);

  if (!icon) {
    return null;
  }

  return (
    <div className="">
      <div className="">
        <h1 className="">{temp} °C</h1>
        <h2 className="">{city}</h2>
      </div>
      <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="" />
    </div>
  );
}
