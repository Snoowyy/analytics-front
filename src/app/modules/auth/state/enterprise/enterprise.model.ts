import { ID } from '@datorama/akita';
import { Entity, ForeignKey } from 'src/app/shared/models/_shared_';
import { Utf8, StructValue } from 'src/vendoring/arrow-js/type';
import { PartialJson } from 'src/app/modules/core/shared';

export interface Enterprise extends Entity {
  Name: Utf8;
  EconomicSector_id: ForeignKey;
}

export function createEnterprise(params: PartialJson<Enterprise>) {
  return {

  } as StructValue<Enterprise>;
}
