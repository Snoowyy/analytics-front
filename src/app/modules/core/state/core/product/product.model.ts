import { ID } from '@datorama/akita';
import { PartialJson } from 'src/app/modules/core/shared';
import { Entity, ForeignKey } from 'src/app/shared/models/_shared_';
import { Int, StructValue } from 'src/vendoring/arrow-js/type';

export interface Product extends Entity {
  Gtin: Int<number>;
  StandardCategory_id: ForeignKey;
  BussinessCategory_id: ForeignKey;
}

export function createProduct(params: PartialJson<Product>) {
  return {

  } as StructValue<Product>;
}
