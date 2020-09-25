import * as React from "react";
import { useLayoutEffect, useRef } from "react";
import { ILink } from "../ILink";

interface IProps {
  result: ILink[];
  navIndex: number;
  isResult: boolean;
}

export function SearchResult({ result, navIndex, isResult }: IProps) {
  const total = result.length;
  const title = total === 0 ? "No results" : total === 1 ? `1 result` : `${total} results`;
  const list = useRef<HTMLUListElement>(null);

  useLayoutEffect(() => {
    console.log({ navIndex });

    if (navIndex !== -1) {
      const li = list.current!.children[navIndex] as HTMLLIElement;
      const a = li.children[0]! as HTMLAnchorElement;

      console.log("focus!", a);

      a.focus();
    }
  }, [list.current, result, navIndex]);

  return (
    <div>
      {isResult && <div>{title}</div>}
      <ul ref={list}>
        {result.map((link, idx) => (
          <li key={`${idx}`}>
            <a href={link.href} target="blank" className="search__link">
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
