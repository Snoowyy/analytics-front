import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { UseDefModuleStore } from './use-def-module.store';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class UseDefModuleService {

  constructor(private useDefModuleStore: UseDefModuleStore,
              private http: HttpClient) {
  }

  get() {
    // this.http.get().subscribe((entities: ServerResponse) => {
      // this.useDefModuleStore.set(entities);
    // });
  }

  add() {
    // this.http.post().subscribe((entity: ServerResponse) => {
      // this.useDefModuleStore.add(entity);
    // });
  }

}
