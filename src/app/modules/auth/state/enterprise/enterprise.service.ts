import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { EnterpriseStore } from './enterprise.store';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class EnterpriseService {

  constructor(private enterpriseStore: EnterpriseStore,
              private http: HttpClient) {
  }

  get() {
    // this.http.get().subscribe((entities: ServerResponse) => {
      // this.enterpriseStore.set(entities);
    // });
  }

  add() {
    // this.http.post().subscribe((entity: ServerResponse) => {
      // this.enterpriseStore.add(entity);
    // });
  }

}
