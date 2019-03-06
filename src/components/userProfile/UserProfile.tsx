import * as React from "react";

interface IProps {
  name: string;
  picture: string;
}

export function UserProfile({ name, picture }: IProps) {
  return (
    <article className="mw5 center bg-white br3 pa3 pa4-ns mv3 ba b--black-10 shadow-1">
      <div className="tc">
        <img
          src={picture}
          className="br-100 w4 dib ba b--black-05 pa2"
          title={name}
        />
        <h1 className="f3 mb2">{name}</h1>
        <h2 className="f5 fw4 gray mt0">ABC (A B C)</h2>
      </div>
    </article>
  );
}
