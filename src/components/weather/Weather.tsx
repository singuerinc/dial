import axios from "axios";
import { none, Option, some } from "fp-ts/lib/Option";
import { path } from "ramda";
import * as React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { IWeather } from "./IWeather";
import { CONDITIONS } from "./conditions";

const loadWeather = async (city: string): Promise<Option<IWeather>> => {
  const KEY = "a4040e11aa1644489e0191018190103";
  return axios
    .get(`https://api.apixu.com/v1/current.json?key=${KEY}&q=${city}`)
    .then(({ data }) => some(data))
    .catch(() => none);
};

export function Weather() {
  const [temp, setTemp] = useState<number>();
  const [icon, setIcon] = useState<number>(0);

  useEffect(() => {
    const CITY = "Stockholm"; // TODO: dynamic

    loadWeather(CITY).then(data => {
      // feels like temperature
      const pathToTemp = path<number>(["current", "feelslike_c"]);
      const t = data.map(pathToTemp);
      setTemp(t.getOrElse(1)); // TODO: temp should be something else

      // icon
      const pathToIcon = path<number>(["current", "condition", "code"]);
      const icon = data.map(pathToIcon);
      setIcon(icon.getOrElse(0)!);
    });
  }, []);

  return (
    <Wrapper>
      <i className={`wi wi-${CONDITIONS[icon]}`} />
      <h2>{temp} °C</h2>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex: 1 0 auto;
  flex-direction: row;
  align-items: center;
  margin: 0 1em;

  i {
    color: white;
    font-size: 3em;
  }

  h2 {
    font-size: 4em;
    font-weight: 400;
    margin: 0 0 0 0.2em;
    color: var(--oc-gray-1);
  }
`;
