import * as React from "react";
import { useLayoutEffect, useState, useEffect } from "react";
import { DefaultContext, State } from "xstate";
import { ICategory } from "./ICategory";
import { Search } from "./Search";
import { SearchResult } from "./SearchResult";
import { IdleList } from "./IdleList";
import { ACTIONS, searchService as machine, STATES } from "./states";
import { reduceToOne, withLabelOrHref } from "./utils";

interface IProps {
  list: ICategory[];
}

export function Bookmarks({ list: feed }: IProps) {
  const [list, setList] = useState(feed);
  const [result, setResult] = useState();
  const [navIndex, setNavIndex] = useState(0);
  const [machineState, setMachineState] = useState();

  useLayoutEffect(() => {
    const onTransition = (state: State<DefaultContext>) =>
      setMachineState(state.value.toString());

    machine.onTransition(onTransition).start();

    return () => void machine.stop();
  }, []);

  useEffect(() => {
    const handleUpDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowUp" || event.key === "ArrowDown") {
        event.preventDefault();

        machine.send(ACTIONS.NAVIGATE);

        const totalResults = result.links.length - 1;
        const x = event.key === "ArrowUp" ? -1 : 1;

        setNavIndex(i => Math.max(0, Math.min(totalResults, i + x)));
      }
    };

    if (
      machineState === STATES.searching ||
      machineState === STATES.navigating
    ) {
      document.addEventListener("keydown", handleUpDown);
    }

    return () => document.removeEventListener("keydown", handleUpDown);
  }, [machineState]);

  const handleSearchChange = (value: string) => {
    if (value === "") {
      console.log("value!");
      // when the value is empty, return the original list
      machine.send(ACTIONS.EXIT);
      setList(list);
      return;
    }

    machine.send(ACTIONS.SEARCH);

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

    setResult(results);
  };

  return (
    <div>
      <pre>{machineState}</pre>
      <pre>{navIndex}</pre>
      <Search onChange={handleSearchChange} />
      {machineState === STATES.idle && <IdleList list={list} />}
      {(machineState === STATES.searching ||
        machineState === STATES.navigating) && <SearchResult result={result} />}
    </div>
  );
}
