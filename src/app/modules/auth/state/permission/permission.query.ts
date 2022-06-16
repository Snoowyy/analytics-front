import { Injectable } from '@angular/core';
import { PermissionStore, PermissionState } from './permission.store';
import { Permission } from './permission.model';
import { QueryArrow } from 'src/app/shared/arrow-akita';

@Injectable({ providedIn: 'root' })
export class PermissionQuery extends QueryArrow<PermissionState, Permission> {

  constructor(protected store: PermissionStore) {
    super(store);
  }

}
