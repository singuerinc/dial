import * as React from "react";
import { ICategory } from "../ICategory";
import { Category } from "./Category";

interface IProps {
  list: ICategory[];
}

export function IdleList({ list }: IProps) {
  return (
    <ul className="list ma0 pa0">
      {list.map((x, index) => (
        <li key={index}>
          <Category title={x.title} links={x.links} />
        </li>
      ))}
    </ul>
  );
}
