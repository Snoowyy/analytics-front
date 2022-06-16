import { ID } from '@datorama/akita';
import { PartialJson } from 'src/app/modules/core/shared';
import { Entity } from 'src/app/shared/models/_shared_';
import { Utf8, Float, StructValue } from 'src/vendoring/arrow-js/type';

export interface FuelType extends Entity {
  Name: Utf8;
  Density: Float;
  Lhv: Float;
  EmissionFactor: Float;
}

export function createFuelType(params: PartialJson<FuelType>) {
  return {

  } as StructValue<FuelType>;
}
