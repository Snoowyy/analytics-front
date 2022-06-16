import { ID } from '@datorama/akita';
import { Utf8 } from 'src/vendoring/arrow-js/type';
import { Entity } from 'src/app/shared/models/_shared_';

export interface ContentType extends Entity {
  app_label: Utf8;
  model: Utf8;
}

export function createContentType(params: Partial<ContentType>) {
  return {

  } as ContentType;
}
