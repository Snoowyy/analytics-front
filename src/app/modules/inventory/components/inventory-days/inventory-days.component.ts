import { Component, OnInit, Input, SimpleChanges, OnChanges, Output, EventEmitter, SimpleChange } from '@angular/core';

import { process } from '@progress/kendo-data-query';
import { InventoryDaysByClient } from '../../state/inventoryDaysByClient';
import { InventoryDaysByCategory } from '../../state/inventoryDaysByCategory';
import { GraphConfig, graphConfig } from 'src/app/modules/shared/config';
import { Pinned, InitialPinned } from 'src/app/state/pinned';
import { FilterSelection } from 'src/app/modules/shared/components/bar-filters/state';

@Component({
  selector: 'cvn-inventory-days',
  templateUrl: './inventory-days.component.html',
  styleUrls: ['./inventory-days.component.scss']
})
export class InventoryDaysComponent implements OnInit, OnChanges {

  @Input() graphData: InventoryDaysByClient[] | InventoryDaysByCategory[];
  @Input() title: string;
  @Input() isLoading: boolean;
  @Input() isHeightAuto: boolean;
  @Input() id: string;
  @Input() pinned: Pinned;
  @Input() filters: FilterSelection;
  @Output() changePinState: EventEmitter<InitialPinned> = new EventEmitter();
  public hasResults: boolean;
  public currentSeriesInHover: string;
  public graphDataColor: string;
  public graphConfig: GraphConfig;
  public isPinned: boolean;
  public graphDataExcel;

  constructor() {
    this.graphDataColor = '#F39C12';
    this.graphConfig = graphConfig;
  }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges): void {

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
    this.hasResults = (this.graphData.length === 0) ? false : true;
  }

  public getGraphDataExcel(): void {
    if (this.hasResults) this.graphDataExcel = process(this.graphData, {}).data;
  }
  
  public initializeDataGraph(): void {
    this.graphData = [];
  }

  public get showNoResultsMessage(): boolean {
    return !this.hasResults && !this.isLoading;
  }

}
