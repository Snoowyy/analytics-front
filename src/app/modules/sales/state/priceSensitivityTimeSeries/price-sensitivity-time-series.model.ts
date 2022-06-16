export interface PriceSensitivityTimeSeries {
  categories: string[];
  elasticity: number;
  data: Data[];
  axis: Axis[];
  time_series: string[];
}

export interface PriceSensitivityTimeSeriesExcel {
  name: string;
  date: string;
  value: number;
}

interface Data {
  type: string;
  data: number[];
  name: string;
  color: string;
  stack?: boolean;
  axis?: string;
}

interface Axis {
  title: string;
  color: string;
  name?: string;
}

export function createPriceSensitivityTimeSeries(params: Partial<PriceSensitivityTimeSeries>) {
  return {

  } as PriceSensitivityTimeSeries;
}
