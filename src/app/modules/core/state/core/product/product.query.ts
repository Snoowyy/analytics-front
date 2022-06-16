import { Injectable } from '@angular/core';
import { ProductStore, ProductState } from './product.store';
import { Product } from './product.model';
import { QueryArrow } from 'src/app/shared/arrow-akita';

@Injectable({ providedIn: 'root' })
export class ProductQuery extends QueryArrow<ProductState, Product> {

  constructor(protected store: ProductStore) {
    super(store);
  }

}
