import * as React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";

const to2 = (x: number) => String(x).padStart(2, "0");

export function Clock() {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const update = () => setDate(new Date());
    const i = setInterval(update, 10000);
    return () => clearInterval(i);
  }, []);

  const HH = to2(date.getHours());
  const mm = to2(date.getMinutes());

  const time = `${HH}:${mm}`;

  return <Time className="flex ma0 fw4 f2">{time}</Time>;
}

const Time = styled.h2``;
