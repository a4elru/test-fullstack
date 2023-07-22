'use client';

import IPost from "@/models/post";
import Link from "next/link";
import styled from "styled-components";

const Table = styled.table`
  width: 100%;
`
const Textarea = styled.textarea`
  resize: vertical;
  min-height: 21px;
  width: 98%;
`
const PRight = styled.p`
  text-align: right;
`
const PLeft = styled.p`
  text-align: left;
`

export default function Post({ post }: { post: IPost }) {
  let links;
  if (Number(localStorage.getItem('myUserId')) === post.creatorUserId) {
    const remove = `/posts/${post.id}/remove`;
    const edit = `/posts/${post.id}/edit`;
    links = (<> (<Link href={edit}>изменить</Link>, <Link href={remove}>удалить</Link>)</>);
  }
  return (
    <>
      <h3>{ post.title }</h3>
      <Textarea readOnly value={ post.description } />
      <Table>
        <tbody>
          <tr>
            <td>
              <PLeft>Post ID: { post.id }{ links }</PLeft>
            </td>
            <td>
              <PRight>Author ID: { post.creatorUserId }</PRight>
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  )
}
