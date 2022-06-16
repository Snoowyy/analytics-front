import { ID } from '@datorama/akita';
import { Entity } from 'src/app/shared/models/_shared_';
import { Utf8 } from 'src/vendoring/arrow-js/type';

export interface Group extends Entity {
  name: Utf8;
}

export function createGroup(params: Partial<Group>) {
  return {

  } as Group;
}
