import { ID } from '@datorama/akita';
import { PartialJson } from 'src/app/modules/core/shared';
import { Entity, ForeignKey } from 'src/app/shared/models/_shared_';
import { Utf8, StructValue } from 'src/vendoring/arrow-js/type';

export interface BussinessCategory extends Entity {
  Name: Utf8;
  Enterprise_id: ForeignKey;
  Parent_id: ForeignKey;
}

export function createBussinessCategory(params: PartialJson<BussinessCategory>) {
  return {

  } as StructValue<BussinessCategory>;
}
