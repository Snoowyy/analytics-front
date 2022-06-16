import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter, SimpleChange } from '@angular/core';

import { SeriesClickEvent, SeriesHoverEvent } from '@progress/kendo-angular-charts';
import { process } from '@progress/kendo-data-query';
import { SalesByClient } from '../../state/salesByClient';
import { SalesByCategory } from '../../state/salesByCategory';
import { ChangeLevel } from '../../sales.model';
import { InitialPinned, Pinned } from 'src/app/state/pinned';
import { FilterSelection } from 'src/app/modules/shared/components/bar-filters/state';

@Component({
  selector: 'cvn-sales-by',
  templateUrl: './sales-by.component.html',
  styleUrls: ['./sales-by.component.scss']
})
export class SalesByComponent implements OnInit, OnChanges {

  @Input() graphData: Array<SalesByClient[] | SalesByCategory[]>;
  @Input() isLoading: boolean;
  @Input() title: string;
  @Input() id: string;
  @Input() pinned: Pinned;
  @Input() filters: FilterSelection;
  @Output() changePinState: EventEmitter<InitialPinned> = new EventEmitter();
  @Output() changeLevel: EventEmitter<ChangeLevel> = new EventEmitter();
  public graphDataClone;
  public hasResults: boolean;
  public currentBusinessLevel: number;
  public currentGraphdataLevel: number;
  public currentItemPercent: number;
  public filtersBusinessLevel: ChangeLevel;
  public isPinned: boolean;
  public graphDataExcel: SalesByClient[] | SalesByCategory[];

  constructor() {
    this.currentBusinessLevel = 0;
    this.currentGraphdataLevel = 0;
    this.filtersBusinessLevel = { data: [], type: 'donnut' };
  }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges): void {

    const currentGraphData: SimpleChange = changes.graphData;
    if (currentGraphData) {
      if (currentGraphData.currentValue) {
        this.setGraphData(currentGraphData.currentValue);
        this.getCurrentBusinessLevel();
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

  public getHasResult(): void {
    if (!this.graphData) this.initializeDataGraph();
    this.hasResults = (this.graphData.length === 0) ? false : true;
  }

  public getGraphDataExcel(): void {
    if (this.hasResults) this.graphDataExcel = process(this.graphData, {}).data;
  }

  public getCurrentBusinessLevel(): void {
    this.currentBusinessLevel = JSON.parse(localStorage.getItem('currentBusinessLevelDonnut'));
  }

  public initializeDataGraph(): void {
    const initialValue: Array<SalesByClient[] | SalesByCategory[]> = [];
    this.graphData = initialValue;
  }

  public setGraphData(data: Array<SalesByClient[] | SalesByCategory[]>): void {
    this.graphDataClone = data.slice(0);
    this.graphData = this.graphDataClone[this.currentGraphdataLevel];
  }

  public onSeriesClick(event: SeriesClickEvent | any): void {
    if (event.category === 'Otros')
      this.goToNextGraphdataLevel();
    else
      this.goToNextCategoryLevel(event.category);
  }

  public goToNextGraphdataLevel(): void {
    this.graphData = this.graphDataClone[++this.currentGraphdataLevel];
  }

  public goToPreviousGraphdataLevel() {
    this.graphData = this.graphDataClone[--this.currentGraphdataLevel];
  }

  public goToNextCategoryLevel(category: string): void {
    if (this.isValidLevel(this.currentBusinessLevel)) {
      this.filtersBusinessLevel.data.push({
        name: category,
        level: this.currentBusinessLevel + 1
      });
      this.changeLevel.emit(this.filtersBusinessLevel);
    }
  }

  public goToPreviousCategoryLevel(): void {
    for (let i = 0; i < this.filtersBusinessLevel.data.length; i++) {
      if (this.filtersBusinessLevel.data[i].level === this.currentBusinessLevel)
        this.filtersBusinessLevel.data.splice(i, 1);
    }
    this.changeLevel.emit(this.filtersBusinessLevel);
  }

  public isValidLevel(level: number): boolean {
    return (level >= 0 && level < 3);
  }

  public labelContent(e: any): string {
    return `${e.category}: \n ${e.value}`;
  }

  public get showNoResultsMessage(): boolean {
    return !this.hasResults && !this.isLoading;
  }

  public onSeriesHover(e: SeriesHoverEvent): void {
    this.currentItemPercent = e.percentage * 100;
  }

}
