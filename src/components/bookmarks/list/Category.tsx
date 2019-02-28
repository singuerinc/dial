import * as React from "react";
import { ICategory } from "../ICategory";
import styled from "styled-components";

interface IProps extends ICategory {}

export function Category({ title, links }: IProps) {
  return (
    <>
      <Title>{title}</Title>
      <List>
        {links.map((link, index) => (
          <li key={index}>
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </List>
    </>
  );
}

const Title = styled.h1`
  font-size: 2.5em;
  font-weight: 400;
  color: #fab005;
  text-transform: capitalize;

  @media (min-width: 992px) {
    font-size: 2em;
  }
`;

const List = styled.ul`
  margin-bottom: 2em;
`;

const Link = styled.a`
  font-size: 1.7em;
  font-weight: 400;
  color: var(--oc-gray-6);
  text-decoration: none;
  transition: color 0.1s ease;

  :hover {
    color: #fff;
  }

  @media (min-width: 992px) {
    font-size: 1.3em;
  }
`;
