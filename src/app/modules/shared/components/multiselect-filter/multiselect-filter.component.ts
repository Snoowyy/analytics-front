import { Component, OnInit, ViewChild, ViewEncapsulation, Input, OnChanges, SimpleChanges, Output, EventEmitter, SimpleChange } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { MultiSelectComponent } from '@progress/kendo-angular-dropdowns';
import { groupBy, GroupResult } from '@progress/kendo-data-query';
import { Multiselect } from './state';
import { FilterSelection, OthersFilterSelection, BusinessLevels, RetailerLevels } from '../bar-filters/state';

@Component({
  selector: 'cvn-multiselect-filter',
  template: `
    <kendo-multiselect #multiselect
      [clearButton]="true"
      [disabled]="isLoadingOptions"
      [loading]="isLoadingOptions"
      [data]="groupedOptions"
      [itemDisabled]="optionsDisabled"
      [textField]="'name'"
      [valueField]="'name'"
      [filterable]="true"
      [placeholder]="'Filtre por empresa, categorias punto de venta, punto de venta, categorias producto, productos, ciudades, clientes'"
      [valueNormalizer]="normalizerSelection"
      [autoClose]="false"
      (close)="onClose()"
      (valueChange)="onSelectOption($event)"
      (filterChange)="onChangeInputText($event)">

      <ng-template kendoMultiSelectNoDataTemplate>
        <div class="notfound">
          <span class="fa fa-exclamation"></span><br/>
          <p>no hay resultados</p>
        </div>
      </ng-template>
    </kendo-multiselect>
  `,
  styleUrls: ['./multiselect-filter.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class MultiselectFilterComponent implements OnInit, OnChanges {

  @ViewChild('multiselect') public multiselect: MultiSelectComponent;
  @Input() options: Multiselect[];
  @Output() selectFilter: EventEmitter<FilterSelection> = new EventEmitter();
  public initialGroupedOptions: Multiselect[] = [];
  public groupedOptions: GroupResult[] | Multiselect[] = [];
  public lastSelectedFilters: Multiselect[] = [];
  public selectedFilters: Multiselect[] = [];
  public maxLevelNavigation: number;
  public isLoadingOptions: boolean;
  private limitFilterResults: number;

  constructor() {
    this.maxLevelNavigation = 4;
    this.limitFilterResults = 100;
    this.initialGroupedOptions = [
      { name: 'Empresa', type: 'Criterios' },
      { name: 'Categorias de punto de venta', type: 'Criterios' },
      { name: 'Puntos de venta', type: 'Criterios' },
      { name: 'Categorias de producto', type: 'Criterios' },
      { name: 'Productos', type: 'Criterios' },
      { name: 'Ciudades', type: 'Criterios' },
      { name: 'Clientes', type: 'Criterios' },
    ];
  }

  ngOnInit() {
    this.setIsLoadingOptions();
  }

  ngOnChanges(changes: SimpleChanges) {
    const currentOptions: SimpleChange = changes.options;
    if (currentOptions) {
      if (currentOptions.currentValue) {
        this.options = this.options;
        this.setInitialOptions();
        this.setIsLoadingOptions();
      }
    }
  }

  public setIsLoadingOptions(): void {
    this.isLoadingOptions = this.groupedOptions.length > 0 ? false : true;
  }

  public setInitialOptions(): void {
    this.groupedOptions = groupBy(this.initialGroupedOptions, [{ field: 'type' }]);
  }

  public onChangeInputText(value: string): void {
    this.isLoadingOptions = true;
    if (value === '')
      this.setInitialOptions();
    else if (value) {
      let data: Multiselect[] = [];
      data = this.options.filter((s: Multiselect) => s.name.toLowerCase().indexOf(value.toLowerCase()) !== -1);
      this.groupedOptions = groupBy(data.slice(0, this.limitFilterResults), [{ field: 'type' }]);
    }
    this.isLoadingOptions = false;
  }

  public onSelectOption(value: Multiselect[]): void {
    this.selectedFilters = value;
    if (!this.multiselect.isOpen)
      this.emitSelectedFilters();
  }

  public onClose(): void {
    this.emitSelectedFilters();
  }

  public normalizerSelection(text$: Observable<string>): Observable<Multiselect> {
    return text$.pipe(
      map((userInput: string) => {
        const comparer = (option: Multiselect) => userInput.toLowerCase() === option.name.toLowerCase();
        const matchingValue = this.selectedFilters.find(comparer);

        if (matchingValue) return null;
        const matchingOption = this.options.find(comparer);
        return matchingOption ? matchingOption : { name: userInput, type: 'custom' };
      })
    );
  }

  public optionsDisabled(item): boolean {
    return item.dataItem.type === 'Criterios';
  }

  public emitSelectedFilters(): void {
    if (this.changedSelectedFilters())
      this.selectFilter.emit();
    this.lastSelectedFilters = this.selectedFilters;
  }

  public changedSelectedFilters(): boolean {
    return !(JSON.stringify(this.lastSelectedFilters) === JSON.stringify(this.selectedFilters));
  }

  public convertFiltersToRequestParams(): OthersFilterSelection {
    const {
      bussiness_units,
      glnretailer,
      gtins,
      glnretailerlocations,
      region,
      business_levels,
      retailer_level
    }: OthersFilterSelection = this.getCurrentFilters();

    const requestParams: OthersFilterSelection = {};

    if (bussiness_units.length > 0)
      requestParams.bussiness_units = bussiness_units;
    if (glnretailer.length > 0)
      requestParams.glnretailer = glnretailer;
    if (gtins.length > 0)
      requestParams.gtins = gtins;
    if (glnretailerlocations.length > 0)
      requestParams.glnretailerlocations = glnretailerlocations;
    if (region.length > 0)
      requestParams.region = region;

    for (let i = 1; i <= this.maxLevelNavigation; i++) {
      if (business_levels[`business_level${i}`])
        requestParams[`bussiness_level${i}`] = business_levels[`business_level${i}`];

      if (retailer_level[`retailer-level${i}`])
        requestParams[`retailer-level${i}`] = retailer_level[`retailer-level${i}`];
    }

    return requestParams;
  }

  public getCurrentFilters(): OthersFilterSelection {
    const gtins: number[] = [];
    const glnretailerlocations: number[] = [];
    const glnretailer: number[] = [];
    const region: string[] = [];
    const bussiness_units: number[] = [];
    let business_levels: BusinessLevels = {};
    let retailer_level: RetailerLevels = {};

    this.selectedFilters.forEach((opt: Multiselect) => {

      if (opt.type === 'empresa')
        bussiness_units.push(opt.gln);
      else if (opt.type === 'cliente')
        glnretailer.push(opt.gln);
      else if (opt.type === 'producto')
        gtins.push(opt.gtin);
      else if (opt.type === 'punto de venta')
        glnretailerlocations.push(opt.gln);
      else if (opt.type === 'ciudad')
        region.push(opt.name);
      else if (opt.type === 'categoria de producto')
        business_levels = this.getCategoryLevelsInProduct(opt);
      else if (opt.type === 'categoria de punto de venta')
        retailer_level = this.getCategoryLevelsInPointsSale(opt);
    });

    return {
      bussiness_units,
      glnretailer,
      gtins,
      glnretailerlocations,
      region,
      business_levels,
      retailer_level
    };
  }

  public getCategoryLevelsInProduct(opt: Multiselect): BusinessLevels {
    const result: BusinessLevels = {};

    for (let i = 0; i < opt.levels.length; i++) {
      result[`business_level${i + 1}`] = opt.levels[i];
      if (opt.levels[i] === opt.name) break;
    }
    return result;
  }

  public getCategoryLevelsInPointsSale(opt: Multiselect): RetailerLevels {
    const result: RetailerLevels = {};

    for (let i = 0; i < opt.levels.length; i++) {
      result[`retailer-level${i + 1}`] = opt.levels[i];
      if (opt.levels[i] === opt.name) break;
    }
    return result;
  }

}
