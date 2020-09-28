import * as React from "react";
import { Bookmarks } from "./bookmarks/Bookmarks";
import { bookmarks } from "./bookmarks/data";
import { Clock } from "./clock/Clock";
import { HackerNewsFeed } from "./hnFeed/HackerNewsFeed";
import { RedditFeed } from "./reddit/RedditFeed";
import { Weather } from "./weather/Weather";

export function Dial() {
  return (
    <div className="lg:flex">
      <section className="sm:w-full lg:w-3/6 xl:w-8/12">
        <Bookmarks list={bookmarks} />
      </section>
      <section className="sm:w-full lg:w-3/6 xl:w-4/12 xl:mr-12 flex flex-col justify-items-center p-6">
        <Clock />
        <HackerNewsFeed />
        <RedditFeed />
        <Weather />
      </section>
    </div>
  );
}
