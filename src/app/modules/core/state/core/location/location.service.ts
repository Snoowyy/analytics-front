import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { LocationStore } from './location.store';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class LocationService {

  constructor(private locationStore: LocationStore,
              private http: HttpClient) {
  }

  get() {
    // this.http.get().subscribe((entities: ServerResponse) => {
      // this.localizationStore.set(entities);
    // });
  }

  add() {
    // this.http.post().subscribe((entity: ServerResponse) => {
      // this.localizationStore.add(entity);
    // });
  }

}
