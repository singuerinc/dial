import * as React from "react";
import { useEffect, useRef } from "react";
import { ILink } from "../ILink";

interface IProps {
  result: ILink[];
  navIndex: number;
}

export function SearchResult({ result, navIndex }: IProps) {
  const total = result.length;
  const title = total === 0 ? "No results" : total === 1 ? `1 result` : `${total} results`;
  const list = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (navIndex !== -1) {
      // console.log({ navIndex });

      const li = list.current!.children[navIndex] as HTMLLIElement;
      const a = li.children[0]! as HTMLAnchorElement;

      a.focus();
    }
  }, [result, navIndex]);

  return (
    <div>
      <div>{title}</div>
      <ul ref={list}>
        {result.map((link, idx) => (
          <li key={`${idx}`} className="my-2">
            <a
              href={link.href}
              target="blank"
              className="bg-white text-gray-900 p-1 text-xl font-medium leading-snug hover:bg-gray-900 hover:text-white focus:bg-gray-900 focus:text-white focus:outline-none"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
