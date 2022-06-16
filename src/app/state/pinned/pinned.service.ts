import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { PinnedStore } from './pinned.store';
import { environment } from 'src/environments/environment';
import { Pinned } from './pinned.model';

@Injectable({ providedIn: 'root' })
export class PinnedService {
  readonly PINNED = 'ca/pinned/';

  constructor(
    private pinnedStore: PinnedStore,
    private httpClient: HttpClient
  ) { }

  public getDataPinned(): void {
    const url = `${environment.urlApi}${this.PINNED}`;
    const entities = {};

    this.httpClient.get<Pinned[]>(url)
      .subscribe((response: Pinned[]) => {
        entities['pinned'] = response;
        if (response) this.pinnedStore.set(entities);
      }, error => { });
  }

  public pinnedData(filters: string): void {
    const url = `${environment.urlApi}${this.PINNED}`;
    const entities = {};
    this.pinnedStore.setLoading(true);

    this.httpClient.post<Pinned>(url, { filters })
      .subscribe((response: Pinned) => {
        entities['pinned'] = response;
        this.pinnedStore.set(entities);
        this.pinnedStore.setLoading(false);
      }, error => {
        this.pinnedStore.setLoading(false);
      });
  }

}
