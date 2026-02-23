export interface ICounterByCareer {
  major: string;
  count: number;
}

export interface ISimpleCounter {
  count: number;
}

export interface IAverageCounter {
  average: number;
}

export interface IGenderDistribution {
  male: number;
  female: number;
}

export interface IRegularityDistribution {
  regular: number;
  irregular: number;
}

export interface ICareerDistribution {
  students_by_career: ICounterByCareer[];
}

export interface IAllCounters {
  total_students: number;
  processed_report_cards: number;
  institutional_average: number;
  inactive_students: number;
  male_students: number;
  female_students: number;
  regular_students: number;
  irregular_students: number;
  students_by_career: ICounterByCareer[];
  registered_users: number;
  active_events: number;
  uploaded_report_cards: number;
}