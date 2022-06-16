import { ID } from '@datorama/akita';
import { Entity, ForeignKey } from 'src/app/shared/models/_shared_';
import { Utf8, Date_, Bool, StructValue } from 'src/vendoring/arrow-js/type';
import { PartialJson } from 'src/app/modules/core/shared';

export interface User extends Entity {
  username: Utf8;
  last_login: Date_;
  Employeer_id: ForeignKey;
  IsAdministrator: Bool;
  first_name: Utf8;
  last_name: Utf8;
  email: Utf8;
}

export function createUser(params: PartialJson<User>) {
  return {

  } as StructValue<User>;
}
