import { Component, OnInit, Input, SimpleChanges, OnChanges, Output, EventEmitter, SimpleChange } from '@angular/core';
import { SeriesHoverEvent } from '@progress/kendo-angular-charts';
import { DecimalPipe } from '@angular/common';

import { process } from '@progress/kendo-data-query';
import { PriceSensitivityTimeSeries, PriceSensitivityTimeSeriesExcel } from '../../state/priceSensitivityTimeSeries';
import { UtilitiesService } from 'src/app/modules/shared/services/utilities/utilities.service';
import { Pinned, InitialPinned } from 'src/app/state/pinned';
import { FilterSelection } from 'src/app/modules/shared/components/bar-filters/state';

@Component({
  selector: 'cvn-price-sensitivity-time-series',
  templateUrl: './price-sensitivity-time-series.component.html',
  styleUrls: ['./price-sensitivity-time-series.component.scss']
})
export class PriceSensitivityTimeSeriesComponent implements OnInit, OnChanges {

  @Input() graphData: PriceSensitivityTimeSeries;
  @Input() isLoading: boolean;
  @Input() title: string;
  @Input() id: string;
  @Input() pinned: Pinned;
  @Input() filters: FilterSelection;
  @Output() changePinState: EventEmitter<InitialPinned> = new EventEmitter();
  public hasResults: boolean;
  public isPinned: boolean;
  public elasticityValue: number;
  public currentDataTooltip: { value: string };
  public rangeValuesAxisX: number;
  public positionLastAxis: number;
  public graphDataExcel;
  public group;

  constructor(
    private decimalPipe: DecimalPipe,
    private utilitiesService: UtilitiesService
  ) {
    this.currentDataTooltip = { value: ''};
    this.group = [{ field: 'name' }];
  }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) {

    const currentGraphData: SimpleChange = changes.graphData;
    if (currentGraphData) {
      if (currentGraphData.currentValue) {
        this.getHasResult();
        this.setConfigGraph();
        this.getGraphDataExcel();
      } else
        this.initializeDataGraph();
    } else
      this.getHasResult();

    const currentPinned: SimpleChange = changes.pinned;
    if (currentPinned) {
      if (currentPinned.currentValue) {
        const pinned = JSON.parse(currentPinned.currentValue.filters) || {};
        this.isPinned = pinned[this.id] ? true : false;
      }
    }
  }

  public toggleFixPinGraphic(): void {
    this.changePinState.emit({ id: this.id, isPinned: this.isPinned });
    this.getHasResult();
  }

  public shouldGetPinned(pinned: any): boolean {
    return this.isPinned && JSON.stringify(pinned[this.id]) !== JSON.stringify(this.filters);
  }

  public setConfigGraph(): void {
    this.elasticityValue = this.graphData.elasticity;
    this.rangeValuesAxisX = this.utilitiesService.getRangeValuesAxisTimeSeries(this.graphData.time_series.length);
    this.positionLastAxis = (this.rangeValuesAxisX * 20 > 1000) ? this.rangeValuesAxisX * 20 : 1000;
  }

  public getHasResult(): void {
    if (!this.graphData) this.initializeDataGraph();
    this.graphData.time_series = this.graphData.time_series || [];
    this.hasResults = (this.graphData.time_series.length === 0) ? false : true;
  }

  public getGraphDataExcel(): void {
    if (this.hasResults) {
      const result: PriceSensitivityTimeSeriesExcel[] = [];
      this.graphData.data.forEach(it => {
        it.data.forEach((val, index) => {
          result.push({ name: it.name || '', value: val, date: this.graphData.time_series[index] });
        });
      });
      this.graphDataExcel = process(result, { group: this.group }).data;
    }
  }

  public initializeDataGraph(): void {
    const initialValue: PriceSensitivityTimeSeries = {
      categories: [],
      elasticity: null,
      time_series: [],
      data: [],
      axis: []
    };
    this.graphData = initialValue;
  }

  public get showNoResultsMessage(): boolean {
    return !this.hasResults && !this.isLoading;
  }

  public onSeriesHover(e: SeriesHoverEvent): void {
    const axis = e.series.name;
    let value: string;
    let formatValue: string;

    if (axis === 'Ventas') {
      formatValue = '1.0-0';
      value = this.decimalPipe.transform(e.dataItem, formatValue);
      this.currentDataTooltip.value = `${value} unidades`;
    } else if (axis === 'Precio Promedio') {
      formatValue = '1.0-3';
      value = this.decimalPipe.transform(e.dataItem, formatValue);
      this.currentDataTooltip.value = `$${value}`;
    }
  }

}
