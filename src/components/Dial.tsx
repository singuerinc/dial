import * as React from "react";
import styled from "styled-components";
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
    <div className="flex flex-column">
      <section className="flex items-center">
        <UserProfile name="singuerinc" picture={path} />
        <Clock />
        <Weather />
      </section>
      <section>
        <HackerNewsFeed />
      </section>
      <section>
        <Bookmarks list={bookmarks} />
      </section>
    </div>
  );
}
