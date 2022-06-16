import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { UserBussinessUnitStore } from './user-bussiness-unit.store';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class BussinessUnitService {

  constructor(private bussinessUnitStore: UserBussinessUnitStore,
              private http: HttpClient) {
  }

  get() {
    // this.http.get().subscribe((entities: ServerResponse) => {
      // this.bussinessUnitStore.set(entities);
    // });
  }

  add() {
    // this.http.post().subscribe((entity: ServerResponse) => {
      // this.bussinessUnitStore.add(entity);
    // });
  }

}
