'use client';

import styled from "styled-components";
import Pane from "./pane";
import { Table } from "./pane-elements";
import Link from "next/link";

export const Td = styled.td`
  text-align: center;
`;

export default function HeadPanel() {
  return (
    <Pane>
      <Table>
        <tbody>
          <tr>
            <Td>
              <Link href="/auth/sign-up">Регистрация</Link>
            </Td>
            <Td>
              <Link href="/auth/login">Вход</Link>
            </Td>
            <Td>
              <Link href="/auth/me">Статус авторизации</Link>
            </Td>
            <Td>
              <Link href="/posts">Блог</Link>
            </Td>
            <Td>
              <Link href="/response-log">Backend Log</Link>
            </Td>
          </tr>
        </tbody>
      </Table>
    </Pane>
  )
}
