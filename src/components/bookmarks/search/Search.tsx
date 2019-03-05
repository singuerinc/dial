import * as React from "react";
import { useEffect, useRef, useState } from "react";

interface IProps {
  onChange: (value: string) => void;
}

export function Search({ onChange }: IProps) {
  const ref = useRef<HTMLInputElement>(null);

  const [value, setValue] = useState<string>("");
  const [hasFocus, setFocus] = useState<boolean>(false);

  const handleBlur = () => setFocus(false);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape" || (event.key === "/" && !hasFocus)) {
      event.preventDefault();
      setValue("");
      setFocus(true);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    ref.current!.focus();
  }, [hasFocus]);

  useEffect(() => {
    onChange(value);
  }, [value]);

  useEffect(() => {
    ref.current!.addEventListener("blur", handleBlur);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      ref.current!.removeEventListener("blur", handleBlur);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <input
      placeholder="Search..."
      className="f1 fw3 w-100 bn pv1 bg-transparent orange"
      ref={ref}
      value={value}
      autoFocus
      onChange={handleChange}
    />
  );
}
