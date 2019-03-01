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
        <HackerNewsFeed />
      </section>
      <section>
        <Bookmarks list={bookmarks} />
      </section>
    </View>
  );
}

const View = styled.div`
  display: flex;
  flex-direction: column;
`;
