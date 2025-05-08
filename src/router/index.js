import { createRouter, createWebHistory } from "vue-router";
import login from "@/pages/login.vue";
import signup from "@/pages/signup.vue";
import main from "@/pages/main.vue";
import about from "@/pages/about.vue";

const routes = [
  { path: "/", name: "Login", component: login },
  { path: "/signup", name: "Signup", component: signup },
  { path: "/main", name: "Main", component: main },
  { path: "/about", name: "About", component: about },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
