import * as React from "react";
import styled from "styled-components";
import { ICategory } from "./ICategory";
import { Category } from "./Category";

interface IProps {
  result: ICategory;
}

export function SearchResult({ result }: IProps) {
  return (
    <List>
      <li>
        <Category title={result.title} links={result.links} />
      </li>
    </List>
  );
}

const List = styled.ul`
  width: 100%;

  li {
    list-style: none;
  }
`;
