import { Injectable } from '@angular/core';
import { StoreConfig } from '@datorama/akita';
import { Permission } from './permission.model';
import { ArrowState, ArrowStore } from 'src/app/shared/arrow-akita';

export interface PermissionState extends ArrowState<Permission> { }

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'permission' })
export class PermissionStore extends ArrowStore<PermissionState, Permission> {

  constructor() {
    super();
  }

}

