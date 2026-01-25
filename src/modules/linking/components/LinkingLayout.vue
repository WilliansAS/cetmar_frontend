<template>
  <Sidebar :nav-items="navigationMenu">
    <slot></slot>
  </Sidebar>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Sidebar from "../../../components/layouts/Sidebar.vue";
import HomeIcon from "@/assets/icons/Home Page.svg";
import UsersIcon from "@/assets/icons/Users.svg";
import CalendarIcon from "@/assets/icons/Calen.svg";
import BookIcon from "@/assets/icons/Book.svg";
// import Mic from "@/assets/icons/Announce.svg";

interface NavItem {
  label: string;
  iconSrc?: string;
  route?: string;
  children?: NavItem[];
}

const navigationMenu = ref<NavItem[]>([
  //  {
  //   label: "Anuncios",
  //   iconSrc: Mic,
  //   route: "/dashboard/vinculacion",
  // },
  {
    label: "Inicio",
    iconSrc: HomeIcon,
    route: "/dashboard/vinculacion/inicio",
  },
  {
    label: "Nosotros",
    iconSrc: UsersIcon,
    route: "/dashboard/vinculacion/nosotros",
  },
  {
    label: "Calendario",
    iconSrc: CalendarIcon,
    route: "/dashboard/vinculacion/calendario",
  },
  {
  label: "Especialidades",
  iconSrc: BookIcon,
  children: [
    {
      label: "Vida Saludable",
      route: "/dashboard/vinculacion/especialidades/vida-saludable",
    },
    {
      label: "Servicios de Hospedaje",
      route: "/dashboard/vinculacion/especialidades/hospedaje",
    },
    {
      label: "Laboratorio Ambiental",
      route: "/dashboard/vinculacion/especialidades/ambiental",
    },
    {
      label: "Sistemas de Org. Geográfica",
      route: "/dashboard/vinculacion/especialidades/sig",
    },
  ],
}

]);

</script>
