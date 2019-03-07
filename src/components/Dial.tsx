import * as React from "react";
import "tachyons/css/tachyons.min.css";
// @ts-ignore
import { Bookmarks } from "./bookmarks/Bookmarks";
import { bookmarks } from "./bookmarks/data";
import { Clock } from "./clock/Clock";
import { HackerNewsFeed } from "./hnFeed/HackerNewsFeed";
import { UserProfile } from "./userProfile/UserProfile";
import { Weather } from "./weather/Weather";
import { useState } from "react";
import { Option } from "fp-ts/lib/Option";
import { IGitHubUser } from "./userProfile/IGitHubUser";
import path from "ramda/es/path";
import { fromNullable } from "fp-ts/lib/Option";

const DEFAULT_USERNAME = "singuerinc";

const me = (location: Location) => {
  const p = new URLSearchParams(location.search);

  return fromNullable(p.get("username"))
    .map(x => x.replace("/", ""))
    .getOrElse(DEFAULT_USERNAME);
};

export function Dial() {
  const username = me(document.location);
  const [city, setCity] = useState();

  const handleUserChange = (user: Option<IGitHubUser>) => {
    user.map(path(["location"])).map(setCity);
  };

  return (
    <div className="bg-white flex flex-row vh-100">
      <section className="flex flex-column white pv3 ph4 bg-purple">
        <UserProfile username={username} onChange={handleUserChange} />
        <Clock />
        <Weather city={city} />
      </section>
      <section className="bg-near-black flex w-30 pa4 overflow-scroll">
        <Bookmarks list={bookmarks} />
      </section>
      <section className="bg-white pa4 overflow-scroll">
        <HackerNewsFeed />
      </section>
    </div>
  );
}
