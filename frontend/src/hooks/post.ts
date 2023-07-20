import { addRequestLog } from "@/lib/request-log";
import IPost from "@/models/post";
import axios from "axios";
import { useEffect, useState } from "react";

export function usePost(id: string) {
  const [post, setPost] = useState<IPost | null>(null);
  const [postError, setPostError] = useState<boolean>(false);

  useEffect(() => {
    async function fetchPost() {
      try {
        const ar = await axios<{ result: IPost }>(`http://localhost:3333/posts/${id}`);
        addRequestLog(JSON.stringify(ar.data, null, ' '));
        if (ar.status === 200) {
          setPost(ar.data.result);
          setPostError(false);
        } else {
          throw new Error();
        }
      } catch (err) {
        setPostError(true);
      }
    }
    fetchPost()
  }, [id])

  return { post, postError };
}
