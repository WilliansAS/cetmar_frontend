import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "@/modules/students/pages/Dashboard.vue";
import Home from "@/modules/public/pages/Home.vue";
import Login from "@/modules/public/pages/Login.vue";
import About from "@/modules/public/pages/About.vue";
import BoletaManagement from "../modules/school/pages/BoletaManagement.vue";
import Test from "../modules/school/pages/Test.vue";
import EspecialidadDetalle from "../modules/public/pages/EspecialidadDetalle.vue";
import Calendar from "../modules/public/pages/Calendar.vue";
import DashboardSchool from "../modules/school/pages/DashboardSchool.vue";
import StudentManagement from "@/modules/school/pages/StudentManagement.vue";
import DashboardDirector from "@/modules/director/pages/DashboardDirector.vue";
import DashboardLinking from "@/modules/linking/pages/DashboardLinking.vue";
import DashboardAdmin from "@/modules/admin/pages/DashboardAdmin.vue";
import UsersAdmin from "@/modules/admin/pages/UsersAdmin.vue";
import RolesAdmin from "@/modules/admin/pages/RolesAdmin.vue";
import LinkingAbout from "@/modules/linking/pages/LinkingAbout.vue";
import LinkingCalendar from "@/modules/linking/pages/LinkingCalendar.vue";
import LinkingHome from "@/modules/linking/pages/LinkingHome.vue";
import LinkingSpecialty from "@/modules/linking/pages/LinkingSpecialty.vue";

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
    {
      path: "/dashboard/school",
      name: "dashboard-school",
      component: DashboardSchool,
    },
    {
      path: "/school/studentManagement",
      name: "student-management",
      component: StudentManagement,
    },
    {
      path: "/dashboard/director",
      name: "director-dashboard",
      component: DashboardDirector, 
    },
    {
      path: "/dashboard/vinculacion",
      name: "linking-dashboard",
      component: DashboardLinking,
    },
    {
      path: "/dashboard/vinculacion/inicio",
      name: "linking-home",
      component: LinkingHome,
    },
    {
      path: "/dashboard/vinculacion/nosotros",
      name: "linking-about",
      component: LinkingAbout,
    },
    {
      path: "/dashboard/vinculacion/calendario",
      name: "linking-calendar",
      component: LinkingCalendar,
    },
    {
      path: "/dashboard/vinculacion/especialidades/:slug",
      name: "linking-specialty",
      component: LinkingSpecialty,
    },

    {
      path: "/dashboard/admin",
      name: "admin-dashboard",
      component: DashboardAdmin,
    },
    {
      path: "/dashboard/admin/users",
      name: "admin-users",
      component: UsersAdmin,
    },
    {
      path: "/dashboard/admin/roles",
      name: "admin-roles",
      component: RolesAdmin,
    }
  ],
});

export default router;
