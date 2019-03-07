import axios from "axios";
import { none, Option, some } from "fp-ts/lib/Option";
import descend from "ramda/es/descend";
import path from "ramda/es/path";
import prop from "ramda/es/prop";
import sortWith from "ramda/es/sortWith";
import take from "ramda/es/take";
import * as React from "react";
import { useEffect, useState } from "react";
import { IGitHubRepo } from "./IGitHubRepo";

interface IProps {
  username: string;
}

const loadRepos = async (username: string): Promise<Option<IGitHubRepo[]>> => {
  return axios
    .get(`https://api.github.com/users/${username}/repos`)
    .then(({ data }) => some(data))
    .catch(() => none);
};

const take10 = take(10);
const sortByDate = sortWith([descend(prop("updated_at"))]);

const pathToId = path<string>(["id"]);
const pathToName = path<string>(["name"]);
const pathToUrl = path<string>(["html_url"]);

export function UserRepos({ username }: IProps) {
  const [repos, setRepos] = useState<IGitHubRepo[]>([]);

  useEffect(() => {
    loadRepos(username).then(repos => {
      repos
        .map(sortByDate)
        .map(take10)
        .map(setRepos);
    });
  }, []);

  return (
    <>
      <h1 className="fw4">Repositories</h1>
      <ul className="list ma0 pa0">
        {repos.map(r => (
          <li key={pathToId(r)}>
            <a
              className="no-underline dim link white-50"
              href={pathToUrl(r)}
              target="_blank"
            >
              {pathToName(r)}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}
