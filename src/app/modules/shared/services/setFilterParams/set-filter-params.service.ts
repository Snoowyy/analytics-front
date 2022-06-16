import { Injectable } from '@angular/core';
import { FilterSelection } from 'src/app/modules/shared/components/bar-filters/state';
import { HttpParams } from '@angular/common/http';
import { DownloadInformation } from 'src/app/modules/configuration/state/downloadInformation';

@Injectable({
  providedIn: 'root'
})
export class SetFilterParamsService {

  constructor() { }

  getFilterParams(filtersSelected: FilterSelection | DownloadInformation): HttpParams {
    let params = new HttpParams();

    Object.keys(filtersSelected).forEach(key => {
      params = params.append(key, filtersSelected[key]);
    });

    return params;
  }

}
