import { Injectable } from '@angular/core';
import { StoreConfig } from '@datorama/akita';
import { Product } from './product.model';
import { ArrowState, ArrowStore } from 'src/app/shared/arrow-akita';

export interface ProductState extends ArrowState<Product> { }

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'product' })
export class ProductStore extends ArrowStore<ProductState, Product> {

  constructor() {
    super();
  }

}

