import { ID } from '@datorama/akita';

export interface SalesByCategory {
  name: string;
  shortName?: string;
  sales: number;
}

export function createSalesByCategory(params: Partial<SalesByCategory>) {
  return {

  } as SalesByCategory;
}
