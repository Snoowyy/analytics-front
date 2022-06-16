import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { UseRightUserStore } from './use-right-user.store';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class UseRightUserService {

  constructor(private useRightUserStore: UseRightUserStore,
              private http: HttpClient) {
  }

  get() {
    // this.http.get().subscribe((entities: ServerResponse) => {
      // this.useRightUserStore.set(entities);
    // });
  }

  add() {
    // this.http.post().subscribe((entity: ServerResponse) => {
      // this.useRightUserStore.add(entity);
    // });
  }

}
