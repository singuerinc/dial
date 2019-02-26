import * as React from "react";
import { useContext, useState } from "react";
import { theme as defaultTheme } from "../theme/Default";
import * as data from "../../data.json";
import { Search } from "./Search";
import { Category } from "./Category";
import { ICategory } from "../ICategory";
import styled from "styled-components";

const contains = (value: string, label: string) => {
  const labelLower = label.toLocaleLowerCase();
  const valueLower = value.toLocaleLowerCase();
  const hasValue = labelLower.search(valueLower) !== -1;
  return hasValue;
};

function DialComponent({ className }: { className: string }) {
  const theme = useContext(defaultTheme);
  // @ts-ignore
  const initData: ICategory[] = data.default;
  const [categories, setCategories] = useState<ICategory[]>(initData);

  function handleSearchChange(value: string) {
    // select those categories that contains results
    const filteredCats = initData.filter(cat => {
      return cat.links.some(link => contains(value, link.label));
    });

    // select only those links that matches the search
    const onlyWithLinks = filteredCats.map(cat => {
      const links = cat.links.filter(link => contains(value, link.label));
      return { ...cat, links };
    });

    setCategories(onlyWithLinks);
  }

  return (
    <div className={className}>
      <Search onChange={handleSearchChange} />
      <ul>
        {categories.map((cat, index) => (
          <li key={index}>
            <Category title={cat.title} links={cat.links} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export const Dial = styled(DialComponent)`
  > ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
`;
