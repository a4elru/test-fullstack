'use client';

import { usePosts } from "@/hooks/posts"
import Pane from "@/components/pane";
import Post from "@/components/post";
import { Button } from "@/components/pane-elements";
import Link from "next/link";
import Loading from "@/components/loading";
import Unavailable from "@/components/unavailable";

export default function Page() {
  let head, content;

  const { posts, postsError } = usePosts();
  if (posts) {
    head = <Pane><Link href="/posts/new"><br /><Button>Добавить публикацию</Button></Link></Pane>
    content = posts.map((value) => <Pane key={value.id}><Post post={value} /></Pane>)
  } else {
    content = <Loading />
  }

  return (
    <>
      { !postsError && head }
      { !postsError && content }
      { postsError && <Unavailable /> }
    </>
  )
}
