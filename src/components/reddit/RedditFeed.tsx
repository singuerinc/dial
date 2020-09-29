import { useMachine } from "@xstate/react";
import * as React from "react";
import { machine } from "./machine";
import { IFeedItem } from "./types";

export function RedditFeed() {
  const [state, send] = useMachine(machine);

  const handleRefresh = () => send("REFRESH");

  const handleClick = (item: IFeedItem) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    send({ type: "OPEN_ITEM", payload: item });
  };

  return (
    <div className="mt-6">
      <h1 className="text-2xl font-medium">Reddit</h1>
      <ul>
        {state.context.feed
          .filter(x => !x.viewed)
          .map((item: IFeedItem, index) => (
            <li key={index} className="flex">
              <a
                href="#"
                target="_blank"
                onClick={handleClick(item)}
                className="w-full mr-4 cursor-pointer hover:underline whitespace-no-wrap overflow-hidden"
                style={{ textOverflow: "ellipsis" }}
              >
                {item.title}
              </a>
            </li>
          ))}
      </ul>
      <button onClick={handleRefresh} className="uppercase mt-4 hn__btn">
        Refresh
      </button>
    </div>
  );
}
