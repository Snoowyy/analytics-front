import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { LocationKindStore } from './location-kind.store';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class LocationKindService {

  constructor(private locationKindStore: LocationKindStore,
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
