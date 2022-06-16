import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import * as models from 'powerbi-models';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-powerbi',
  templateUrl: './powerbi.component.html',
  styleUrls: ['./powerbi.component.scss']
})
export class PowerbiComponent implements OnInit, OnChanges {
  @Input() idGroup: string;
  @Input() idReport: string;
  @Input() filters: FilterSet;
  responsePowerBI: ResponsePowerBI;

  optionsBi: models.ISettings = {
    filterPaneEnabled: false,
    navContentPaneEnabled: true,
  };

  constructor(private http: HttpClient) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.filters) {
      if (changes.filters.currentValue) {
        this.getPowerBI()
          .subscribe(it => {
            this.responsePowerBI = it;
            it.rptUrl = `${it.rptUrl}&filter=${this.getFilters()}`;
          });
      }
    }

  }
  ngOnInit(): void {
  }

  getFilters() {
    const { filters } = this;
    let filterQuery = '';
    for (const [tableK, tableFiltersV] of Object.entries(filters)) {
      for (const [columnK, value] of Object.entries(tableFiltersV)) {
        if (filterQuery) {
          filterQuery += ' and ';
        }
        if (Array.isArray(value)) {
          filterQuery += this.getInValues(tableK, columnK, value);
        } else {
          filterQuery += `(${tableK}/${columnK} eq ${this.getValue(value)})`;
        }
      }
    }
    return filterQuery;
  }

  private getInValues(tableK: string, columnK: string, values: FilterPrimitiveValue[]) {
    let invalues = '';
    for (const value of values) {
      if (invalues) {
        invalues += ', ';
      }
      invalues += `${this.getValue(value)}`;
    }
    if (invalues) {
      return `${tableK}/${columnK} in (${invalues})`;
    }
    return '';
  }

  private getValue(value: FilterPrimitiveValue): string {
    if (typeof(value) === 'string') {
      return `'${value}'`;
    }
    return value.toString();
  }


  private getPowerBI() {
    const { idGroup, idReport } = this;
    const urlPowerBI = `https://${powerBiApiUrl}/User/PowerBI?WorkspaceId=${idGroup}&ReportId=${idReport}`;
    return this.http.get<ResponsePowerBI>(urlPowerBI);
  }
}
interface ResponsePowerBI {
  embedToken: EmbedToken;
  rptUrl: string;
  rptId: string;
}

interface EmbedToken {
  token: string;
  tokenId: string;
  expiration: Date;
}

type FilterPrimitiveValue = string | number;
type FilterValue = FilterPrimitiveValue | FilterPrimitiveValue[];

export interface TableFilters {
  [columnName: string]: FilterValue;
}

export interface FilterSet {
  [tableName: string]: TableFilters;
}

const powerBiApiUrl = 'testpowerbiapi.azurewebsites.net/api';
