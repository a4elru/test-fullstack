'use client';

import { notFound } from "next/navigation";
import { usePost } from "@/hooks/post";
import Pane from "@/components/pane";
import Post from "@/components/post";
import Loading from "@/components/loading";
import Unavailable from "@/components/unavailable";

export default function Page({ params }: { params: { id: string } }) {
  let content;
  if (!/^\d+$/.test(params.id)) {
    notFound();
  }

  const { post, postError } = usePost(params.id);
  if (post) {
    content = <Pane><Post post={post} /></Pane>
  } else {
    content = <Loading />
  }

  return (
    <>
      { !postError && content }
      { postError && <Unavailable /> }
    </>
  )
}
