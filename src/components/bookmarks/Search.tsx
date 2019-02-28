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
    const handleBlur = () => setFocus(false);
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "/" && !hasFocus) {
        event.preventDefault();
        setValue("");
        setFocus(true);
      }

      if (event.key === "Escape") {
        event.preventDefault();
        setValue("");
        setFocus(true);
      }
    };

    ref.current!.addEventListener("blur", handleBlur);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      ref.current!.removeEventListener("blur", handleBlur);
      document.removeEventListener("keydown", handleKeyDown);
    };
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

const List = styled.ul`
  width: 100%;

  li {
    list-style: none;
  }
`;
