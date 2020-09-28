import axios from "axios";
import * as React from "react";
import { useEffect, useState } from "react";
import { IGitHubUser } from "./IGitHubUser";

interface IProps {
  username: string;
}

const loadProfile = async (username: string): Promise<IGitHubUser | null> => {
  return axios
    .get(`https://api.github.com/users/${username}`)
    .then(({ data }) => data)
    .catch(() => null);
};

export function UserProfile({ username }: IProps) {
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
    });
  }, [username]);

  const handleClick = () => {
    window.open(url);
  };

  return (
    <article onClick={handleClick}>
      <div className="tc">
        <img src={picture} className="w-16 h-16 rounded-full" title={name} />
        <h1 className="text-lg">{name}</h1>
        <h2 className="text-base">{bio}</h2>
      </div>
    </article>
  );
}
