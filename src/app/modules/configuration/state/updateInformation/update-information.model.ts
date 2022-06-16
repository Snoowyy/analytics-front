import { ID } from '@datorama/akita';

export interface UpdateInformation {
  glnretailer_name: string;
  glnretailer?: string;
  status: any;
  last_update: string | Date;
  sale: number;
  days: number;
  files: number;
  point_sales: number;
  products: number;
}

export function createUpdateInformation(params: Partial<UpdateInformation>) {
  return {

  } as UpdateInformation;
}
