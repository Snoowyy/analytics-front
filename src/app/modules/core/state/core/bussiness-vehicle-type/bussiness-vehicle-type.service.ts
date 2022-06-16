import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { BussinessVehicleTypeStore } from './bussiness-vehicle-type.store';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class BussinessVehicleTypeService {

  constructor(
    private bussinessVehicleTypeStore: BussinessVehicleTypeStore
    ) {
  }

  get() {
    // this.http.get().subscribe((entities: ServerResponse) => {
      // this.bussinessVehicleTypeStore.set(entities);
    // });
  }

  add() {
    // this.http.post().subscribe((entity: ServerResponse) => {
      // this.bussinessVehicleTypeStore.add(entity);
    // });
  }

}
