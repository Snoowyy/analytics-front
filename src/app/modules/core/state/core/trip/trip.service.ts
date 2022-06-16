import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { TripStore } from './trip.store';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class TripService {

  constructor(private tripStore: TripStore,
              private http: HttpClient) {
  }

  get() {
    // this.http.get().subscribe((entities: ServerResponse) => {
      // this.tripStore.set(entities);
    // });
  }

  add() {
    // this.http.post().subscribe((entity: ServerResponse) => {
      // this.tripStore.add(entity);
    // });
  }

}
