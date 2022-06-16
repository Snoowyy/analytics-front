import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { GroupStore } from './group.store';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class GroupService {

  constructor(private groupStore: GroupStore,
              private http: HttpClient) {
  }

  get() {
    // this.http.get().subscribe((entities: ServerResponse) => {
      // this.groupStore.set(entities);
    // });
  }

  add() {
    // this.http.post().subscribe((entity: ServerResponse) => {
      // this.groupStore.add(entity);
    // });
  }

}
