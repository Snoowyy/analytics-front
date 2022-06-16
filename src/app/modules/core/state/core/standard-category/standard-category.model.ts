import { ID } from '@datorama/akita';
import { PartialJson } from 'src/app/modules/core/shared';
import { StructValue, Utf8 } from 'src/vendoring/arrow-js/type';
import { Entity, ForeignKey } from 'src/app/shared/models/_shared_';

export interface StandardCategory extends Entity {
  Name: Utf8;
  Thumbnail: Utf8;
  Parent_id: ForeignKey;
}

export function createStandardCategory(params: PartialJson<StandardCategory>) {
  return {

  } as StructValue<StandardCategory>;
}
