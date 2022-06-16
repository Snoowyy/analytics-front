import { Injectable } from '@angular/core';
import { UseRightUserStore, UseRightUserState } from './use-right-user.store';
import { UseRightUser } from './use-right-user.model';
import { QueryArrow } from 'src/app/shared/arrow-akita';

@Injectable({ providedIn: 'root' })
export class UseRightUserQuery extends QueryArrow<UseRightUserState, UseRightUser> {

  constructor(protected store: UseRightUserStore) {
    super(store);
  }

}
