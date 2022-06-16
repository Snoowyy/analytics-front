export interface RankingPointsSale {
  name: string;
  sales: {
    name: string;
    shortName?: string;
    value: number;
  }[];
}

export function createRankingPointsSale(params: Partial<RankingPointsSale>) {
  return {

  } as RankingPointsSale;
}
