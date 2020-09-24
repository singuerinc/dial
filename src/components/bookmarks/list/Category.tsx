import * as React from "react";
import { ICategory } from "../ICategory";

interface IProps extends ICategory {}

export function Category({ links, index }: IProps) {
  return (
    <>
      {links.map((link, idx) => (
        <li key={`${index}-${idx}`} className="py-2">
          <a
            className="bg-white text-gray-900 p-1 text-xl font-medium leading-snug hover:bg-gray-900 hover:text-white focus:bg-gray-900 focus:text-white focus:outline-none"
            href={link.href}
          >
            {link.label}
          </a>
        </li>
      ))}
    </>
  );
}
