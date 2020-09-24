import { useMachine } from "@xstate/react";
import * as React from "react";
import { useEffect } from "react";
import { ICategory } from "./ICategory";
import { IdleList } from "./list/IdleList";
import { Search } from "./search/Search";
import { SearchResult } from "./search/SearchResult";
import { machine } from "./states";

interface IProps {
  list: ICategory[];
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
        send("EXIT");
        window.open(state.context.result[state.context.currentIndex].href);
      } else if (event.key === "/") {
        send("SEARCH");
      }
    };

    document.addEventListener("keydown", handleUpDown);

    return () => document.removeEventListener("keydown", handleUpDown);
  }, []);

  const handleSearchChange = (value: string) => {
    if (value === "") {
      send("EXIT");
      return;
    }

    send("SEARCH", { lookup: value });
  };

  const isIdle = state.matches("idle");
  const isSearching = state.matches("searching");

  return (
    <>
      <div>
        {state.value} {state.context.currentIndex}
      </div>
      <Search onChange={handleSearchChange} />
      {isIdle && <IdleList list={list} />}
      {isSearching && (
        <SearchResult navIndex={state.context.currentIndex} result={state.context.result} />
      )}
    </>
  );
}
