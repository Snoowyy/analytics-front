import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter, SimpleChange } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { process } from '@progress/kendo-data-query';
import { SeriesHoverEvent } from '@progress/kendo-angular-charts';
import { VsComparationTimeSeries } from '../../state/vsComparationTimeSeries';
import { UtilitiesService } from 'src/app/modules/shared/services/utilities/utilities.service';
import { GraphConfig, graphConfig } from 'src/app/modules/shared/config';
import { Pinned, InitialPinned } from 'src/app/state/pinned';
import { FilterSelection } from 'src/app/modules/shared/components/bar-filters/state';

@Component({
  selector: 'cvn-vs-compare-time-series',
  templateUrl: './vs-compare-time-series.component.html',
  styleUrls: ['./vs-compare-time-series.component.scss']
})
export class VsCompareTimeSeriesComponent implements OnInit, OnChanges {

  @Input() graphData: VsComparationTimeSeries;
  @Input() isLoading: boolean;
  @Input() title: string;
  @Input() id: string;
  @Input() pinned: Pinned;
  @Input() filters: FilterSelection;
  @Output() changePinState: EventEmitter<InitialPinned> = new EventEmitter();
  public hasResults: boolean;
  public rangeValuesAxisX: number;
  public positionLastAxis: number;
  public currentDataTooltip: any = {};
  public timeSeries: string[];
  public graphConfig: GraphConfig;
  public isPinned: boolean;
  public graphDataExcel;

  constructor(
    private decimalPipe: DecimalPipe,
    private utilitiesService: UtilitiesService
  ) {
    this.timeSeries = [];
    this.graphConfig = graphConfig;
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
    this.rangeValuesAxisX = this.utilitiesService.getRangeValuesAxisTimeSeries(this.graphData.time_series.length);
    this.positionLastAxis = (this.rangeValuesAxisX * 20 > 1000) ? this.rangeValuesAxisX * 20 : 1000;
  }

  public getHasResult(): void {
    if (!this.graphData) this.initializeDataGraph();
    this.hasResults = (this.graphData.categories.length === 0) ? false : true;
  }

  public getGraphDataExcel(): void {
    // if (this.hasResults) this.graphDataExcel = process(this.graphData, {}).data;
  }

  public initializeDataGraph(): void {
    const initialValue: VsComparationTimeSeries = {
      time_series: [],
      data: [],
      categories: [],
      axis: []
    };
    this.graphData = initialValue;
  }

  public get showNoResultsMessage(): boolean {
    return !this.hasResults && !this.isLoading;
  }

  public onSeriesHover(e: SeriesHoverEvent) {
    const axis = e.series.name;
    let value: string;
    let formatValue: string;
    if (axis === 'Ventas') {
      formatValue = '1.0-3';
      value = this.decimalPipe.transform(e.dataItem, formatValue);
      this.currentDataTooltip.value = `$${value}`;
    } else if (axis === 'Inventarios') {
      formatValue = '1.0-0';
      value = this.decimalPipe.transform(e.dataItem, formatValue);
      this.currentDataTooltip.value = `${value} d??as`;
    }
  }

}
