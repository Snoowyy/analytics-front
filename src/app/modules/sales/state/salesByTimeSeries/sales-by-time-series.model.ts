import { ID } from '@datorama/akita';

export interface SalesByTimeSeries {
  time_series: string[];
  data: {
    client: string,
    sales: number[]
  }[];
}

export interface SalesByTimeSeriesExcel {
  client: string;
  sale: number;
  date: string;
}

export function createSalesByTimeSeries(params: Partial<SalesByTimeSeries>) {
  return {

  } as SalesByTimeSeries;
}
