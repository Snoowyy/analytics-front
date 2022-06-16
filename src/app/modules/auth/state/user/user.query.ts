import { Injectable } from '@angular/core';
import { UserStore, UserState } from './user.store';
import { User } from './user.model';
import { QueryArrow } from 'src/app/shared/arrow-akita';

@Injectable({ providedIn: 'root' })
export class UserQuery extends QueryArrow<UserState, User> {

  constructor(protected store: UserStore) {
    super(store);
  }

}
