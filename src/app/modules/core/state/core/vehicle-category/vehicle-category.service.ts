import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { VehicleCategoryStore } from './vehicle-category.store';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class VehicleCategoryService {

  constructor(private vehicleCategoryStore: VehicleCategoryStore,
              private http: HttpClient) {
  }

  get() {
    // this.http.get().subscribe((entities: ServerResponse) => {
      // this.vehicleCategoryStore.set(entities);
    // });
  }

  add() {
    // this.http.post().subscribe((entity: ServerResponse) => {
      // this.vehicleCategoryStore.add(entity);
    // });
  }

}
