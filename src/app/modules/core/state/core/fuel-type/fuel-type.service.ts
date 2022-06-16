import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { FuelTypeStore } from './fuel-type.store';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class FuelTypeService {

  constructor(private fuelTypeStore: FuelTypeStore,
              private http: HttpClient) {
  }

  get() {
    // this.http.get().subscribe((entities: ServerResponse) => {
      // this.fuelTypeStore.set(entities);
    // });
  }

  add() {
    // this.http.post().subscribe((entity: ServerResponse) => {
      // this.fuelTypeStore.add(entity);
    // });
  }

}
