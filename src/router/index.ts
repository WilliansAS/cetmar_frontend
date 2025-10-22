import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "@/modules/students/pages/Dashboard.vue";
import Home from "@/modules/public/pages/Home.vue";
import Login from "@/modules/public/pages/Login.vue";
import About from "@/modules/public/pages/About.vue";
import BoletaManagement from "../modules/school/pages/BoletaManagement.vue";
import Test from "../modules/school/pages/Test.vue";
import EspecialidadDetalle from "../modules/public/pages/EspecialidadDetalle.vue";
import Calendar from "../modules/public/pages/Calendar.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/especialidad/:id",
      name: "especialidad",
      component: EspecialidadDetalle,
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
    {
      path: "/calendario",
      name: "calendar",
      component: Calendar,
    },
    {
      path: "/boletas",
      name: "tickets",
      component: BoletaManagement,
    },
    {
      path: "/test",
      name: "test",
      component: Test,
    },
  ],
});

export default router;