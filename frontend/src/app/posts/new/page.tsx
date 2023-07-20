'use client';

import Pane from "@/components/pane";
import { Button, H2, Table, Td, Input, Textarea } from "@/components/pane-elements";
import { useMe } from "@/hooks/me";
import { addRequestLog } from "@/lib/request-log";
import axios from "axios";
import { redirect, useRouter } from "next/navigation";

export default function EditPosts() {
  const { meError } = useMe();
  if (meError) {
    redirect('/auth/me');
  }
  const router = useRouter();
  const handleSubmit = async (event: any) => {
    event.preventDefault(); // todo: типизировать event
    const { target } = event;
    const data = {
      title: target.title.value,
      description: target.description.value,
    }
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:3333/posts',
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
      if (ar.status === 201) {
        router.replace(`/posts/${ar.data.result.id}`)
      } else if (ar.status === 401) {
        router.replace('/auth/me');
      } else {
        throw new Error();
      }
    } catch(err) {
      alert('Неизвестная ошибка.')
    }
  }
  return (
    <Pane>
    <form onSubmit={ handleSubmit }>
      <H2>Создать пост</H2>
      <Table>
        <tbody>
          <tr>
            <Td>
              <label htmlFor="title">Title</label>
            </Td>
            <Td>
              <Input type="text" id="title" name="title"/>
            </Td>
          </tr>
          <tr>
            <Td>
              <label htmlFor="description">Description</label>
            </Td>
            <Td>
              <Textarea id="description" name="description"></Textarea>
            </Td>
          </tr>
        </tbody>
      </Table>
      <Button type="submit">Опубликовать</Button>
    </form>
    </Pane>
  )
}
