'use client';

import Pane from "@/components/pane";
import { Button, H2, Input, Table, Td } from "@/components/pane-elements";
import { useMe } from "@/hooks/me";
import { addRequestLog } from "@/lib/request-log";
import axios from "axios";
import { redirect, useRouter } from "next/navigation";

export default function Me() {
  const router = useRouter();
  const { me, meError } = useMe();
  if (me && !meError) {
    redirect('/auth/me');
  }
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const { target } = event;
    const data = {
      login: target.login.value,
      password: target.password.value,
    }
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:3333/auth/login',
      headers: { 'Content-Type': 'application/json' },
      data: data,
      validateStatus: function (status: number) {
        return status < 500; // Resolve only if the status code is < 500
      },
    };
    try {
      const ar = await axios(config);
      addRequestLog(JSON.stringify(ar.data, null, ' '));
      if (ar.status === 200) {
        localStorage.setItem("jwt", ar.data.result.access_token);
        router.replace('/auth/me');
      } else if (ar.status === 400) {
        alert('Вы НЕ авторизовались. Неверные логин и/или пароль.')
      } else {
        throw new Error();
      }
    } catch(err) {
        alert('Неизвестная ошибка.')
    }
  }
  return (
    <Pane>
      <form onSubmit={handleSubmit}>
        <H2>Вход</H2>
        <Table>
          <tbody>
            <tr>
              <Td>
                <label htmlFor="login">Login</label>
              </Td>
              <Td>
                <Input type="text" id="login" name="login"/>
              </Td>
            </tr>
            <tr>
              <Td>
                <label htmlFor="password">Password</label>
              </Td>
              <Td>
                <Input type="password" id="password" name="password"/>
              </Td>
            </tr>
          </tbody>
        </Table>
        <Button type="submit">Войти</Button>
      </form>
    </Pane>
  )
}
