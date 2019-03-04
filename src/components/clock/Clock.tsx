import * as React from "react";
import { useEffect, useState } from "react";

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

  return <h2 className="ma0 fw4 f1 f-5-l near-white">{time}</h2>;
}
