import * as React from "react";
import { useState } from "react";
import "tachyons/css/tachyons.min.css";
import { Bookmarks } from "./bookmarks/Bookmarks";
import { bookmarks } from "./bookmarks/data";
import { Clock } from "./clock/Clock";
import { Weather } from "./weather/Weather";
import { HackerNewsFeed } from "./hnFeed/HackerNewsFeed";
import { IGitHubUser } from "./userProfile/IGitHubUser";
import { UserProfile } from "./userProfile/UserProfile";
import { UserRepo } from "./userRepo/UserRepo";

const DEFAULT_USERNAME = "singuerinc";

const me = (location: Location) => {
  const p = new URLSearchParams(location.search);
  return p.get("username")?.replace("/", "") || DEFAULT_USERNAME;
};

export function Dial() {
  const username = me(document.location);
  const [city, setCity] = useState("Stockholm");

  // const handleUserChange = (user: IGitHubUser | null) => {
  //   setCity(user?.location);
  // };

  return (
    <div className="flex flex-column flex-row-l justify-center">
      {/* <section className="flex flex-column white pv3 ph4 bg-purple overflow-scroll"> */}
      {/* <UserProfile username={username} onChange={handleUserChange} /> */}
      {/* <UserRepo username={username} /> */}
      {/* </section> */}
      <section className="flex w-75-l pa4 overflow-scroll flex-column">
        <div className="flex w-100 items-center justify-between">
          <Clock />
          <Weather city={city} />
        </div>
        <HackerNewsFeed />
        <Bookmarks list={bookmarks} />
      </section>
      {/* <section className="bg-white pa4 overflow-scroll">
      </section> */}
    </div>
  );
}
