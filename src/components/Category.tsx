import * as React from "react";
import { ICategory } from "../ICategory";

interface IProps extends ICategory {}

export function Category({ title, links }: IProps) {
  return (
    <ul>
      <li>
        <h1>{title}</h1>
      </li>
      {links.map((link, index) => (
        <li key={index}>
          <a href={link.href}>{link.label}</a>
        </li>
      ))}
    </ul>
  );
}
