import { ID } from '@datorama/akita';
import { Entity, ForeignKey } from 'src/app/shared/models/_shared_';
import { Utf8, StructValue } from 'src/vendoring/arrow-js/type';
import { PartialJson } from 'src/app/modules/core/shared';

export interface Department extends Entity {
  Name: Utf8;
  Region_id: ForeignKey;
}

export function createDepartment(params: PartialJson<Department>) {
  return {

  } as StructValue<Department>;
}
