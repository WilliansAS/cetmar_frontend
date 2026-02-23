import { apiRequest } from "@/utils/httpClient";
import type { 
  IAllCounters, 
  ISimpleCounter, 
  IAverageCounter, 
  IGenderDistribution, 
  IRegularityDistribution, 
  ICareerDistribution 
} from "@/interfaces/ICounter";

const prefix = "/counters";

export const getCountersAll = async () => {
  return apiRequest<IAllCounters>(`${prefix}/all`);
};

export const getTotalStudents = async () => {
  return apiRequest<ISimpleCounter>(`${prefix}/students/total`);
};

export const getProcessedReportCards = async () => {
  return apiRequest<ISimpleCounter>(`${prefix}/report-cards/processed`);
};

export const getInstitutionalAverage = async () => {
  return apiRequest<IAverageCounter>(`${prefix}/statistics/institutional-average`);
};

export const getInactiveStudents = async () => {
  return apiRequest<ISimpleCounter>(`${prefix}/students/inactive`);
};

export const getStudentsByGender = async () => {
  return apiRequest<IGenderDistribution>(`${prefix}/students/gender`);
};

export const getStudentsByRegularity = async () => {
  return apiRequest<IRegularityDistribution>(`${prefix}/students/regularity`);
};

export const getStudentsByCareer = async () => {
  return apiRequest<ICareerDistribution>(`${prefix}/students/by-career`);
};

export const getRegisteredUsers = async () => {
  return apiRequest<ISimpleCounter>(`${prefix}/users/registered`);
};

export const getActiveEvents = async () => {
  return apiRequest<ISimpleCounter>(`${prefix}/events/active`);
};

export const getUploadedReportCards = async () => {
  return apiRequest<ISimpleCounter>(`${prefix}/report-cards/uploaded`);
};