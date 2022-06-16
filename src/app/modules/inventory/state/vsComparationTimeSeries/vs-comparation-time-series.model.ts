export interface VsComparationTimeSeries {
  time_series: string[];
  data: Data[];
  categories: string[];
  axis: Axis[];
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

export function createVsComparationTimeSeries(params: Partial<VsComparationTimeSeries>) {
  return {

  } as VsComparationTimeSeries;
}
