'use client';

import Pane from "@/components/pane";
import { Button, H2, Input, Table, Td } from "@/components/pane-elements";
import { useAuthRedirect } from "@/hooks/auth-redirect";
import { addRequestLog } from "@/lib/request-log";
import axios from "axios";

export default function Me() {
  useAuthRedirect(true);
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const { target } = event;
    const data = {
      login: target.login.value,
      password: target.password.value,
      username: target.username.value,
    }
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:3333/auth/sign-up',
      headers: { 'Content-Type': 'application/json' },
      data: data,
      validateStatus: function (status: number) {
        return status < 500; // Resolve only if the status code is < 500
      },
    };
    try {
      const ar = await axios(config);
      addRequestLog(JSON.stringify(ar.data, null, ' '));
      if (ar.status === 201) {
        alert('Вы зарегистрировались. Теперь можете войти.')
      } else if (ar.status === 400) {
        alert('Вы НЕ зарегистрировались. Такой логин или юзернейм уже заняты.')
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
        <H2>Регистрация</H2>
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
            <tr>
              <Td>
                <label htmlFor="username">Username</label>
              </Td>
              <Td>
                <Input type="text" id="username" name="username"/>
              </Td>
            </tr>
          </tbody>
        </Table>
        <Button type="submit">Зарегистрироваться</Button>
      </form>
    </Pane>
  )
}
