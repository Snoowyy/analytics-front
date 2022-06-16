import { ID } from '@datorama/akita';
import { Utf8 } from 'src/vendoring/arrow-js/type';
import { ForeignKey, Entity } from 'src/app/shared/models/_shared_';

export interface Permission extends Entity {
  name: Utf8;
  content_type_id: ForeignKey;
  codename: Utf8;
}

export function createPermission(params: Partial<Permission>) {
  return {

  } as Permission;
}
