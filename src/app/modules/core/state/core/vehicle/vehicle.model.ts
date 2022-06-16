import { ID } from '@datorama/akita';
import { PartialJson } from 'src/app/modules/core/shared';
import { Entity, ForeignKey } from 'src/app/shared/models/_shared_';
import { Utf8, Int, StructValue } from 'src/vendoring/arrow-js/type';

export interface Vehicle extends Entity {
  VehicleType_id: ForeignKey;
  ChassisType_id: ForeignKey;
  Identification: Utf8;
  Year: Int<number>;
  SecondYear: Int<number>;
  FuelType_id: ForeignKey;
}

export function createVehicle(params: PartialJson<Vehicle>) {
  return {

  } as StructValue<Vehicle>;
}
