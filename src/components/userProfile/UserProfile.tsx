import * as React from "react";
import styled from "styled-components";
import { useEffect, useState } from "react";

interface IProps {
  name: string;
  picture: string;
}

export function UserProfile({ name, picture }: IProps) {
  return (
    <View>
      <picture>
        <img src={picture} />
      </picture>
      <h1>{name}</h1>
    </View>
  );
}

const View = styled.div`
  display: flex;
  align-items: center;

  > picture {
    flex: 0 0 50px;
    height: 50px;
    display: block;
    border-radius: 50%;

    margin-right: 1em;
    position: relative;

    &:after {
      position: absolute;
      top: -4px;
      left: -4px;
      width: 54px;
      height: 54px;
      border: 2px solid #444;
      content: "";
      border-radius: 50%;
      z-index: 2;
    }
  }

  > picture > img {
    border-radius: 50%;
    overflow: hidden;
    width: 100%;
  }

  > h1 {
    flex: 1 1 auto;
    color: #fab005;
    font-weight: 400;
  }

  @media (min-width: 992px) {
  }
`;
