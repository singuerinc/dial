import * as React from "react";
import { ICategory } from "../ICategory";
import styled from "styled-components";

interface IProps extends ICategory {}

export function Category({ title, links }: IProps) {
  return (
    <>
      <h1 className="ttc fw4 moon-gray">{title}</h1>
      <ul className="list ma0 pa0 mb2">
        {links.map((link, index) => (
          <li key={index}>
            <a className="f3 f4-l fw4 silver hover-white link" href={link.href}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}
