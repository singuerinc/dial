import * as React from "react";

interface IProps {
  name: string;
  picture: string;
}

export function UserProfile({ name, picture }: IProps) {
  return (
    <div className="flex w-33 items-center">
      <img className="br-100 pa1 ba b--white-10 h3 w3" src={picture} />
      <h1 className="fw4 ml3">{name}</h1>
    </div>
  );
}
