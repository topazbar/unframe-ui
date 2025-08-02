import { createRouter, createWebHistory } from "vue-router";
import Login from "./components/Login.vue";
import SearchLine from "./components/SearchLine.vue";
import AuthRedirectHandler from "./components/AuthRedirectHandler.vue";

const routes = [
  { path: "/", component: Login },
  { path: "/search", component: SearchLine },
  { path: "/auth/google/redirect", component: AuthRedirectHandler },
];

const router = createRouter({ history: createWebHistory(), routes });

export default router;
