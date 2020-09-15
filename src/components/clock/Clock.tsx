import * as React from "react";
import { useEffect, useState } from "react";
import { interval } from "rxjs";

const to2 = (x: number) => String(x).padStart(2, "0");

export function Clock() {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const tick = () => setDate(new Date());
    const clock$ = interval(1000).subscribe(tick);

    return () => clock$.unsubscribe();
  }, []);

  const HH = to2(date.getHours());
  const mm = to2(date.getMinutes());
  const ss = to2(date.getSeconds());

  // const time = `${HH}:${mm}:${ss}`;
  const time = `${HH}:${mm}`;

  return (
    <h2
      className="tr ma0 fw3 teal f2 near-white"
      style={{
        color: "#03DAC5",
        fontVariantNumeric: "tabular-nums"
      }}
    >
      {time}
    </h2>
  );
}
