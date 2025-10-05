import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "@/modules/students/pages/Dashboard.vue";
import Home from "@/modules/public/pages/Home.vue";
import Login from "@/modules/public/pages/Login.vue";
import About from "@/modules/public/pages/About.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: Dashboard,
    },
    {
      path: "/nosotros",
      name: "about",
      component: About,
    },
  ],
});

export default router;
