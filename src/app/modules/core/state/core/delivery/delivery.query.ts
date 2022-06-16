import { Injectable } from '@angular/core';
import { DeliveryStore, DeliveryState } from './delivery.store';
import { Delivery } from './delivery.model';
import { QueryArrow } from 'src/app/shared/arrow-akita';

@Injectable({ providedIn: 'root' })
export class DeliveryQuery extends QueryArrow<DeliveryState, Delivery> {

  constructor(protected store: DeliveryStore) {
    super(store);
  }

}
