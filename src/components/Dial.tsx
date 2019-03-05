import * as React from "react";
import "tachyons/css/tachyons.min.css";
// @ts-ignore
import path from "../../user.jpeg";
import { Bookmarks } from "./bookmarks/Bookmarks";
import { bookmarks } from "./bookmarks/data";
import { Clock } from "./clock/Clock";
import { HackerNewsFeed } from "./hnFeed/HackerNewsFeed";
import { UserProfile } from "./userProfile/UserProfile";
import { Weather } from "./weather/Weather";

export function Dial() {
  return (
    <div className="flex flex-row">
      <section className="flex flex-column w-34">
        <UserProfile name="singuerinc" picture={path} />
        <Weather />
        <Clock />
      </section>
      <section className="flex w-50">
        <Bookmarks list={bookmarks} />
      </section>
      <section>
        <HackerNewsFeed />
      </section>
    </div>
  );
}
