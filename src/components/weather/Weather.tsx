import axios from "axios";
import { none, some } from "fp-ts/lib/Option";
import * as React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { IWeather } from "./IWeather";

const load = async () => {
  const KEY = "a4040e11aa1644489e0191018190103";
  const CITY = "Stockholm";
  return axios
    .get(`https://api.apixu.com/v1/current.json?key=${KEY}&q=${CITY}`)
    .then(({ data }) => some<IWeather>(data))
    .catch(() => none);
};

export function Weather() {
  const [temp, setTemp] = useState<number>();

  useEffect(() => {
    load().then(weather => {
      if (weather.isSome()) {
        const { feelslike_c } = weather.value.current;
        setTemp(feelslike_c);
      }
    });
  }, []);

  return (
    <View>
      <h1>Weather</h1>
      <h2>{temp}</h2>
    </View>
  );
}

const View = styled.div`
  h1 {
    font-size: 2em;
    font-weight: 400;
    color: var(--oc-gray-7);
  }

  h2 {
    color: var(--oc-gray-4);
  }
`;
