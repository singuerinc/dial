import * as React from "react";
import { useContext, useState, useRef, useEffect } from "react";
import { Search } from "./Search";
import { Category } from "./Category";
import { contains } from "./utils";
import { ICategory } from "./ICategory";
import styled from "styled-components";

interface IProps {
  feed: ICategory[];
}

export function Bookmarks({ feed }: IProps) {
  const [categories, setCategories] = useState(feed);

  function handleSearchChange(value: string) {
    // select those categories that contains results
    const filteredCats = feed.filter(cat => {
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
    <div>
      <Search onChange={handleSearchChange} />
      <List>
        {categories.map((cat, index) => (
          <li key={index}>
            <Category title={cat.title} links={cat.links} />
          </li>
        ))}
      </List>
    </div>
  );
}

const List = styled.ul`
  width: 100%;

  li {
    list-style: none;
  }
`;
