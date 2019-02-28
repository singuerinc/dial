import * as React from "react";
import { useLayoutEffect, useState, useEffect } from "react";
import { DefaultContext, State } from "xstate";
import { ICategory } from "./ICategory";
import { Search } from "./search/Search";
import { SearchResult } from "./search/SearchResult";
import { IdleList } from "./list/IdleList";
import { ACTIONS, searchService as machine, STATES } from "./states";
import { reduceToOne, withLabelOrHref } from "./utils";

const resultTpl: ICategory = {
  title: "Results",
  links: []
};

interface IProps {
  list: ICategory[];
}

const canNavigate = (state: string) =>
  state === STATES.searching || state === STATES.navigating;

export function Bookmarks({ list: feed }: IProps) {
  const [list, setList] = useState(feed);
  const [result, setResult] = useState<ICategory>(resultTpl);
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
      } else if (event.key === "Enter") {
        window.open(result.links[navIndex].href);
      }
    };

    if (canNavigate(machineState)) {
      document.addEventListener("keydown", handleUpDown);
    }

    return () => document.removeEventListener("keydown", handleUpDown);
  }, [machineState, navIndex]);

  const handleSearchChange = (value: string) => {
    if (value === "") {
      machine.send(ACTIONS.EXIT);

      // when the value is empty, return the original list
      setList(list);
      return;
    }

    setNavIndex(0);
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
    const results: ICategory = onlyWithLinks.reduce(reduceToOne, resultTpl);

    setResult(results);
  };

  const isIdle = machineState === STATES.idle;
  const notIdle =
    machineState === STATES.searching || machineState === STATES.navigating;

  return (
    <div>
      {/* <pre>{machineState}</pre> */}
      {/* <pre>{navIndex}</pre> */}
      <Search onChange={handleSearchChange} />
      {isIdle && <IdleList list={list} />}
      {notIdle && <SearchResult navIndex={navIndex} result={result} />}
    </div>
  );
}
