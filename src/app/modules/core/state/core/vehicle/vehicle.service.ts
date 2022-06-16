import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { VehicleStore } from './vehicle.store';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class VehicleService {

  constructor(private vehicleStore: VehicleStore,
              private http: HttpClient) {
  }

  get() {
    // this.http.get().subscribe((entities: ServerResponse) => {
      // this.vehicleStore.set(entities);
    // });
  }

  add() {
    // this.http.post().subscribe((entity: ServerResponse) => {
      // this.vehicleStore.add(entity);
    // });
  }

}
