import { useEffect, useState } from "react";
import { UserSession } from "types/User";

export default function useUserInfo() {
  const [user, setUser] = useState<Omit<UserSession, "iat" | "exp">>();

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      const parsedUser = JSON.parse(user);
      setUser(parsedUser);
    }
  }, []);

  return user;
}
