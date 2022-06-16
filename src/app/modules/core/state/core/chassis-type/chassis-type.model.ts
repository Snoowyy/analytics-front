import { ID } from '@datorama/akita';
import { Entity } from 'src/app/shared/models/_shared_';
import { Utf8, StructValue } from 'src/vendoring/arrow-js/type';
import { PartialJson } from 'src/app/modules/core/shared';

export interface ChassisType extends Entity {
  Name: Utf8;
}

export function createChassisType(params: PartialJson<ChassisType>) {
  return {

  } as StructValue<ChassisType>;
}
