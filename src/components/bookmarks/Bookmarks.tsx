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
      console.log(event);

      if (event.key === "ArrowUp" || event.key === "ArrowDown") {
        event.preventDefault();
        event.stopPropagation();
        const y = event.key === "ArrowUp" ? -1 : 1;
        send("NAVIGATE", { direction: y });
      } else if (event.key === "Escape") {
        send("EXIT");
      } else if (event.key === "Enter") {
        send("EXIT");
        window.open(state.context.result[state.context.currentIndex].href);
      }
    };

    document.addEventListener("keydown", handleUpDown);

    return () => document.removeEventListener("keydown", handleUpDown);
  }, []);

  const handleSearchChange = (value: string) => {
    console.log({ value });

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
