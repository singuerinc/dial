import { useMachine } from "@xstate/react";
import * as React from "react";
import { useEffect } from "react";
import { ILink } from "./ILink";
import { Search } from "./search/Search";
import { SearchResult } from "./search/SearchResult";
import { machine } from "./states";

interface IProps {
  list: ILink[];
}

export function Bookmarks({ list }: IProps) {
  const [state, send] = useMachine(machine, {
    context: {
      list
    }
  });

  useEffect(() => {
    const handleUpDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowUp" || event.key === "ArrowDown") {
        // prevent the scroll down/up of the page
        event.preventDefault();
        const y = event.key === "ArrowUp" ? -1 : 1;
        send("NAVIGATE", { direction: y });
      } else if (event.key === "Escape") {
        send("EXIT");
      } else if (event.key === "Enter") {
        window.open(state.context.result[state.context.currentIndex].href);
        send("EXIT");
      } else if (event.key === "/") {
        send("SEARCH");
      }
    };

    document.addEventListener("keydown", handleUpDown);

    return () => document.removeEventListener("keydown", handleUpDown);
  }, [state.context.result, state.context.currentIndex]);

  const handleSearchChange = (value: string) => {
    if (value === "") {
      send("EXIT");
      return;
    }

    send("SEARCH", { lookup: value });
  };

  const isSearching = state.matches("searching");

  return (
    <>
      <Search onChange={handleSearchChange} />
      <SearchResult
        isResult={isSearching}
        navIndex={state.context.currentIndex}
        result={isSearching ? state.context.result : state.context.list}
      />
    </>
  );
}
