import * as React from "react";
import styled from "styled-components";
// @ts-ignore
import path from "../../user.jpeg";
import { Bookmarks } from "./bookmarks/Bookmarks";
import { bookmarks } from "./bookmarks/data";
import { Clock } from "./clock/Clock";
import { HackerNewsFeed } from "./hnFeed/HackerNewsFeed";
import { UserProfile } from "./userProfile/UserProfile";

export function Dial() {
  return (
    <View>
      <section>
        <UserProfile name="singuerinc" picture={path} />
        <Clock />
      </section>
      <section>
        <Bookmarks list={bookmarks} />
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
    flex: 1 1 25%;
  }

  section:nth-child(2) {
    flex: 1 1 35%;
  }

  section:nth-child(3) {
    flex: 1 1 50%;
  }
`;
