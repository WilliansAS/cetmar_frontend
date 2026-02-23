import { ref, computed } from "vue";
import { defineStore } from "pinia";
import * as counterService from "@/api/counter.api";
import type { IAllCounters } from "@/interfaces/ICounter";

export const useCounterStore = defineStore("counter", () => {
  const counters = ref<IAllCounters | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const totalStudents = computed(() => counters.value?.total_students ?? 0);
  const regularStudents = computed(() => counters.value?.regular_students ?? 0);
  const irregularStudents = computed(() => counters.value?.irregular_students ?? 0);
  const inactiveStudents = computed(() => counters.value?.inactive_students ?? 0);
  const maleStudents = computed(() => counters.value?.male_students ?? 0);
  const femaleStudents = computed(() => counters.value?.female_students ?? 0);
  const processedReportCards = computed(() => counters.value?.processed_report_cards ?? 0);
  const institutionalAverage = computed(() => counters.value?.institutional_average ?? 0);
  const registeredUsers = computed(() => counters.value?.registered_users ?? 0);
  const activeEvents = computed(() => counters.value?.active_events ?? 0);
  const uploadedReportCards = computed(() => counters.value?.uploaded_report_cards ?? 0);
  const studentsByCareer = computed(() => counters.value?.students_by_career ?? []);

  // Acción Principal
  const fetchAllCounters = async () => {
    loading.value = true;
    error.value = null;
    try {
      const data = await counterService.getCountersAll();
      counters.value = data;
    } catch (err) {
      error.value = "Error al cargar los contadores";
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  return {
    counters,
    loading,
    error,
    totalStudents,
    regularStudents,
    irregularStudents,
    inactiveStudents,
    maleStudents,
    femaleStudents,
    processedReportCards,
    institutionalAverage,
    registeredUsers,
    activeEvents,
    uploadedReportCards,
    studentsByCareer,
    fetchAllCounters,
  };
});