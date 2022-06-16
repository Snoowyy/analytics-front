import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { DownloadInformation } from './download-information.model';
import { Injectable } from '@angular/core';

export interface DownloadInformationState extends EntityState<DownloadInformation> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'downloadInformation' })
export class DownloadInformationStore extends EntityStore<DownloadInformationState, DownloadInformation> {

  constructor() {
    super();
  }

}
