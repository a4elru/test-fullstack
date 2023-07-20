'use client';

import { notFound } from "next/navigation";
import { usePost } from "@/hooks/post";
import Pane from "@/components/pane";
import Post from "@/components/post";
import { useMe } from "@/hooks/me";
import Loading from "@/components/loading";
import Unavailable from "@/components/unavailable";

export default function Page({ params }: { params: { id: string } }) {
  let content;
  let {me, meError} = useMe();
  if (!/^\d+$/.test(params.id)) {
    notFound();
  }

  const { post, postError } = usePost(params.id);
  if (post && (me || meError)) {
    content = <Pane><Post myUserId={me?.id} post={post} /></Pane>
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
