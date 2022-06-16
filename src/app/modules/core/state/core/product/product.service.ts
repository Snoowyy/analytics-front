import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { ProductStore } from './product.store';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ProductService {

  constructor(private productStore: ProductStore,
              private http: HttpClient) {
  }

  get() {
    // this.http.get().subscribe((entities: ServerResponse) => {
      // this.productStore.set(entities);
    // });
  }

  add() {
    // this.http.post().subscribe((entity: ServerResponse) => {
      // this.productStore.add(entity);
    // });
  }

}
