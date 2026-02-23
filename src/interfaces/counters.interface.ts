// Define la forma de cada elemento del arreglo
export interface AverageRange {
  rango: string;
  cantidad: number;
}

// Define la respuesta completa del endpoint
export interface AverageDistributionResponse {
  distribucion: AverageRange[];
}


// Define la estructura de cada carrera
export interface CareerCount {
  major: string;
  count: number;
}

// Define la respuesta completa del endpoint
export interface CareerDistributionResponse {
  students_by_career: CareerCount[];
}

// Define un punto en el tiempo (mes/año y cuántas bajas hubo)
export interface TrendPoint {
  periodo: string;
  cantidad: number;
}

// Define la respuesta completa del endpoint
export interface LeaveTrendResponse {
  tendencia: TrendPoint[];
}