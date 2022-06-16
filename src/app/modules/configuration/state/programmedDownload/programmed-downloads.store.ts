import { Injectable } from '@angular/core';

import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { ProgrammedDownload } from './programmed-download.model';

export interface ProgrammedDownloadsState extends EntityState<ProgrammedDownload[]> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'programmedDownloads' })
export class ProgrammedDownloadsStore extends EntityStore<ProgrammedDownloadsState, ProgrammedDownload[]> {

  constructor() {
    super();
  }

}
