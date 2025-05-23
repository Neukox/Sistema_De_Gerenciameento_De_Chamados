import { useEffect, useState } from "react";
import { UserSession } from "types/User";

export default function useUserInfo() {
  const [user, setUser] = useState<Omit<UserSession, "iat" | "exp">>();

  useEffect(() => {
    const session = sessionStorage.getItem("session");

    if (session) {
      const parsedUser = JSON.parse(session);
      setUser(parsedUser);
    }
  }, []);

  return user;
}
