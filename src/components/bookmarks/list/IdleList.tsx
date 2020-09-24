import * as React from "react";
import { ICategory } from "../ICategory";
import { Category } from "./Category";

interface IProps {
  list: ICategory[];
}

export function IdleList({ list }: IProps) {
  const totalItems = list.reduce((p, c) => p + c.links.length, 0);
  const COLS = 2;
  const rows = Math.round(totalItems / COLS);

  return (
    <ul
      className={`grid grid-cols-${COLS} grid-ro grid-flow-rows`}
      style={{
        gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))/`
      }}
    >
      {list.map((x, index) => (
        <Category key={index} index={index} title={x.title} links={x.links} />
      ))}
    </ul>
  );
}
