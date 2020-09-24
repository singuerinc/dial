import * as React from "react";
import styled from "styled-components";
import { ICategory } from "../ICategory";
import { Category } from "../list/Category";

interface IProps {
  result?: ICategory;
  navIndex: number;
}

export function SearchResult({ result, navIndex }: IProps) {
  const List = styled.ul`
    > li:nth-child(${navIndex + 1}) {
      color: white !important;
      padding: 1em;
      margin-left: -1em;
      > a {
        font-size: 2.4rem;
        background-color: #4fd1c5;
      }
    }
  `;

  return (
    <List>
      <Category index={0} title={result!.title} links={result!.links} />
    </List>
  );
}
