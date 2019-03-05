import * as React from "react";
import styled from "styled-components";
import { ICategory } from "../ICategory";
import { Category } from "../list/Category";

interface IProps {
  result?: ICategory;
  navIndex: number;
}

export function SearchResult({ result, navIndex }: IProps) {
  const Wrapper = styled(Category)`
    > li:nth-child(${navIndex + 1}) > a {
      color: white;
    }
  `;

  return <Wrapper title={result!.title} links={result!.links} />;
}
