import * as React from "react";

interface IProps {
  onChange: (value: string) => void;
}

export function Search({ onChange }: IProps) {
  return <input onChange={e => onChange(e.target.value)} />;
}
