import { apiRequest } from "@/utils/httpClient";
import type { AverageDistributionResponse, CareerDistributionResponse, LeaveTrendResponse } from '../interfaces/counters.interface';

export const getAveragesDistribution = () => {
  return apiRequest<AverageDistributionResponse>('/counters/statistics/averages-distribution');
};

export const getStudentsByCareer = () => {
  return apiRequest<CareerDistributionResponse>('/counters/students/by-career');
};

export const getLeaveTrend = () => {
  return apiRequest<LeaveTrendResponse>('/counters/statistics/leave-trend');
};