import { Injectable } from '@angular/core';
import { BussinessCategoryStore, BussinessCategoryState } from './bussiness-category.store';
import { BussinessCategory } from './bussiness-category.model';
import { QueryArrow } from 'src/app/shared/arrow-akita';

@Injectable({ providedIn: 'root' })
export class BussinessCategoryQuery extends QueryArrow<BussinessCategoryState, BussinessCategory> {

  constructor(protected store: BussinessCategoryStore) {
    super(store);
  }

}
