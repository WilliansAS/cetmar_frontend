<template>
  <div class="w-full">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      <StatsCard
        title="Total de Estudiantes"
        value="3,689"
        :iconSrc="UserGroup"
        iconBgClass="bg-purple-100"
      />

      <StatsCard
        title="Boletas Subidas"
        value="5,293"
        :iconSrc="Block"
        iconBgClass="bg-yellow-100"
      />

      <StatsCard
        title="Promedio General Institucional"
        value="97.4%"
        :iconSrc="Statistics"
        iconBgClass="bg-pink-100"
      />

      <StatsCard
        title="Bajas del semestre"
        value="2,040"
        :iconSrc="Decline"
        iconBgClass="bg-red-100"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import StatsCard from "../../../components/elements/StatsCard.vue";
import UserGroup from "@/assets/icons/Group-Purple.svg";
import Block from "@/assets/icons/Block.svg";
import Decline from "@/assets/icons/Decline.svg";
import Statistics from "@/assets/icons/Statistics.svg";
</script>
