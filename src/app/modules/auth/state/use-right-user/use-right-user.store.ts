import { Injectable } from '@angular/core';
import { StoreConfig } from '@datorama/akita';
import { UseRightUser } from './use-right-user.model';
import { ArrowState, ArrowStore } from 'src/app/shared/arrow-akita';

export interface UseRightUserState extends ArrowState<UseRightUser> { }

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'use-right-user' })
export class UseRightUserStore extends ArrowStore<UseRightUserState, UseRightUser> {

  constructor() {
    super();
  }

}

