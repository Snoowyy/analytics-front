export interface TotalSale {
  total: number;
  qty: number;
  'variation-ytd': number | string;
  'variation-mtd': number | string;
}

export function createTotalSale(params: Partial<TotalSale>) {
  return {

  } as TotalSale;
}
