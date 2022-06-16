import { ID } from '@datorama/akita';
import { Entity, ForeignKey } from 'src/app/shared/models/_shared_';
import { PartialJson } from 'src/app/modules/core/shared';
import { StructValue } from 'src/vendoring/arrow-js/type';

export interface UseRightModule extends Entity {
  Def_id: ForeignKey;
  Module_id: ForeignKey;
  BussinessUnit_id: ForeignKey;
}


export function createUseRightModule(params: PartialJson<UseRightModule>) {
  return {

  } as StructValue<UseRightModule>;
}
