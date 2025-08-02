import axios from "axios";
import { type RouteLocationNormalizedLoaded, type Router } from "vue-router";
import { publicRoutes } from "./consts";
import { VALID_TOKEN_ROUTE } from "../components/consts";

export async function checkAuthAndRedirect(
  route: RouteLocationNormalizedLoaded,
  router: Router
) {
  try {
    await axios.get(VALID_TOKEN_ROUTE, {
      withCredentials: true,
    });

    if (publicRoutes.includes(route.path)) {
      router.push("/search");
    }
  } catch (err) {
    console.log("Failed to verify token");

    if (route.path.startsWith("/search")) {
      router.push("/");
    }
  }
}
