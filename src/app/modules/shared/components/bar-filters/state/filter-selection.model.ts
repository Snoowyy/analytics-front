export interface BusinessLevels {
  business_level1?: string;
  business_level2?: string;
  business_level3?: string;
  business_level4?: string;
  bussiness_level1?: string;
  bussiness_level2?: string;
  bussiness_level3?: string;
  bussiness_level4?: string;
}
export interface RetailerLevels {
  'retailer-level1'?: string;
  'retailer-level2'?: string;
  'retailer-level3'?: string;
  'retailer-level4'?: string;
}

export interface OthersFilterSelection extends BusinessLevels, RetailerLevels {
  bussiness_units?: number[];
  glnretailerlocations?: number[];
  gtins?: number[];
  glnretailer?: number[];
  region?: string[];
  business_levels?: BusinessLevels;
  retailer_level?: RetailerLevels;
}
export interface FilterSelection extends OthersFilterSelection {
  start_date: string;
  end_date: string;
  period?: PeriodicitySelected;
  id_filter?: number;
}

export type PeriodicitySelected = 'yearly' | 'monthly' | 'weekly' | 'daily' | 'W' | 'D' | 'M';

export function createFilterSelection(params: Partial<FilterSelection>) {
  return {

  } as FilterSelection;
}
