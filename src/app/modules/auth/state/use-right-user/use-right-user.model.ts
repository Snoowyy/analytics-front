import { ID } from '@datorama/akita';
import { Entity, ForeignKey } from 'src/app/shared/models/_shared_';
import { PartialJson } from 'src/app/modules/core/shared';
import { StructValue } from 'src/vendoring/arrow-js/type';

export interface UseRightUser extends Entity {
  Group_id: ForeignKey;
  BussinessUnit_id: ForeignKey;
  User_id: ForeignKey;
}

export function createUseRightUser(params: PartialJson<UseRightUser>) {
  return {

  } as StructValue<UseRightUser>;
}
