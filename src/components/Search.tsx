import * as React from "react";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

interface IProps {
  onChange: (value: string) => void;
}

export function Search({ onChange }: IProps) {
  const ref = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState<string>("");

  useEffect(() => {
    ref.current!.focus();
  });

  useEffect(() => {
    onChange(value);
  }, [value]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return <Input ref={ref} value={value} onChange={handleChange} />;
}

const Input = styled.input`
  width: 100%;
  font-size: 2em;
  text-align: center;

  border: 0;
  border-radius: 2px;

  padding: 0.3em;

  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  font-weight: 300;
`;
