import { ID } from '@datorama/akita';
import { Entity, ForeignKey } from 'src/app/shared/models/_shared_';
import { Utf8, Float, StructValue } from 'src/vendoring/arrow-js/type';
import { PartialJson } from 'src/app/modules/core/shared';

export interface City extends Entity {
  Name: Utf8;
  Department_id: ForeignKey;
  Latitude: Float;
  Longitude: Float;
}

export function createCity(params: PartialJson<City>) {
  return {

  } as StructValue<City>;
}
