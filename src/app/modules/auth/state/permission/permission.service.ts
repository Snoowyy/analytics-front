import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { PermissionStore } from './permission.store';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class PermissionService {

  constructor(private permissionStore: PermissionStore,
              private http: HttpClient) {
  }

  get() {
    // this.http.get().subscribe((entities: ServerResponse) => {
      // this.permissionStore.set(entities);
    // });
  }

  add() {
    // this.http.post().subscribe((entity: ServerResponse) => {
      // this.permissionStore.add(entity);
    // });
  }

}
