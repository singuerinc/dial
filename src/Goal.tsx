import { IconX } from "@tabler/icons";
import { format, getDate, getDaysInMonth, getMonth } from "date-fns";
import * as React from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

type IDay = { id: number; checked: boolean };

const parse = (month: number, json: string | null) => {
  const fallback = Array<IDay>(getDaysInMonth(month))
    .fill({ id: 0, checked: false })
    .map((_, idx) => ({ id: idx, checked: false }));
  if (json !== null) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const parsed = JSON.parse(json!);
      return parsed;
    } catch (e) {
      //
    }
  }
  return fallback;
};

const load = (month: number, goalId: string) =>
  new Promise<IDay[]>((resolve) => {
    const days = parse(month, localStorage.getItem(`goal/${goalId}/${month}`));
    resolve(days);
  });

const save = (month: number, goalId: string, days: IDay[]) =>
  new Promise<IDay[]>((resolve) => {
    localStorage.setItem(`goal/${goalId}/${month}`, JSON.stringify(days));
    resolve(days);
  });

export function Goal() {
  const { goalId = "water" } = useParams();
  const now = useMemo(() => new Date(), []);
  const today = useMemo(() => getDate(now), [now]);
  const month = useMemo(() => getMonth(now), [now]);
  const [days, setDays] = useState<IDay[]>([]);

  useEffect(() => {
    load(month, goalId).then((days) => {
      setDays(days);
    });
  }, [goalId, month, now]);

  const onCheck = useCallback(
    (myDay: IDay) => {
      const updatedDays = days.map((day) => {
        if (day.id === myDay.id) {
          return myDay;
        }
        return day;
      });

      save(month, goalId, updatedDays).then((days) => setDays(days));
    },
    [days, goalId, month]
  );

  return (
    <>
      <div className="flex items-end gap-4">
        <h1 className="mb-4 text-7xl">{goalId}</h1>
        <h2 className="mb-4 text-3xl">
          {format(new Date(), "LLLL").toLowerCase()}
        </h2>
      </div>
      <ul className="grid w-fit grid-cols-7 gap-2">
        {days?.map((day) => (
          <Item key={day.id} today={today} day={day} onCheck={onCheck} />
        ))}
      </ul>
    </>
  );
}

function Item({
  day,
  today,
  onCheck,
}: {
  day: IDay;
  today: number;
  onCheck: (day: IDay) => void;
}) {
  const handleCheck = useCallback(() => {
    day.checked = !day.checked;
    onCheck(day);
  }, [day, onCheck]);

  const isPast = day.id + 1 < today;
  const isToday = day.id + 1 === today;

  return (
    <li
      onClick={handleCheck}
      className={`relative flex h-24 w-24 cursor-pointer items-center justify-center border-2 ${
        isPast
          ? "border-gray-300 bg-gray-100"
          : isToday
          ? "border-4 border-black"
          : "border-gray-200"
      } hover:border-gray-500`}
    >
      <span className="pointer-events-none absolute top-0.5 left-0.5 select-none px-0.5 text-xs text-gray-400">
        {day.id + 1}
      </span>
      <div>{day.checked && <IconX size={96} />}</div>
    </li>
  );
}
