import { Injectable } from '@angular/core';

import { QueryEntity } from '@datorama/akita';
import { DownloadInformationStore, DownloadInformationState } from './download-information.store';
import { DownloadInformation } from './download-information.model';

@Injectable({ providedIn: 'root' })
export class DownloadInformationQuery extends QueryEntity<DownloadInformationState, DownloadInformation> {

  constructor(protected store: DownloadInformationStore) {
    super(store);
  }

}
