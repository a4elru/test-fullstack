import { addRequestLog } from "@/lib/request-log";
import IPost from "@/models/post";
import axios from "axios";
import { useEffect, useState } from "react";

export function usePosts() {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [postsError, setPostsError] = useState<boolean>(false);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const ar = await axios<{ result: IPost[] }>(`http://localhost:3333/posts`);
        addRequestLog(JSON.stringify(ar.data, null, ' '));
        if (ar.status === 200) {
          setPosts(ar.data.result);
          setPostsError(false);
        } else {
          throw new Error();
        }
      } catch (err) {
        setPostsError(true);
      }
    }
    fetchPosts()
  }, [])

  return { posts, postsError };
}
