import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription, of } from 'rxjs';

import { environment } from 'src/environments/environment';
import { UpdateInformationStore } from './update-information.store';
import { UpdateInformation } from '.';

@Injectable({ providedIn: 'root' })
export class UpdateInformationService {

  readonly UPDATE_INFORMATION = 'ca/imported-file/';
  subscription: Subscription;

  constructor(
    private updateInformationStore: UpdateInformationStore,
    private httpClient: HttpClient
  ) { }

  public get(): void {
    const url: string = environment.urlApi + this.UPDATE_INFORMATION;
    this.updateInformationStore.setLoading(true);

    this.subscription = this.httpClient.get<UpdateInformation[]>(url)
      .subscribe((response: UpdateInformation[]) => {
        const entities = {};
        entities[`updateInformation`] = response;
        this.updateInformationStore.set(entities);
        this.updateInformationStore.setLoading(false);
      }, error => {
        this.updateInformationStore.setLoading(false);
      });
  }

  public unsubscribeGetInventory(): void {
    if (this.subscription)
      this.subscription.unsubscribe();
  }

}
