import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { DeliveryStore } from './delivery.store';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class DeliveryService {

  constructor(private deliveryStore: DeliveryStore,
              private http: HttpClient) {
  }

  get() {
    // this.http.get().subscribe((entities: ServerResponse) => {
      // this.deliveryStore.set(entities);
    // });
  }

  add() {
    // this.http.post().subscribe((entity: ServerResponse) => {
      // this.deliveryStore.add(entity);
    // });
  }

}
