import { ID } from '@datorama/akita';
import { Entity, ForeignKey } from 'src/app/shared/models/_shared_';
import { Utf8, Float, StructValue } from 'src/vendoring/arrow-js/type';
import { PartialJson } from 'src/app/modules/core/shared';

export interface LocationKind extends Entity {
  Name: Utf8;
}

export function createLocationKind(params: PartialJson<LocationKind>) {
  return {

  } as StructValue<LocationKind>;
}
