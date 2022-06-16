import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { CediRequirementsStore } from './cedirequirements.store';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class CediRequirementsService {

  constructor(private cediRequirementsStore: CediRequirementsStore,
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
