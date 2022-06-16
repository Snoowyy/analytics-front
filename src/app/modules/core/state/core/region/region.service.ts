import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { RegionStore } from './region.store';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class RegionService {

  constructor(private regionStore: RegionStore,
              private http: HttpClient) {
  }

  get() {
    // this.http.get().subscribe((entities: ServerResponse) => {
      // this.regionStore.set(entities);
    // });
  }

  add() {
    // this.http.post().subscribe((entity: ServerResponse) => {
      // this.regionStore.add(entity);
    // });
  }

}
