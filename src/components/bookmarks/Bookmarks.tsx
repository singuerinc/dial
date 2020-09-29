import { useMachine } from "@xstate/react";
import * as React from "react";
import { useEffect } from "react";
import { ILink } from "./types";
import { Search } from "./Search";
import { SearchResult } from "./SearchResult";
import { machine } from "./states";

export function Bookmarks({ list }: { list: ILink[] }) {
  const [state, send] = useMachine(machine, {
    context: {
      list
    }
  });

  useEffect(() => {
    function handleUpDown(event: KeyboardEvent) {
      if (event.key === "ArrowUp" || event.key === "ArrowDown") {
        // prevent the scroll down/up of the page
        event.preventDefault();
        const y = event.key === "ArrowUp" ? -1 : 1;
        send("NAVIGATE", { direction: y });
      } else if (event.key === "Escape") {
        send("EXIT");
      } else if (event.key === "Enter") {
        event.preventDefault();
        window.open(state.context.result[state.context.selectedItemIndex].href);
        send("EXIT");
      } else if (event.key === "/") {
        send("SEARCH");
      }
    }

    document.addEventListener("keydown", handleUpDown);

    return () => document.removeEventListener("keydown", handleUpDown);
  }, [state.context.result, state.context.selectedItemIndex]);

  const handleSearchChange = (value: string) => {
    if (value === "") {
      send("EXIT");
      return;
    }

    send("SEARCH", { lookup: value });
  };

  const isSearching = state.matches("searching");
  const result = isSearching ? state.context.result : state.context.list;
  const selectedItemIndex = state.context.selectedItemIndex;

  return (
    <>
      <Search onChange={handleSearchChange} />
      <SearchResult
        list={state.context.list}
        isResult={isSearching}
        selectedItemIndex={selectedItemIndex}
        result={result}
      />
    </>
  );
}
