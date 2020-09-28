import axios from "axios";
import descend from "ramda/es/descend";
import path from "ramda/es/path";
import pipe from "ramda/es/pipe";
import prop from "ramda/es/prop";
import sortWith from "ramda/es/sortWith";
import take from "ramda/es/take";
import * as React from "react";
import { useEffect, useState } from "react";
import { IGitHubRepo } from "./IGitHubRepo";

interface IProps {
  username: string;
}

const loadRepo = async (username: string): Promise<IGitHubRepo[]> => {
  return axios
    .get(`https://api.github.com/users/${username}/repos`)
    .then(({ data }) => data)
    .catch(() => null);
};

const take10 = take(10);
const sortByDate = sortWith([descend(prop("updated_at"))]);

const pathToId = path<string>(["id"]);
const pathToName = path<string>(["name"]);
const pathToUrl = path<string>(["html_url"]);

export function UserRepo({ username }: IProps) {
  const [repo, setRepo] = useState<IGitHubRepo[]>([]);

  useEffect(() => {
    loadRepo(username).then(repo => {
      const repo2 = pipe<IGitHubRepo, IGitHubRepo>(sortByDate, take10)(repo);
      setRepo(repo2);
    });
  }, []);

  return (
    <>
      <h1 className="fw4 tc tl-l">Repositories</h1>
      <ul className="list tc tl-l ma0 pa0">
        {repo.map(r => (
          <li key={pathToId(r)}>
            <a className="no-underline dim link white-50" href={pathToUrl(r)} target="_blank">
              {pathToName(r)}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}
