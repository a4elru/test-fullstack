'use client';

import Loading from "@/components/loading";
import Pane from "@/components/pane";
import { Button, H2 } from "@/components/pane-elements";
import { useMe } from "@/hooks/me";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Me() {
  const router = useRouter();
  const logOut = async () => {
    localStorage.removeItem("jwt");
    router.replace('/auth/login');
  }
  const { me, meError } = useMe();
  return (
    (me && !meError &&
      <Pane>
        <H2>Здравствуйте, { me.username }!</H2>
        <h3>Ваш ID: { me.id }</h3>
        <h3>Ваш Login: { me.login }</h3>
        <Button type="submit" onClick={ logOut }>Выйти</Button>
      </Pane>
    )
    ||
    (!meError &&
      <Loading />
    )
    ||
    (
      <Pane>
        <H2>Вы ещё не вошли в систему</H2>
        <Link href="/auth/login">
          <Button>Войти</Button>
        </Link>
        <Link href="/auth/sign-up">
          <Button>Зарегистрироваться</Button>
        </Link>
      </Pane>
    )
  )
}
