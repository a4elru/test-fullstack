'use client';

import Loading from "@/components/loading";
import Pane from "@/components/pane";
import { Button, H2, Table, Td, Input, Textarea } from "@/components/pane-elements";
import { useAuthRedirect } from "@/hooks/auth-redirect";
import { usePost } from "@/hooks/post";
import { addRequestLog } from "@/lib/request-log";
import axios from "axios";
import { redirect, useRouter } from "next/navigation";

export default function EditPosts({ params }: { params: { id: string } }) {
  useAuthRedirect();
  const { post, postError } = usePost(params.id);
  const router = useRouter();
  const handleSubmit = async (event: any) => {
    event.preventDefault(); // todo: типизировать event
    const { target } = event;
    const data = {
      title: target.title.value,
      description: target.description.value,
    }
    const config = {
      method: 'patch',
      maxBodyLength: Infinity,
      url: `http://localhost:3333/posts/${params.id}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      },
      data: data,
      validateStatus: function (status: number) {
        return status < 500; // Resolve only if the status code is < 500
      },
    };
    try {
      const ar = await axios(config);
      addRequestLog(JSON.stringify(ar.data, null, ' '));
      if (ar.status === 200) {
        router.replace(`/posts/${params.id}`)
      } else if (ar.status === 401) {
        router.replace('/auth/me');
      } else if (ar.status === 403) {
        alert('У вас нет прав на изменение этого поста.');
        router.replace('/posts');
      } else {
        throw new Error();
      }
    } catch(err) {
      alert('Неизвестная ошибка.')
    }
  }
  return (
    ( post && !postError &&
    <Pane>
      <form onSubmit={ handleSubmit }>
        <H2>Редактировать пост</H2>
        <Table>
          <tbody>
            <tr>
              <Td>
                <label htmlFor="title">Title</label>
              </Td>
              <Td>
                <Input type="text" id="title" name="title" defaultValue={post.title} />
              </Td>
            </tr>
            <tr>
              <Td>
                <label htmlFor="description">Description</label>
              </Td>
              <Td>
                <Textarea id="description" name="description" defaultValue={post.description} />
              </Td>
            </tr>
          </tbody>
        </Table>
        <Button type="submit">Опубликовать</Button>
      </form>
    </Pane>
    )
    ||
    (!postError && <Loading />)
    ||
    (<Pane><H2>Ошибка.</H2></Pane>)
  )
}
