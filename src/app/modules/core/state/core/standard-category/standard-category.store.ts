import { Injectable } from '@angular/core';
import { StoreConfig } from '@datorama/akita';
import { StandardCategory } from './standard-category.model';
import { ArrowState, ArrowStore } from 'src/app/shared/arrow-akita';

export interface StandardCategoryState extends ArrowState<StandardCategory> { }

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'standard-category' })
export class StandardCategoryStore extends ArrowStore<StandardCategoryState, StandardCategory> {

  constructor() {
    super();
  }

}

