import * as React from "react";
import { ILink } from "../ILink";

export type ICategory = {
  links: ILink[];
  title: string;
  className?: string;
};

interface IProps {
  list: ICategory[];
}

export function IdleList({ list }: IProps) {
  return (
    <ul>
      {list.map(({ links }) => (
        <>
          {links.map((link, idx) => (
            <li key={`${idx}`}>
              <a className="search__link" href={link.href}>
                {link.label}
              </a>
            </li>
          ))}
        </>
      ))}
    </ul>
  );
}
