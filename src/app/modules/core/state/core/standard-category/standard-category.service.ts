import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { StandardCategoryStore } from './standard-category.store';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class StandardCategoryService {

  constructor(private standardCategoryStore: StandardCategoryStore,
              private http: HttpClient) {
  }

  get() {
    // this.http.get().subscribe((entities: ServerResponse) => {
      // this.standardCategoryStore.set(entities);
    // });
  }

  add() {
    // this.http.post().subscribe((entity: ServerResponse) => {
      // this.standardCategoryStore.add(entity);
    // });
  }

}
