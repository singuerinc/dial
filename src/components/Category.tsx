import * as React from "react";
import { ICategory } from "../ICategory";
import styled from "styled-components";

interface IProps extends ICategory {}

export function Category({ title, links }: IProps) {
  return (
    <List>
      <li>
        <h1>{title}</h1>
      </li>
      {links.map((link, index) => (
        <li key={index}>
          <a href={link.href}>{link.label}</a>
        </li>
      ))}
    </List>
  );
}

const List = styled.ul`
  h1 {
    font-size: 1.7em;
    font-weight: 300;
    color: var(--oc-gray-7);
  }
`;
