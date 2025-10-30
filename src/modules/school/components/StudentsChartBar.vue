<template>
  <div>
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup lang="ts">
import { Bar } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title as TitleComponent,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';
import { computed } from 'vue';

ChartJS.register(TitleComponent, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const props = defineProps<{
  labels: string[];
  datasets: any[];
  options?: any;
}>();

const chartData = computed(() => ({
  labels: props.labels,
  datasets: props.datasets,
}));

const chartOptions = computed(() => ({
  responsive: true,
  plugins: {
    legend: { display: true, position: 'top' },
    title: { display: false },
  },
  ...props.options,
}));
</script>
