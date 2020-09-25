import * as React from "react";
import { useEffect, useRef, useState } from "react";

interface IProps {
  onChange: (value: string) => void;
}

export function Search({ onChange }: IProps) {
  const ref = useRef<HTMLInputElement>(null);

  const [value, setValue] = useState<string>("");
  // const [hasFocus, setFocus] = useState<boolean>(false);

  const handleBlur = () => ref.current!.focus();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    onChange(event.target.value);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "/") {
      event.preventDefault();
      handleChange({ target: { value: "" } } as React.ChangeEvent<HTMLInputElement>);
      ref.current!.focus();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [ref.current]);

  useEffect(() => {
    ref.current!.focus();
  }, []);

  return (
    <input
      placeholder="Search..."
      className="w-full bg-transparent border-4 focus:border-gray-100 focus:outline-none border-gray-500 px-2 text-4xl -mx-2 my-2 font-light"
      ref={ref}
      value={value}
      onChange={handleChange}
    />
  );
}
