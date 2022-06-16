import { Injectable } from '@angular/core';
import { GroupStore, GroupState } from './group.store';
import { Group } from './group.model';
import { QueryArrow } from 'src/app/shared/arrow-akita';

@Injectable({ providedIn: 'root' })
export class GroupQuery extends QueryArrow<GroupState, Group> {

  constructor(protected store: GroupStore) {
    super(store);
  }

}
