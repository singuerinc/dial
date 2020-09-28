import * as React from "react";
import { useEffect, useState } from "react";
import { interval } from "rxjs";
import { ClockSettings, CLOCK_FORMAT, IClockInfo } from "./ClockSettings";

const to2 = (x: number) => String(x).padStart(2, "0");

export function Clock() {
  const [date, setDate] = useState(new Date());
  const [info, setInfo] = useState<IClockInfo>({
    format: JSON.parse(localStorage.getItem("dial/clock/format") || `0`),
    withSeconds: JSON.parse(localStorage.getItem("dial/clock/with-seconds") || "true")
  });

  useEffect(() => {
    const tick = () => setDate(new Date());
    const clock$ = interval(1000).subscribe(tick);

    return () => clock$.unsubscribe();
  }, []);

  function onCloseSettings(info: IClockInfo) {
    setInfo(info);
  }

  const hours = date.getHours();
  const hhWithFormat =
    info.format === CLOCK_FORMAT.TWELVE ? (hours === 12 ? 12 : hours % 12) : hours;
  const HH = to2(hhWithFormat);
  const mm = to2(date.getMinutes());
  const ss = to2(date.getSeconds());

  const time = info.withSeconds ? `${HH}:${mm}:${ss}` : `${HH}:${mm}`;

  return (
    <div>
      <h2 className="text-oc-red-900 leading-none text-6xl font-variant-numeric">{time}</h2>
      <ClockSettings
        format={info.format}
        withSeconds={info.withSeconds}
        onClose={onCloseSettings}
      />
    </div>
  );
}
