import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { SubmodulesStore } from './submodules.store';
import { environment } from 'src/environments/environment';
import { Submodules } from './submodules.model';

@Injectable({ providedIn: 'root' })
export class SubmoduleService {
  readonly SUBMODULES = '/permissions-submodules/';

  constructor(
    private submodulesStore: SubmodulesStore,
    private httpClient: HttpClient
  ) { }

  public getSubmodules(): void {
    const url = `${environment.gatewayUrl}${this.SUBMODULES}`;
    const entities = {};

    this.httpClient.get<Submodules[]>(url)
      .subscribe((response: Submodules[]) => {
        entities['submodules'] = response;
        if (response) this.submodulesStore.set(entities);
      }, error => {
         this.submodulesStore.setLoading(false);
      });
  }
}
