import axios from "axios";
import path from "ramda/es/path";
import * as React from "react";
import { useEffect, useState } from "react";
import { IGitHubUser } from "./IGitHubUser";

interface IProps {
  username: string;
  onChange: (user: IGitHubUser | null) => void;
}

const loadProfile = async (username: string): Promise<IGitHubUser | null> => {
  return axios
    .get(`https://api.github.com/users/${username}`)
    .then(({ data }) => data)
    .catch(() => null);
};

const pathToBio = path<string>(["bio"]);
const pathToName = path<string>(["name"]);
const pathToPicture = path<string>(["avatar_url"]);
const pathToUrl = path<string>(["html_url"]);

export function UserProfile({ username, onChange }: IProps) {
  const [bio, setBio] = useState<string>();
  const [name, setName] = useState<string>();
  const [picture, setPicture] = useState<string>();
  const [url, setUrl] = useState<string>();

  useEffect(() => {
    loadProfile(username).then(user => {
      setBio(user?.bio);
      setName(user?.name);
      setPicture(user?.avatar_url);
      setUrl(user?.html_url);

      onChange(user);
    });
  }, []);

  const handleClick = () => {
    window.open(url);
  };

  return (
    <article
      onClick={handleClick}
      className="pointer mw5 center bg-white br3 pa3 pa4-ns mv3 ba b--black-10 shadow-1"
    >
      <div className="tc">
        <img
          src={picture}
          className="br-100 w4 dib ba b--black-05 pa2"
          title={name}
        />
        <h1 className="f3 mb2 black">{name}</h1>
        <h2 className="f5 fw4 gray mt0">{bio}</h2>
      </div>
    </article>
  );
}
