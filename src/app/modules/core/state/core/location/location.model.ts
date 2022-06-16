import { ID } from '@datorama/akita';
import { Entity, ForeignKey } from 'src/app/shared/models/_shared_';
import { Utf8, Float, StructValue } from 'src/vendoring/arrow-js/type';
import { PartialJson } from 'src/app/modules/core/shared';

export interface Location extends Entity {
  Name: Utf8;
  City_id: ForeignKey;
  Latitude: Float;
  Longitude: Float;
  Enterprise_id: ForeignKey;
}

export function createLocation(params: PartialJson<Location>) {
  return {

  } as StructValue<Location>;
}
