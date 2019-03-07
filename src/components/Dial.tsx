import { fromNullable, Option } from "fp-ts/lib/Option";
import path from "ramda/es/path";
import * as React from "react";
import { useState } from "react";
import "tachyons/css/tachyons.min.css";
import { Bookmarks } from "./bookmarks/Bookmarks";
import { bookmarks } from "./bookmarks/data";
import { Clock } from "./clock/Clock";
import { HackerNewsFeed } from "./hnFeed/HackerNewsFeed";
import { IGitHubUser } from "./userProfile/IGitHubUser";
import { UserProfile } from "./userProfile/UserProfile";
import { UserRepos } from "./userRepos/UserRepos";
import { Weather } from "./weather/Weather";

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
      <section className="flex flex-column white pv3 ph4 bg-purple overflow-scroll">
        <UserProfile username={username} onChange={handleUserChange} />
        <Clock />
        <Weather city={city} />
        <UserRepos username={username} />
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
