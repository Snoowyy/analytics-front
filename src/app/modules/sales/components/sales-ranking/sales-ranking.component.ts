import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter, SimpleChange } from '@angular/core';

import { process } from '@progress/kendo-data-query';
import { SeriesHoverEvent } from '@progress/kendo-angular-charts';
import { SalesRanking } from '../../state/salesRanking';
import { GraphConfig, graphConfig } from 'src/app/modules/shared/config';
import { Pinned, InitialPinned } from 'src/app/state/pinned';
import { FilterSelection } from 'src/app/modules/shared/components/bar-filters/state';

@Component({
  selector: 'cvn-sales-ranking',
  templateUrl: './sales-ranking.component.html',
  styleUrls: ['./sales-ranking.component.scss']
})
export class SalesRankingComponent implements OnInit, OnChanges {

  @Input() graphData: SalesRanking;
  @Input() isLoading: boolean;
  @Input() title: string;
  @Input() id: string;
  @Input() pinned: Pinned;
  @Input() filters: FilterSelection;
  @Output() changePinState: EventEmitter<InitialPinned> = new EventEmitter();
  public hasResults: boolean;
  public graphDataColor: string;
  public currentSeriesInHover: string;
  public graphConfig: GraphConfig;
  public isPinned: boolean;
  public graphDataExcel;

  constructor() {
    this.graphDataColor = '#F4D03F';
    this.graphConfig = graphConfig;
  }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) {

    const currentGraphData: SimpleChange = changes.graphData;
    if (currentGraphData) {
      if (currentGraphData.currentValue) {
        this.getHasResult();
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

  public getHasResult(): void {
    if (!this.graphData) this.initializeDataGraph();
    this.hasResults = (this.graphData.sales.length === 0) ? false : true;
  }

  public getGraphDataExcel(): void {
    if (this.hasResults) this.graphDataExcel = process(this.graphData.sales, {}).data;
  }

  public initializeDataGraph(): void {
    const initialValue: SalesRanking = {
      name: '',
      sales: []
    };
    this.graphData = initialValue;
  }

  public onSeriesHover(e: SeriesHoverEvent): void {
    this.currentSeriesInHover = this.getLongNameOfItem(e.category);
  }

  public getLongNameOfItem(shortName: string): string {
    const result = this.graphData.sales.find(item => item.shortName === shortName);
    return result.name;
  }

  public get showNoResultsMessage(): boolean {
    return !this.hasResults && !this.isLoading;
  }

}
