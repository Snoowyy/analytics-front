import { ID } from '@datorama/akita';
import { PartialJson } from 'src/app/modules/core/shared';
import { Entity, ForeignKey } from 'src/app/shared/models/_shared_';
import { Utf8, Float, StructValue } from 'src/vendoring/arrow-js/type';

export interface VehicleType extends Entity {
  Category_id: ForeignKey;
  ShortName: Utf8;
  LongName: Utf8;
  CapacityM3: Float;
  CapacityKg: Float;
  Thumbnail: Utf8;
}

export function createVehicleType(params: PartialJson<VehicleType>) {
  return {

  } as StructValue<VehicleType>;
}
