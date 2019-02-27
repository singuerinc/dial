import * as React from "react";
import { useEffect, useRef } from "react";
import styled from "styled-components";

interface IProps {
  onChange: (value: string) => void;
  className?: string;
}

const Input = styled.input``;

export function Search({ onChange }: IProps) {
  const ref = useRef<HTMLInputElement>();

  useEffect(() => {
    ref.current!.focus();
  });

  return <Input ref={ref} onChange={e => onChange(e.target.value)} />;
}
