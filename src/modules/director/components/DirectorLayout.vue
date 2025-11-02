<template>
  <Sidebar :nav-items="navigationMenu">
    <slot></slot>
  </Sidebar>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Sidebar from "../../../components/layouts/Sidebar.vue";
import HomeIcon from "@/assets/icons/Home.svg";

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
    route: "/dashboard/director",
  }
]);
</script>
