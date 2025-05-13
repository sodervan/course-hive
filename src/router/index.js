import { createRouter, createWebHistory } from "vue-router";
import login from "@/pages/login.vue";
import signup from "@/pages/signup.vue";
import main from "@/pages/main.vue";
import about from "@/pages/about.vue";
import AuthLayout from "@/layouts/AuthLayout.vue";

const routes = [
  {
    path: "/",
    name: "Auth",
    component: AuthLayout,
    children: [
      { path: "", name: "Login", component: login },
      { path: "signup", name: "Signup", component: signup },
    ]
  },
  { path: "/main", name: "Main", component: main },
  { path: "/about", name: "About", component: about },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
// // Navigation guard to check if the user is authenticated
// router.beforeEach((to, from, next) => {
//   const isAuthenticated = localStorage.getItem("token");
//   if (to.name !== "Login" && to.name !== "Signup" && !isAuthenticated) {
//     next({ name: "Login" });
//   } else {
//     next();
//   }
// });
export default router;
