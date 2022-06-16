import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { EconomicSectorStore } from './economic-sector.store';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class EconomicSectorService {

  constructor(private economicSectorStore: EconomicSectorStore,
              private http: HttpClient) {
  }

  get() {
    // this.http.get().subscribe((entities: ServerResponse) => {
      // this.economicSectorStore.set(entities);
    // });
  }

  add() {
    // this.http.post().subscribe((entity: ServerResponse) => {
      // this.economicSectorStore.add(entity);
    // });
  }

}
