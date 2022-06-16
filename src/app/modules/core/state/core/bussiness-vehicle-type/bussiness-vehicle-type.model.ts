import { ID } from '@datorama/akita';
import { PartialJson } from 'src/app/modules/core/shared';
import { Entity, ForeignKey } from 'src/app/shared/models/_shared_';
import { Utf8, StructValue } from 'src/vendoring/arrow-js/type';

export interface BussinessVehicleType extends Entity {
  VehicleType_id: ForeignKey;
  Enterprise_id: ForeignKey;
  Name: Utf8;
}

export function createBussinessVehicleType(params: PartialJson<BussinessVehicleType>) {
  return {

  } as StructValue<BussinessVehicleType>;
}
