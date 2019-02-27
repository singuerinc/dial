import * as React from "react";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

interface IProps {
  onChange: (value: string) => void;
  className?: string;
}

const Input = styled.input``;

export function Search({ onChange }: IProps) {
  const ref = useRef<HTMLInputElement>();
  const [value, setValue] = useState<string>("");

  useEffect(() => {
    ref.current!.focus();
  });

  useEffect(() => {
    onChange(value);
  }, [value]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }

  return <Input ref={ref} value={value} onChange={handleChange} />;
}
