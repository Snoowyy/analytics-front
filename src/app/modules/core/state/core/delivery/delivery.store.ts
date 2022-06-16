import { Injectable } from '@angular/core';
import { StoreConfig } from '@datorama/akita';
import { Delivery } from './delivery.model';
import { ArrowStore, ArrowState } from 'src/app/shared/arrow-akita';

export interface DeliveryState extends ArrowState<Delivery> { }

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'delivery' })
export class DeliveryStore extends ArrowStore<DeliveryState, Delivery> {

  constructor() {
    super();
  }

}

