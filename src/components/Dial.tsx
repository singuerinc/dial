import * as React from "react";
import { useState } from "react";
import { Bookmarks } from "./bookmarks/Bookmarks";
import { bookmarks } from "./bookmarks/data";
import { Clock } from "./clock/Clock";
import { HackerNewsFeed } from "./hnFeed/HackerNewsFeed";
import { Weather } from "./weather/Weather";

const DEFAULT_USERNAME = "singuerinc";

const me = (location: Location) => {
  const p = new URLSearchParams(location.search);
  return p.get("username")?.replace("/", "") || DEFAULT_USERNAME;
};

export function Dial() {
  const username = me(document.location);
  const [city, setCity] = useState("Hammarbyhöjden");

  // const handleUserChange = (user: IGitHubUser | null) => {
  //   setCity(user?.location);
  // };

  return (
    <div className="flex">
      {/* <section className="flex flex-column white pv3 ph4 bg-purple overflow-scroll"> */}
      {/* <UserProfile username={username} onChange={handleUserChange} /> */}
      {/* <UserRepo username={username} /> */}
      {/* </section> */}
      <section className="sm:w-full md:w-1/6 flex flex-col justify-items-center">
        <Clock />
        <Weather city={city} />
      </section>
      <section className="">
        <div className="flex flex-wrap">
          <div className="sm:w-full md:w-1/2">
            <Bookmarks list={bookmarks} />
          </div>
          <div className="sm:w-full md:w-1/3 mt-32">
            <HackerNewsFeed />
          </div>
        </div>
      </section>
      {/* <section className="bg-white pa4 overflow-scroll">
      </section> */}
    </div>
  );
}
