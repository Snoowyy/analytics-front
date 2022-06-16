import { ID } from '@datorama/akita';

export interface SalesByClient {
  name: string;
  shortName?: string;
  sales: number;
}

export function createSalesByClient(params: Partial<SalesByClient>) {
  return {

  } as SalesByClient;
}
