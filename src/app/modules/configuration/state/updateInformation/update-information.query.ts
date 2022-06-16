import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { QueryEntity } from '@datorama/akita';
import { UpdateInformationStore, UpdateInformationState } from './update-information.store';
import { UpdateInformation } from './update-information.model';

@Injectable({ providedIn: 'root' })
export class UpdateInformationQuery extends QueryEntity<UpdateInformationState, UpdateInformation[]> {

  constructor(protected store: UpdateInformationStore) {
    super(store);
  }

  get(): Observable<UpdateInformation[]> {
    return this.selectEntity(`updateInformation`);
  }

}
