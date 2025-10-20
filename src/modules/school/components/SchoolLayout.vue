<template>
  <Sidebar :nav-items="navigationMenu">
    <slot></slot>
  </Sidebar>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Sidebar from "../../../components/layouts/Sidebar.vue";
import HomeIcon from "@/assets/icons/Home.svg";
import FileIcon from "@/assets/icons/Document.svg";
import UserIcon from "@/assets/icons/Group.svg";

interface NavItem {
  label: string;
  iconSrc?: string;
  route?: string;
  children?: NavItem[];
}

const navigationMenu = ref<NavItem[]>([
  {
    label: "Inicio",
    iconSrc: HomeIcon,
    route: "/",
  },
  {
    label: "Boletas",
    iconSrc: FileIcon,
    route: "/boletas",
    children: [
      {
        label: "Servicios de Hospedaje",
        route: "/boletas/servicios",
        iconSrc: "",
      },
      {
        label: "Laboratorio Ambiental",
        route: "/boletas/laboratorio",
      },
      {
        label: "Sistemas de Informacion Geografica",
        route: "/boletas/laboratorio",
        iconSrc: "",
      },
      {
        label: "Vida Saludable",
        route: "/dashboard",
        iconSrc: "",
      },
    ],
  },
  {
    label: "Estudiantes",
    iconSrc: UserIcon,
    route: "/test",
  },
]);
</script>
