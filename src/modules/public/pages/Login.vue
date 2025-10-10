<template>
  <div class="min-h-screen flex flex-col md:flex-row">
    <!-- LADO IZQUIERDO - FORMULARIO -->
    <div
      class="w-full md:w-[45%] flex flex-col items-center justify-center bg-white px-6 py-10"
    >
      <div class="w-full max-w-md flex flex-col items-center text-center">
        <!-- Encabezado -->
        <div
          class="flex items-center gap-3 mb-8 justify-center md:justify-start"
        >
          <img
            src="/images/logo_cetmar.svg"
            alt="Logo Institución"
            class="w-12 h-12"
          />
          <h2 class="text-2xl md:text-3xl font-medium text-[#1226AB]">
            CETMAR 41
          </h2>
        </div>

        <!-- Títulos -->
        <div class="mb-10 w-full">
          <h1
            class="text-4xl md:text-5xl font-extrabold uppercase text-gray-900 leading-tight"
          >
            ¡Bienvenido de nuevo!
          </h1>
          <p
            class="text-base md:text-lg font-medium text-[#1226AB] mt-3 leading-snug"
          >
            Accede con tu cuenta al Sistema Institucional
          </p>
        </div>

        <!-- Formulario -->
        <form class="flex flex-col gap-7 w-full">
          <div class="flex flex-col text-left">
            <BaseInput
              id="email"
              label="Correo electrónico"
              type="email"
              placeholder="ejemplo@correo.com"
            />
          </div>

          <div class="flex flex-col text-left relative">
            <!-- Etiqueta -->
            <label
              for="password"
              class="text-sm sm:text-base font-semibold text-gray-700 mb-2"
            >
              Contraseña
            </label>

            <!-- Contenedor del input y el ícono -->
            <div class="relative w-full flex items-center">
              <input
                id="password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="••••••••"
                v-model="password"
                class="border border-gray-300 rounded-lg outline-none transition w-full px-3 py-2 text-base sm:px-4 sm:py-3 sm:text-lg focus:ring-2 focus:ring-[#1226AB] focus:border-transparent pr-10"
              />

              <!-- Botón del ícono -->
              <button
                type="button"
                @click="togglePassword"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <img
                  v-if="!showPassword"
                  :src="EyeIcon"
                  alt="Mostrar contraseña"
                  class="w-5 h-5 sm:w-6 sm:h-6"
                />
                <img
                  v-else
                  :src="InvisibleIcon"
                  alt="Ocultar contraseña"
                  class="w-5 h-5 sm:w-6 sm:h-6"
                />
              </button>
            </div>
          </div>

          <!-- Botón principal -->
          <BaseButton text="Iniciar sesión" customClass="text-lg rounded-lg" />

          <!-- Botón de regresar -->
          <button
            type="button"
            @click="goHome"
            class="text-[#1226AB] text-lg font-bold underline hover:opacity-80 transition cursor-pointer"
          >
            Regresar al inicio
          </button>
        </form>
      </div>
    </div>

    <!-- LADO DERECHO - IMAGEN -->
    <div class="hidden md:block w-full md:w-[55%] bg-gray-100">
      <img
        src="/images/cetmar.png"
        alt="Imagen institucional"
        class="w-full h-screen"
      />
    </div>
  </div>
</template>

<script setup>
import BaseInput from "@/components/elements/BaseInput.vue";
import BaseButton from "@/components/elements/BaseButton.vue";
import EyeIcon from "@/assets/icons/Eye.svg";
import InvisibleIcon from "@/assets/icons/Invisible.svg";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const goHome = () => {
  router.push("/");
};

const password = ref("");
const showPassword = ref(false);

const togglePassword = () => {
  showPassword.value = !showPassword.value;
};
</script>
