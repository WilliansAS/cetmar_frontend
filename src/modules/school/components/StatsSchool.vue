<template>
  <div class="w-full">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      <StatsCard
        title="Estudiantes"
        value="40,689"
        :iconSrc="UserGroup"
        iconBgClass="bg-purple-100"
      />

      <StatsCard
        title="Boletas Subidas"
        value="10,293"
        :iconSrc="Block"
        iconBgClass="bg-yellow-100"
      />

      <StatsCard :iconSrc="UserGroup" iconBgClass="bg-blue-100">
        <span class="text-sm lg:text-xs xl:text-sm font-semibold text-gray-500"
          >Estudiantes regulares</span
        >
        <span class="text-xl font-bold text-gray-900 mb-3">89,000</span>

        <span class="text-sm lg:text-xs xl:text-sm font-semibold text-gray-500"
          >Estudiantes irregulares</span
        >
        <span class="text-xl font-bold text-gray-900">1,784</span>
      </StatsCard>

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
</script>
