import { Injectable } from '@angular/core';
import { StandardCategoryStore, StandardCategoryState } from './standard-category.store';
import { StandardCategory } from './standard-category.model';
import { QueryArrow } from 'src/app/shared/arrow-akita';

@Injectable({ providedIn: 'root' })
export class StandardCategoryQuery extends QueryArrow<StandardCategoryState, StandardCategory> {

  constructor(protected store: StandardCategoryStore) {
    super(store);
  }

}
