import { Component, OnInit, Input, SimpleChanges, OnChanges, Output, EventEmitter, SimpleChange } from '@angular/core';

import { process } from '@progress/kendo-data-query';
import { UtilitiesService } from 'src/app/modules/shared/services/utilities/utilities.service';
import { SalesByTimeSeries, SalesByTimeSeriesExcel } from '../../state/salesByTimeSeries';
import { graphConfig, GraphConfig } from 'src/app/modules/shared/config';
import { Pinned, InitialPinned } from 'src/app/state/pinned';
import { FilterSelection } from 'src/app/modules/shared/components/bar-filters/state';

@Component({
  selector: 'cvn-sales-by-time-series',
  templateUrl: './sales-by-time-series.component.html',
  styleUrls: ['./sales-by-time-series.component.scss']
})
export class SalesByTimeSeriesComponent implements OnInit, OnChanges {

  @Input() graphData: SalesByTimeSeries;
  @Input() isLoading: boolean;
  @Input() title: string;
  @Input() id: string;
  @Input() pinned: Pinned;
  @Input() filters: FilterSelection;
  @Output() changePinState: EventEmitter<InitialPinned> = new EventEmitter();
  public hasResults: boolean;
  public rangeValuesAxisX: number;
  public graphConfig: GraphConfig;
  public isPinned: boolean;
  public graphDataExcel;

  constructor(private utilitiesService: UtilitiesService) {
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
  }

  public getHasResult(): void {
    if (!this.graphData) this.initializeDataGraph();
    this.hasResults = (this.graphData.time_series.length === 0) ? false : true;
  }

  public getGraphDataExcel(): void {
    if (this.hasResults) {
      const result: SalesByTimeSeriesExcel[] = [];
      this.graphData.data.forEach(it => {
        it.sales.forEach((val, index) => {
          result.push({ client: it.client || '', sale: val, date: this.graphData.time_series[index] });
        });
      });
      this.graphDataExcel = process(result, { }).data;
    }
  }

  public initializeDataGraph(): void {
    const initialValue: SalesByTimeSeries = {
      time_series: [],
      data: []
    };
    this.graphData = initialValue;
  }

  public get showNoResultsMessage(): boolean {
    return !this.hasResults && !this.isLoading;
  }

}
