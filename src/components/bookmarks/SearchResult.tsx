import * as React from "react";
import { useLayoutEffect, useRef } from "react";
import { ILink } from "./types";

interface IProps {
  list: ILink[];
  result: ILink[];
  selectedItemIndex: number;
  isResult: boolean;
}

export function SearchResult({ list, result, selectedItemIndex, isResult }: IProps) {
  const total = result.length;
  const title =
    total === 0
      ? "No result"
      : total === 1
      ? `1 result of ${list.length}`
      : `${total} results of ${list.length}`;

  const listEl = useRef<HTMLUListElement>(null);

  useLayoutEffect(() => {
    if (selectedItemIndex !== -1) {
      const li = listEl.current?.children[selectedItemIndex] as HTMLLIElement;
      const a = li.children[0] as HTMLAnchorElement;

      a.focus();
    }
  }, [listEl.current, result, selectedItemIndex]);

  return (
    <div>
      {isResult && <div>{title}</div>}
      <ul ref={listEl}>
        {result.map((link, index) => (
          <li key={`${index}`} className="search__li">
            <a href={link.href} target="blank" className="search__link">
              {link.label} <span className="text-sm">{link.href}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
