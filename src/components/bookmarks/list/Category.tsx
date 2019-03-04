import * as React from "react";
import { ICategory } from "../ICategory";
import styled from "styled-components";

interface IProps extends ICategory {}

export function Category({ title, links }: IProps) {
  return (
    <>
      <Title className="ttc fw4">{title}</Title>
      <ul className="list ma0 pa0 mb2">
        {links.map((link, index) => (
          <li key={index}>
            <Link className="fw4" href={link.href}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

const Title = styled.h1`
  font-size: 2.5em;
  color: var(--oc-gray-7);

  @media (min-width: 992px) {
    font-size: 2em;
  }
`;

const Link = styled.a`
  font-size: 1.7em;
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
