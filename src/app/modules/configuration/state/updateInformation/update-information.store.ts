import { Injectable } from '@angular/core';

import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { UpdateInformation } from './update-information.model';

export interface UpdateInformationState extends EntityState<UpdateInformation[]> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'updateInformation' })
export class UpdateInformationStore extends EntityStore<UpdateInformationState, UpdateInformation[]> {

  constructor() {
    super();
  }

}

export const updateInformationStore = new UpdateInformationStore();

