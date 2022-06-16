import { Component, OnInit, Input, SimpleChanges, OnChanges, Output, EventEmitter, SimpleChange } from '@angular/core';

import { process } from '@progress/kendo-data-query';
import { SalesBehaviorByTimeSeries } from '../../state/salesBehaviorByTimeSeries';
import { UtilitiesService } from 'src/app/modules/shared/services/utilities/utilities.service';
import { GraphConfig, graphConfig } from 'src/app/modules/shared/config';
import { Pinned, InitialPinned } from 'src/app/state/pinned';
import { FilterSelection } from 'src/app/modules/shared/components/bar-filters/state';

@Component({
  selector: 'cvn-sales-behavior-time-series',
  templateUrl: './sales-behavior-time-series.component.html',
  styleUrls: ['./sales-behavior-time-series.component.scss']
})
export class SalesBehaviorTimeSeriesComponent implements OnInit, OnChanges {

  @Input() graphData: SalesBehaviorByTimeSeries[];
  @Input() isLoading: boolean;
  @Input() title: string;
  @Input() id: string;
  @Input() pinned: Pinned;
  @Input() filters: FilterSelection;
  @Output() changePinState: EventEmitter<InitialPinned> = new EventEmitter();
  public conventions: { name: string, img: string }[];
  public hasResults: boolean;
  public rangeValuesAxisX: number;
  public graphConfig: GraphConfig;
  public isPinned: boolean;
  public graphDataExcel;

  constructor(private utilitiesService: UtilitiesService) {
    this.graphConfig = graphConfig;
    this.conventions = [
      { name: 'Outlayers Atipicos', img: 'outlayers-atipicos-icon.png' },
      { name: 'Outlayers Normales', img: 'outlayers-normales-icon.png' },
      { name: 'Valor Máximo', img: 'valor-maximo-icon.png' },
      { name: 'Valor Mínimo', img: 'valor-minimo-icon.png' },
      { name: 'Promedio', img: 'promedio-icon.png' },
      { name: 'Mediana', img: 'mediana-icon.png' }
    ];
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
    this.rangeValuesAxisX = this.utilitiesService.getRangeValuesAxisTimeSeries(this.graphData.length);
  }

  public getHasResult(): void {
    if (!this.graphData) this.initializeDataGraph();
    this.hasResults = (this.graphData.length === 0) ? false : true;
  }

  public getGraphDataExcel(): void {
    if (this.hasResults) this.graphDataExcel = process(this.graphData, {}).data;
  }

  public initializeDataGraph(): void {
    const initialValue: SalesBehaviorByTimeSeries[] = [];
    this.graphData = initialValue;
  }

  public get showNoResultsMessage(): boolean {
    return !this.hasResults && !this.isLoading;
  }

}
