import * as React from "react";
import styled from "styled-components";
import { ICategory } from "./ICategory";
import { Category } from "./Category";

interface IProps {
  list: ICategory[];
}

export function IdleList({ list }: IProps) {
  return (
    <List>
      {list.map((x, index) => (
        <li key={index}>
          <Category title={x.title} links={x.links} />
        </li>
      ))}
    </List>
  );
}

const List = styled.ul`
  width: 100%;

  li {
    list-style: none;
  }
`;
