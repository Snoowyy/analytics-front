export interface Multiselect {
  name: string;
  type: TypeMultiselectOption | string;
  region?: string;
  gtin?: number;
  categories?: string[];
  retailer?: number;
  gln?: number;
  levels?: string[];
}

export type TypeMultiselectOption = 'businessunit' | 'client' | 'product' | 'pv' | 'region' | 'product category' | 'pointsale category' | 'custom';

export function createMultiselect(params: Partial<Multiselect>) {
  return {

  } as Multiselect;
}
