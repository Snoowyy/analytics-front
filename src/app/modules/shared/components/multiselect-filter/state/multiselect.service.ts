import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Multiselect, MultiselectStore } from './';

@Injectable({ providedIn: 'root' })
export class MultiselectService {

  readonly MULTISELECT = 'ca/filters/';

  constructor(
    private multiselectStore: MultiselectStore,
    private httpClient: HttpClient
  ) { }

  get(): void {
    const url: string = environment.urlApi + this.MULTISELECT;
    const entities = {};

    this.multiselectStore.setLoading(true);

    this.httpClient.get<Multiselect[]>(url)
      .subscribe((response: Multiselect[]) => {
        entities[`options`] = response;
        this.multiselectStore.set(entities);
        this.multiselectStore.setLoading(false);
      }, error => {
        this.multiselectStore.setLoading(false);
      });

  }

}
