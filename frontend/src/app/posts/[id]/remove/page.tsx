'use client';

import Pane from "@/components/pane";
import { H2 } from "@/components/pane-elements";
import { addRequestLog } from "@/lib/request-log";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function RemovePage({ params }: { params: { id: string }}) {
  const router = useRouter();
  const config = {
    method: 'delete',
    maxBodyLength: Infinity,
    url: `http://localhost:3333/posts/${params.id}`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
    },
    validateStatus: function (status: number) {
      return status < 500; // Resolve only if the status code is < 500
    },
  };
  async function removePost() {
    try {
      const ar = await axios(config);
      addRequestLog(JSON.stringify(ar.data, null, ' '));
      if (ar.status === 200 || ar.status === 404) {
        router.replace(`/posts`)
      } else if (ar.status === 401) {
        router.replace('/auth/me');
      } else if (ar.status === 403) {
        alert('У вас нет прав на удаление этого поста.');
        router.replace('/posts');
      } else {
        throw new Error();
      }
    } catch(err) {
      alert('Неизвестная ошибка.')
      router.replace('/posts');
    }
  }
  removePost();
  return <Pane><H2>Удаляем пост...</H2></Pane>
}
