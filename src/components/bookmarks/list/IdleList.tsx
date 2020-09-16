import * as React from "react";
import { ICategory } from "../ICategory";
import { Category } from "./Category";

interface IProps {
  list: ICategory[];
}

export function IdleList({ list }: IProps) {
  return (
    <ul
      className="list ma0 pa0 w-100 flex flex-wrap flex-column"
      style={{ maxHeight: `${screen.availHeight - 300}px` }}
    >
      {list.map((x, index) => (
        <li
          key={index}
          className=""
          style={{
            flex: "1 0 auto",
            height: `${80 + x.links.length * 31}px`
          }}
        >
          <Category title={x.title} links={x.links} />
        </li>
      ))}
    </ul>
  );
}
