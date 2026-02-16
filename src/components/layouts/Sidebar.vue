<template>
  <div class="flex h-screen">
    <aside
      class="flex flex-col bg-white transition-all duration-300 ease-in-out"
      :class="isCollapsed ? 'w-20' : 'w-64'"
    >
      <div class="flex items-center justify-center pt-8">
        <img
          src="/images/logo_cetmar.svg"
          alt="CETMAR 41 Logo"
          class="h-8 w-8"
        />
        <span v-if="!isCollapsed" class="ml-2 text-xl font-bold text-[#4880FF]">
          CETMAR 41
        </span>
      </div>

      <nav class="flex-grow py-4">
        <ul>
          <li v-for="item in navItems" :key="item.label" class="px-4.5">
            <div v-if="item.children" class="my-1">
              <div
                class="flex items-center rounded-md transition-colors relative"
                :class="[
                  item.route && route.path === item.route
                    ? 'bg-[#4880FF] text-white shadow-lg'
                    : isParentActive(item)
                    ? 'bg-blue-50'
                    : 'hover:bg-gray-100',
                  { 'justify-center': isCollapsed },
                ]"
              >
                <!-- Si tiene ruta, es un enlace -->
                <router-link
                  v-if="item.route"
                  :to="item.route"
                  custom
                  v-slot="{ href, navigate }"
                >
                  <a
                    :href="href"
                    @click="navigate"
                    class="flex items-center p-3 text-[#202224] font-semibold"
                    :class="{
                      'flex-grow': !isCollapsed,
                      'text-white': route.path === item.route,
                      'text-[#4880FF]':
                        isParentActive(item) && route.path !== item.route,
                    }"
                  >
                    <img
                      v-if="item.iconSrc"
                      :src="item.iconSrc"
                      alt=""
                      class="w-5 h-5"
                      :class="route.path === item.route ? 'filter-white' : 'filter-black'"
                    />
                    <span v-if="!isCollapsed" class="ml-3">{{
                      item.label
                    }}</span>
                  </a>
                </router-link>

                <!-- Si NO tiene ruta, es solo un texto clickeable para desplegar -->
                <div
                  v-else
                  @click="toggleDropdown(item.label)"
                  class="flex items-center p-3 text-[#202224] font-semibold cursor-pointer flex-grow"
                  :class="{
                    'text-[#4880FF]': isParentActive(item)
                  }"
                >
                   <img
                      v-if="item.iconSrc"
                      :src="item.iconSrc"
                      alt=""
                      class="w-5 h-5"
                      :class="isParentActive(item) ? '' : 'filter-black'"
                    />
                    <span v-if="!isCollapsed" class="ml-3">{{
                      item.label
                    }}</span>
                </div>

                <button
                  v-if="!isCollapsed"
                  @click.prevent="toggleDropdown(item.label)"
                  class="p-3 rounded-r-md flex-shrink-0 cursor-pointer"
                  aria-label="Desplegar submenú"
                >
                  <img
                    :src="SortDownIcon"
                    alt=""
                    class="w-3 h-3 transition-transform"
                    :class="[
                      { 'rotate-180': openDropdowns[item.label] },
                      item.route && route.path === item.route ? 'filter-white' : 'filter-black',
                    ]"
                  />
                </button>
              </div>

              <ul
                v-if="openDropdowns[item.label] && !isCollapsed"
                class="ml-6 mt-1 border-l border-gray-200"
              >
                <li v-for="child in item.children" :key="child.label">
                  <router-link
                    :to="child.route!"
                    class="block py-1.5 px-3 text-sm text-[#202224] hover:text-[#4880FF]"
                  >
                    {{ child.label }}
                  </router-link>
                </li>
              </ul>
            </div>

            <router-link
              v-else
              :to="item.route!"
              custom
              v-slot="{ href, navigate, isActive }"
            >
              <a
                :href="href"
                @click="navigate"
                class="flex items-center p-3 my-1 rounded-md transition-colors relative"
                :class="[
                  isActive
                    ? 'bg-[#4880FF] text-white shadow-lg'
                    : 'text-[#202224] font-semibold hover:bg-gray-100',
                  { 'justify-center': isCollapsed },
                ]"
              >
                <img
                  :src="item.iconSrc"
                  alt=""
                  class="w-5 h-5 transition-all"
                  :class="isActive ? 'filter-white' : 'filter-black'"
                />
                <span v-if="!isCollapsed" class="ml-3">{{ item.label }}</span>
              </a>
            </router-link>
          </li>
        </ul>
      </nav>

      <hr class="border-t border-[#E0E0E0] mx-3" />

      <div class="p-3">
        <a
          href="/login"
          class="flex items-center justify-center p-3 rounded-md text-[#202224] font-semibold hover:bg-gray-100"
        >
          <img :src="LogoutIcon" alt="Cerrar sesión" class="w-5 h-5 filter-black" />
          <span v-if="!isCollapsed" class="ml-3">Cerrar Sesión</span>
        </a>
      </div>
    </aside>

    <div class="flex-1 flex flex-col overflow-hidden">
      <header class="flex items-center justify-between p-4 bg-white">
        <div>
          <button
            @click="toggleSidebar"
            class="p-2 text-gray-500 rounded-full hover:bg-gray-100 focus:outline-none cursor-pointer"
          >
            <img :src="MenuIcon" alt="menu" class="w-5 h-5 filter-black" />
          </button>
        </div>
        <div class="flex items-center">
          <img
            class="h-10 w-10 rounded-full object-cover"
            src="https://i.pravatar.cc/40"
            alt="User avatar"
          />
          <div class="ml-3 text-right">
            <p class="font-semibold text-sm">WilliansAS</p>
            <p class="text-xs text-gray-500">Administrador</p>
          </div>
          <button class="ml-3">
            <span
              class="flex items-center justify-center w-7 h-7 border border-gray-300 rounded-full"
            >
              <img :src="ExpandIcon" alt="opciones" class="w-4 h-4 filter-black" />
            </span>
          </button>
        </div>
      </header>

      <main class="flex-1 overflow-x-hidden overflow-y-auto p-6 bg-[#F4F8FE]">
        <slot></slot>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import LogoutIcon from "@/assets/icons/Logout.svg";
import MenuIcon from "@/assets/icons/Menu.svg";
import SortDownIcon from "@/assets/icons/SortDown.svg";
import ExpandIcon from "@/assets/icons/Expand.svg";

interface NavItem {
  label: string;
  iconSrc?: string;
  route?: string;
  children?: NavItem[];
}

const props = defineProps<{
  navItems: NavItem[];
}>();

const isCollapsed = ref(false);
const openDropdowns = ref<Record<string, boolean>>({});
const route = useRoute();

const toggleSidebar = () => (isCollapsed.value = !isCollapsed.value);
const toggleDropdown = (label: string) => {
  if (!openDropdowns.value[label]) {
    openDropdowns.value = {};
  }
  openDropdowns.value[label] = !openDropdowns.value[label];
};

const isParentActive = (parentItem: NavItem) => {
  if (!parentItem.children) return false;
  // Si tiene ruta padre, verificar
  if (parentItem.route && route.path.startsWith(parentItem.route) && route.path !== parentItem.route) {
    return true;
  }
  // Verificar si alguno de los hijos está activo
  return parentItem.children.some(child => child.route && route.path.startsWith(child.route));
};
</script>

<style scoped>
.filter-white {
  filter: brightness(0) invert(1);
}

.filter-black {
  filter: brightness(0);
}

/* Estilo para el sub-item activo */
.router-link-exact-active {
  color: #4880ff;
  font-weight: 500;
}
</style>
