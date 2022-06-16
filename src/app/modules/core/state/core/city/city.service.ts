import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { CityStore } from './city.store';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class CityService {

  constructor(private cityStore: CityStore,
              private http: HttpClient) {
  }

  get() {
    // this.http.get().subscribe((entities: ServerResponse) => {
      // this.cityStore.set(entities);
    // });
  }

  add() {
    // this.http.post().subscribe((entity: ServerResponse) => {
      // this.cityStore.add(entity);
    // });
  }

}
