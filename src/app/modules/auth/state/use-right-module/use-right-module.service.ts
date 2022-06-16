import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { UseRightModuleStore } from './use-right-module.store';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class UseRightModuleService {

  constructor(private useRightModuleStore: UseRightModuleStore,
              private http: HttpClient) {
  }

  get() {
    // this.http.get().subscribe((entities: ServerResponse) => {
      // this.useRightModuleStore.set(entities);
    // });
  }

  add() {
    // this.http.post().subscribe((entity: ServerResponse) => {
      // this.useRightModuleStore.add(entity);
    // });
  }

}
