import * as React from "react";
import { ICategory } from "./bookmarks/ICategory";
import { Bookmarks } from "./bookmarks/Bookmarks";
import { Clock } from "./clock/Clock";
import { UserProfile } from "./userProfile/UserProfile";
import { HackerNewsFeed } from "./hnFeed/HackerNewsFeed";
import * as data from "./bookmarks/data.json";
import { ILink } from "./bookmarks/ILink";
// TODO: ignore
import path from "../../user.jpeg";
import styled from "styled-components";

// TODO: move this to a service
// @ts-ignore
const sortedList: ICategory[] = data.default
  .sort((x: ICategory, y: ICategory) => (x.title > y.title ? 1 : -1))
  .map((cat: ICategory) => {
    const links = cat.links.sort((x: ILink, y: ILink) =>
      x.label > y.label ? 1 : -1
    );
    return { ...cat, links };
  });

export function Dial() {
  return (
    <View>
      <section>
        <UserProfile name="singuerinc" picture={path} />
        <Clock />
      </section>
      <section>
        <Bookmarks list={sortedList} />
      </section>
      <section>
        <HackerNewsFeed />
      </section>
    </View>
  );
}

const View = styled.div`
  display: flex;

  section:nth-child(1) {
    flex: 0 0 15%;
  }

  section:nth-child(2) {
    flex: 0 0 35%;
  }

  section:nth-child(3) {
    flex: 0 0 50%;
  }
`;
