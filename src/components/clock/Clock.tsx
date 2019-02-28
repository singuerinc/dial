import * as React from "react";
import styled from "styled-components";
import { useEffect, useState } from "react";

const to2 = (x: number) => String(x).padStart(2, "0");

interface IProps {}

export function Clock({  }: IProps) {
  const [date, setDate] = useState(new Date());
  const update = () => setDate(new Date());

  useEffect(() => {
    const i = setInterval(update, 10000);
    return () => clearInterval(i);
  }, []);

  return (
    <View>
      {to2(date.getHours())}:{to2(date.getMinutes())}
    </View>
  );
}

const View = styled.h1`
  padding: 0;
  margin: 0;
  font-size: 3em;
  font-weight: 400;
  color: #fff;
  text-transform: capitalize;

  @media (min-width: 992px) {
    font-size: 4em;
  }
`;
