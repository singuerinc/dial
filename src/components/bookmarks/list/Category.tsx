import * as React from "react";
import { ICategory } from "../ICategory";

interface IProps extends ICategory {}

export function Category({ title, links, className }: IProps) {
  return (
    <>
      <h1 className="fw4 gray">{title}</h1>
      <ul className={`${className} list ma0 pa0 mb2`}>
        {links.map((link, index) => (
          <li key={index} className="pv1">
            <a
              className="f3 f4-l fw4 moon-gray hover-white link"
              href={link.href}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}
