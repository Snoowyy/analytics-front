import { ID } from '@datorama/akita';
import { SalesByCategory } from '../salesByCategory';

export interface SalesBehavior {
  name: string;
  sales: number;
}

export function createSalesBehavior(params: Partial<SalesBehavior>) {
  return {

  } as SalesBehavior;
}
