import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { UserStore } from './user.store';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class UserService {

  constructor(private userStore: UserStore,
              private http: HttpClient) {
  }

  get() {
    // this.http.get().subscribe((entities: ServerResponse) => {
      // this.userStore.set(entities);
    // });
  }

  add() {
    // this.http.post().subscribe((entity: ServerResponse) => {
      // this.userStore.add(entity);
    // });
  }

}
