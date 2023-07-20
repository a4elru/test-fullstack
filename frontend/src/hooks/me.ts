import IUser from "@/models/user";
import axios from "axios";
import { useEffect, useState } from "react";
import { addRequestLog } from "../lib/request-log";

export function useMe() {
  const [me, setMe] = useState<IUser | null>(null);
  const [meError, setMeError] = useState<boolean>(false);

  useEffect(() => {
    async function fetchMe() {
      try {
        const ar = await axios<{ result: IUser }>('http://localhost:3333/auth/me', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
          }
        });
        addRequestLog(JSON.stringify(ar.data, null, ' '));
        if (ar.status === 200) {
          setMe(ar.data.result);
          setMeError(false);
        } else {
          throw new Error();
        }
      } catch (err) {
        setMeError(true);
      }
    }
    fetchMe();
  }, [])

  return { me, meError };
}
