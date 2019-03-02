import * as React from "react";
import styled from "styled-components";
import { useEffect, useState } from "react";

const to2 = (x: number) => String(x).padStart(2, "0");

export function Clock() {
  const [date, setDate] = useState(new Date());
  const update = () => setDate(new Date());

  useEffect(() => {
    const i = setInterval(update, 10000);
    return () => clearInterval(i);
  }, []);

  const HH = to2(date.getHours());
  const mm = to2(date.getMinutes());

  const clock = `${HH}:${mm}`;

  return <View>{clock}</View>;
}

const View = styled.h1`
  padding: 0;
  margin: 0;
  font-size: 3em;
  font-weight: 400;
  color: var(--oc-gray-1);
  text-transform: capitalize;

  @media (min-width: 992px) {
    font-size: 4em;
  }
`;
