export interface SalesBehaviorByTimeSeries {
  lower: number;
  q1: number;
  median: number;
  q3: number;
  upper: number;
  mean: number;
  outliers?: number[];
  date: string;
}

export function createSalesBehaviorByTimeSeries(params: Partial<SalesBehaviorByTimeSeries>) {
  return {

  } as SalesBehaviorByTimeSeries;
}
