import { ID } from '@datorama/akita';
import { Entity, ForeignKey } from 'src/app/shared/models/_shared_';
import { PartialJson } from 'src/app/modules/core/shared';
import { StructValue } from 'src/vendoring/arrow-js/type';

export interface Trip extends Entity {
  BussinessUnit_id: ForeignKey;
  Source_id: ForeignKey;
  Target_id: ForeignKey;
}

export function createTrip(params: PartialJson<Trip>) {
  return {

  } as StructValue<Trip>;
}
