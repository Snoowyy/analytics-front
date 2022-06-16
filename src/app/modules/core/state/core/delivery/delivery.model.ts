import { ID } from '@datorama/akita';
import { PartialJson } from 'src/app/modules/core/shared';
import { Entity, ForeignKey } from 'src/app/shared/models/_shared_';
import { Utf8, Int, Float, StructValue, Date_, StructData, Float32 } from 'src/vendoring/arrow-js/type';

export interface Delivery extends Entity {
  BussinessId: Utf8;
  Date: Int<number>;
  Trip_id: ForeignKey;
  Vehicle_id: ForeignKey;
  StandardCategory_id: ForeignKey;
  Weight: Float32;
  Volume: Float32;
}

export function createDelivery(params: PartialJson<Delivery>) {
  return {

  } as StructValue<Delivery>;
}
