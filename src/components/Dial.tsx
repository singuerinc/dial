import * as React from "react";
import { useContext, useState } from "react";
import { theme as defaultTheme } from "../theme/Default";
import * as data from "../../data.json";
import { Category } from "./Category";
import { ICategory } from "../ICategory";

export function Dial() {
  const theme = useContext(defaultTheme);
  // @ts-ignore
  const [categories] = useState<ICategory[]>(data.default);

  return (
    <ul>
      {categories.map((cat, index) => (
        <li key={index}>
          <Category title={cat.title} links={cat.links} />
        </li>
      ))}
    </ul>
  );
}
