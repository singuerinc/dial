import * as React from "react";
import { useState } from "react";
import styled from "styled-components";
import { Category } from "./Category";
import { ICategory } from "./ICategory";
import { Search } from "./Search";
import { withLabelOrHref, reduceToOne } from "./utils";

interface IProps {
  list: ICategory[];
}

export function Bookmarks({ list }: IProps) {
  const [categories, setCategories] = useState(list);

  const handleSearchChange = (value: string) => {
    if (value === "") {
      // when the value is empty, return the original list
      return setCategories(list);
    }

    const withValue = withLabelOrHref(value);
    // select those categories that contains links with a title
    // or href that partially matches the value we are currently searching
    const filteredCats = list.filter(x => x.links.some(withValue));

    // on those filtered categories take only the links that
    // contains a partial match with the value we are looking for
    const onlyWithLinks = filteredCats.map(cat => {
      const links = cat.links.filter(withValue);
      return { ...cat, links };
    });

    // create a new category "Results" with all the links that match the search
    const results: ICategory = onlyWithLinks.reduce(reduceToOne, {
      title: "Results",
      links: []
    });

    setCategories([results]);
  };

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
