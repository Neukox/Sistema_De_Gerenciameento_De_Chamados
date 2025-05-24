import { redirect } from "react-router";
import { UserSession } from "types/User";

export function roleBasedLoader({ request }: { request: Request }) {
  const session = sessionStorage.getItem("session");

  if (!session) {
    return redirect("/login");
  }

  const user: UserSession = JSON.parse(session);

  const url = new URL(request.url);

  if (user.role === "cliente" && url.pathname === "/") {
    return redirect("/dashboard");
  } else if (user.role === "admin" && url.pathname === "/") {
    return redirect("/admin/dashboard");
  }

  return null;
}

export function adminProtectionRouteLoader() {
  const session = sessionStorage.getItem("session");

  if (!session) {
    return redirect("/login");
  }

  const user: UserSession = JSON.parse(session);

  if (user.role !== "admin") {
    throw new Response("Forbidden", { status: 403 });
  }
}
