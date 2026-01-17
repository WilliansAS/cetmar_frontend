<template>
  <Sidebar :navItems="navItems">
    <div class="max-w-7xl mx-auto">
      <slot />
    </div>
  </Sidebar>
</template>

<script setup lang="ts">
import Sidebar from '@/components/layouts/Sidebar.vue'

const navItems = [
  { label: 'Inicio', route: '/dashboard/admin', iconSrc: '/images/InicioIcon.svg' },
  { label: 'Gestión usuarios', route: '/dashboard/admin/users', iconSrc: '/images/GestionUsuariosIcon.svg' },
  { label: 'Roles & Permisos', route: '/dashboard/admin/roles', iconSrc: '/images/RolesYPermisosIcon.svg' },
]
</script>

<style scoped></style>
