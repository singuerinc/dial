import * as React from "react";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

interface IProps {
  onChange: (value: string) => void;
}

export function Search({ onChange }: IProps) {
  const ref = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState<string>("");
  const [hasFocus, setFocus] = useState<boolean>(false);

  useEffect(() => {
    ref.current!.focus();
  }, [hasFocus]);

  useEffect(() => {
    onChange(value);
  }, [value]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.keyCode === 191 && !hasFocus) {
        // the "/" key
        event.preventDefault();
        setFocus(true);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return <Input ref={ref} autoFocus value={value} onChange={handleChange} />;
}

const Input = styled.input`
  width: 100%;
  font-size: 3em;
  border: 0;
  padding: 0.3em 0;
  background-color: transparent;
  color: #fff;
  font-weight: 300;
`;
