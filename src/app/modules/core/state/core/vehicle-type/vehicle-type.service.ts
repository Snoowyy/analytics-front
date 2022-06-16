import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { VehicleTypeStore } from './vehicle-type.store';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class VehicleTypeService {

  constructor(private vehicleTypeStore: VehicleTypeStore,
              private http: HttpClient) {
  }

  get() {
    // this.http.get().subscribe((entities: ServerResponse) => {
      // this.vehicleTypeStore.set(entities);
    // });
  }

  add() {
    // this.http.post().subscribe((entity: ServerResponse) => {
      // this.vehicleTypeStore.add(entity);
    // });
  }

}
