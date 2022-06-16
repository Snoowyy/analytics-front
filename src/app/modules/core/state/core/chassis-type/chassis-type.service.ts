import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { ChassisTypeStore } from './chassis-type.store';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ChassisTypeService {

  constructor(private chassisTypeStore: ChassisTypeStore,
              private http: HttpClient) {
  }

  get() {
    // this.http.get().subscribe((entities: ServerResponse) => {
      // this.chassisTypeStore.set(entities);
    // });
  }

  add() {
    // this.http.post().subscribe((entity: ServerResponse) => {
      // this.chassisTypeStore.add(entity);
    // });
  }

}
