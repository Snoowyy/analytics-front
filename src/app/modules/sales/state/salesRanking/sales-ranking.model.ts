export interface SalesRanking {
  name: string;
  sales: {
    name: string;
    shortName?: string;
    value: number;
  }[];
}

export function createSalesRanking(params: Partial<SalesRanking>) {
  return {

  } as SalesRanking;
}
