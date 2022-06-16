import { ID } from '@datorama/akita';
import { PartialJson } from 'src/app/modules/core/shared';
import { Entity } from 'src/app/shared/models/_shared_';
import { Utf8, StructValue } from 'src/vendoring/arrow-js/type';

export interface VehicleCategory extends Entity {
  Name: Utf8;
}

export function createVehicleCategory(params: PartialJson<VehicleCategory>) {
  return {

  } as StructValue<VehicleCategory>;
}
