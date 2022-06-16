import { Injectable } from '@angular/core';
import { StoreConfig } from '@datorama/akita';
import { Group } from './group.model';
import { ArrowState, ArrowStore } from 'src/app/shared/arrow-akita';

export interface GroupState extends ArrowState<Group> { }

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'group' })
export class GroupStore extends ArrowStore<GroupState, Group> {

  constructor() {
    super();
  }

}

