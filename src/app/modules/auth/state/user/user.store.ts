import { Injectable } from '@angular/core';
import { StoreConfig } from '@datorama/akita';
import { User } from './user.model';
import { ArrowState, ArrowStore } from 'src/app/shared/arrow-akita';

export interface UserState extends ArrowState<User> { }

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'user' })
export class UserStore extends ArrowStore<UserState, User> {

  constructor() {
    super();
  }

}

