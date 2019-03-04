import * as React from "react";
import styled from "styled-components";
import { useEffect, useState } from "react";

interface IProps {
  name: string;
  picture: string;
}

export function UserProfile({ name, picture }: IProps) {
  return (
    <div className="flex items-center">
      <Picture className="db br-100 mr3 relative">
        <img className="w-100 br-100 overflow-hidden" src={picture} />
      </Picture>
      <h1 className="fw4 flex-auto yellow">{name}</h1>
    </div>
  );
}

const Picture = styled.picture`
  flex: 0 0 55px;
  height: 55px;

  &:after {
    position: absolute;
    top: -4px;
    left: -4px;
    width: 59px;
    height: 59px;
    border: 2px solid #444;
    content: "";
    border-radius: 50%;
    z-index: 2;
  }
`;
