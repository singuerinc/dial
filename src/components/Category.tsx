import * as React from "react";
import { ICategory } from "../ICategory";
import styled from "styled-components";

interface IProps extends ICategory {
  className?: string;
}

function CategoryComponent({ className, title, links }: IProps) {
  return (
    <ul className={className}>
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

export const Category = styled(CategoryComponent)`
  h1 {
    font-size: 1.7em;
    font-weight: 300;
    color: var(--oc-gray-7);
  }
`;
