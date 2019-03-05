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
    <div className="flex flex-row vh-100">
      <section
        className="flex flex-column w-25 white pa4"
        style={{ backgroundColor: "#6200EE" }}
      >
        <UserProfile name="singuerinc" picture={path} />
        <Clock />
        <Weather />
      </section>
      <section className="flex w-30 pa4 overflow-scroll">
        <Bookmarks list={bookmarks} />
      </section>
      <section className="pa4">
        <HackerNewsFeed />
      </section>
    </div>
  );
}
