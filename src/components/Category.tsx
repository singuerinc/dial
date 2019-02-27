import * as React from "react";
import { ICategory } from "../ICategory";
import styled from "styled-components";

const colors = [
  "#e6fcf5",
  "#c3fae8",
  "#96f2d7",
  "#63e6be",
  "#38d9a9",
  "#20c997",
  "#12b886",
  "#0ca678",
  "#099268",
  "#087f5b"
];

interface IProps extends ICategory {
  index: number;
}

export function Category({ index, title, links }: IProps) {
  return (
    <List>
      <li>
        <Title style={{ color: colors[9 - (index % 9)] }}>{title}</Title>
      </li>
      {links.map((link, index) => (
        <li key={index}>
          <Link href={link.href}>{link.label}</Link>
        </li>
      ))}
    </List>
  );
}

const Title = styled.h1`
  font-size: 2.5em;
  font-weight: 500;
  color: var(--oc-gray-7);
  text-transform: capitalize;

  @media (min-width: 992px) {
    font-size: 2em;
  }
`;

const List = styled.ul`
  margin-bottom: 2em;
`;

const Link = styled.a`
  display: block;
  font-size: 1.7em;

  @media (min-width: 992px) {
    font-size: 1.3em;
  }
`;
