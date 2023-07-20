'use client';

import { styled } from "styled-components"

const Div = styled.div`
  background: white;
  width: 500px;
  padding: 1px 13px;
  box-shadow: 0 0 25px 0px black;
  margin: 25px auto;
  border-radius: 15px;
`;

export default function Pane({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <Div>
      { children }
    </Div>
  )
}
