import { redirect } from "next/navigation";
import { useEffect } from "react";

export function useAuthRedirect(whenSuccess = false) {
  useEffect(() => {
    const myUserId = localStorage.getItem('myUserId') || '-1';
    if (whenSuccess && Number(myUserId) > 0) {
      redirect('/auth/me');
    }
    const whenFailed = !whenSuccess;
    if (whenFailed && Number(myUserId) < 0) {
      redirect('/auth/me');
    }
  }, [whenSuccess])
}
