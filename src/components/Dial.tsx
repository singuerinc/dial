import * as React from "react";
import { useContext, useState, useRef, useEffect } from "react";
import { theme as defaultTheme } from "../theme/Default";
import * as data from "../../data.json";
import { Search } from "./Search";
import { Category } from "./Category";
import { ICategory } from "../ICategory";
import styled from "styled-components";
import { ILink } from "../ILink";

// @ts-ignore
const sorted: ICategory[] = data.default
  .sort((x: ICategory, y: ICategory) => (x.title > y.title ? 1 : -1))
  .map((cat: ICategory) => {
    const links = cat.links.sort((x: ILink, y: ILink) =>
      x.label > y.label ? 1 : -1
    );
    return { ...cat, links };
  });

const contains = (value: string, label: string) => {
  const labelLower = label.toLocaleLowerCase();
  const valueLower = value.toLocaleLowerCase();
  const hasValue = labelLower.search(valueLower) !== -1;
  return hasValue;
};

export function Dial() {
  const theme = useContext(defaultTheme);
  const [categories, setCategories] = useState(sorted);

  function handleSearchChange(value: string) {
    // select those categories that contains results
    const filteredCats = sorted.filter(cat => {
      return cat.links.some(
        link => contains(value, link.label) || contains(value, link.href)
      );
    });

    // select only those links that matches the search
    const onlyWithLinks = filteredCats.map(cat => {
      const links = cat.links.filter(
        link => contains(value, link.label) || contains(value, link.href)
      );
      return { ...cat, links };
    });

    setCategories(onlyWithLinks);
  }

  return (
    <>
      <Search onChange={handleSearchChange} />
      <List>
        {categories.map((cat, index) => (
          <li key={index}>
            <Category index={index} title={cat.title} links={cat.links} />
          </li>
        ))}
      </List>
    </>
  );
}

const List = styled.ul`
  width: 100%;

  li {
    list-style: none;
  }
`;
