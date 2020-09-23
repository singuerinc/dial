import * as React from "react";
import { ICategory } from "../ICategory";

interface IProps extends ICategory {}

export function Category({ title, links, className }: IProps) {
  return (
    <>
      <h1 className="mt-8 mb-4 text-2xl font-light leading-none text-orange-300">{title}</h1>
      <ul className={`${className}`}>
        {links.map((link, index) => (
          <li key={index}>
            <a className="" href={link.href}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}
