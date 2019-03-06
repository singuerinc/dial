import * as React from "react";
import { useEffect, useState } from "react";

const to2 = (x: number) => String(x).padStart(2, "0");

export function Clock() {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const update = () => setDate(new Date());
    const i = setInterval(update, 1000);
    return () => clearInterval(i);
  }, []);

  const HH = to2(date.getHours());
  const mm = to2(date.getMinutes());
  const ss = to2(date.getSeconds());

  const time = `${HH}:${mm}:${ss}`;

  return <h2 className="tc mv2 fw6 f2">{time}</h2>;
}
