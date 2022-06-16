import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter, SimpleChange } from '@angular/core';

import { SeriesClickEvent } from '@progress/kendo-angular-charts';
import { process } from '@progress/kendo-data-query';
import { SalesBehavior } from '../../state/salesBehavior';
import { ChangeLevel } from '../../sales.model';
import { graphConfig, GraphConfig } from 'src/app/modules/shared/config';
import { Pinned, InitialPinned } from 'src/app/state/pinned';
import { FilterSelection } from 'src/app/modules/shared/components/bar-filters/state';
@Component({
  selector: 'cvn-sales-behavior',
  templateUrl: './sales-behavior.component.html',
  styleUrls: ['./sales-behavior.component.scss']
})
export class SalesBehaviorComponent implements OnInit, OnChanges {

  @Input() graphData: SalesBehavior[];
  @Input() isLoading: boolean;
  @Input() title: string;
  @Input() id: string;
  @Input() pinned: Pinned;
  @Input() filters: FilterSelection;
  @Output() changePinState: EventEmitter<InitialPinned> = new EventEmitter();
  @Output() changeLevel: EventEmitter<ChangeLevel> = new EventEmitter();
  public hasResults: boolean;
  public currentBusinessLevel: number;
  public filtersBusinessLevel: ChangeLevel;
  public isPinned: boolean;
  public graphConfig: GraphConfig;
  public graphDataExcel: SalesBehavior[];

  constructor() {
    this.currentBusinessLevel = 0;
    this.filtersBusinessLevel = { data: [], type: 'column' };
    this.graphConfig = graphConfig;
  }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) {

    const currentGraphData: SimpleChange = changes.graphData;
    if (currentGraphData) {
      if (currentGraphData.currentValue) {
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

  public shouldGetPinned(pinned: any): boolean {
    return this.isPinned && JSON.stringify(pinned[this.id]) !== JSON.stringify(this.filters);
  }

  public getHasResult(): void {
    if (!this.graphData) this.initializeDataGraph();
    this.hasResults = (this.graphData.length === 0) ? false : true;
  }

  public getGraphDataExcel(): void {
    if (this.hasResults) this.graphDataExcel = process(this.graphData, {}).data;
  }

  public getCurrentBusinessLevel(): void {
    this.currentBusinessLevel = JSON.parse(localStorage.getItem('currentBusinessLevelColumn'));
  }

  public initializeDataGraph(): void {
    const initialValue: SalesBehavior[] = [];
    this.graphData = initialValue;
  }

  public goToPreviousCategoryLevel(): void {
    for (let i = 0; i < this.filtersBusinessLevel.data.length; i++) {
      if (this.filtersBusinessLevel.data[i].level === this.currentBusinessLevel)
        this.filtersBusinessLevel.data.splice(i, 1);
    }
    this.changeLevel.emit(this.filtersBusinessLevel);
  }

  public goToNextCategoryLevel(event: SeriesClickEvent | any): void {
    if (this.isValidLevel(this.currentBusinessLevel)) {
      this.filtersBusinessLevel.data.push({
        name: event.category,
        level: this.currentBusinessLevel + 1
      });
      this.changeLevel.emit(this.filtersBusinessLevel);
    }
  }

  public isValidLevel(level: number): boolean {
    return (level >= 0 && level < 3);
  }

  public get showNoResultsMessage(): boolean {
    return !this.hasResults && !this.isLoading;
  }

}
