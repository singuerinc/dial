import * as React from "react";
import { useEffect, useRef, useState } from "react";

export function Search({ onChange }: { onChange: (value: string) => void }) {
  const inputEl = useRef<HTMLInputElement>(null);

  const [value, setValue] = useState<string>("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    onChange(event.target.value);
  };

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === "/" || event.key === "Escape") {
      event.preventDefault();
      handleChange({ target: { value: "" } } as React.ChangeEvent<HTMLInputElement>);
      inputEl.current?.focus();
    }
  }

  useEffect(() => {
    inputEl.current?.focus();
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [inputEl.current]);

  return (
    <input
      placeholder="Search..."
      className="search__input my-6"
      ref={inputEl}
      value={value}
      onChange={handleChange}
    />
  );
}
