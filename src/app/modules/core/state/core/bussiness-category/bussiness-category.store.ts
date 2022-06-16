import { Injectable } from '@angular/core';
import { StoreConfig } from '@datorama/akita';
import { BussinessCategory } from './bussiness-category.model';
import { ArrowState, ArrowStore } from 'src/app/shared/arrow-akita';

export interface BussinessCategoryState extends ArrowState<BussinessCategory> { }

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'bussiness-category' })
export class BussinessCategoryStore extends ArrowStore<BussinessCategoryState, BussinessCategory> {

  constructor() {
    super();
  }

}

