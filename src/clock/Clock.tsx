import format from "date-fns/fp/format";
import * as React from "react";
import { useEffect } from "react";
import { useState } from "react";

export function Clock() {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => {
      setDate(new Date());
    }, 10000);

    return () => clearInterval(id);
  }, []);

  return (
    <h1 className="text-6xl font-light text-gray-600">
      {format("HH:mm", date)}
    </h1>
  );
}
