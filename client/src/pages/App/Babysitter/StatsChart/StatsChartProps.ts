export interface StatsChartProps {
  data: InteractionsData[];
}

export interface InteractionsData {
  totalCount: number;
  contacted: number;
  workedWith: number;
}
