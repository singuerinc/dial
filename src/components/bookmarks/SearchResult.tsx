import * as React from "react";
import styled from "styled-components";
import { ICategory } from "./ICategory";
import { Category } from "./Category";

interface IProps {
  result: ICategory;
  navIndex: number;
}

export function SearchResult({ result, navIndex }: IProps) {
  return (
    <List navIndex={navIndex}>
      <li>
        <Category title={result.title} links={result.links} />
      </li>
    </List>
  );
}

const List = styled.ul<{ navIndex: number }>`
  width: 100%;

  li {
    list-style: none;
  }

  > li > ul > li:nth-child(${({ navIndex }) => navIndex + 1}) > a {
    color: white;
  }
`;
