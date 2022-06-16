import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { BussinessCategoryStore } from './bussiness-category.store';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class BussinessCategoryService {

  constructor(private bussinessCategoryStore: BussinessCategoryStore,
              private http: HttpClient) {
  }

  get() {
    // this.http.get().subscribe((entities: ServerResponse) => {
      // this.bussinessCategoryStore.set(entities);
    // });
  }

  add() {
    // this.http.post().subscribe((entity: ServerResponse) => {
      // this.bussinessCategoryStore.add(entity);
    // });
  }

}
