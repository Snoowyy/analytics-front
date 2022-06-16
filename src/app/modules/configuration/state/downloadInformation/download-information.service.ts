import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subscription } from 'rxjs';

import { environment } from 'src/environments/environment';
import { DownloadInformationStore } from './download-information.store';
import { DownloadInformation } from '.';
import { SetFilterParamsService } from 'src/app/modules/shared/services/setFilterParams/set-filter-params.service';

@Injectable({ providedIn: 'root' })
export class DownloadInformationService {

  readonly DOWNLOAD_INFORMATION = 'ca/download_sales/';
  subscription: Subscription;

  constructor(
    private downloadInformationStore: DownloadInformationStore,
    private httpClient: HttpClient,
    private setFilterParamsService: SetFilterParamsService
  ) {
  }

  public get(data: DownloadInformation) {
    const url: string = environment.urlApi + this.DOWNLOAD_INFORMATION;
    const params: HttpParams = this.setFilterParamsService.getFilterParams(data);
    this.downloadInformationStore.setLoading(true);

    return this.httpClient.get(url, { params, responseType: 'blob' });
  }

}
