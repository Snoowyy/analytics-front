import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { FilterSelection } from '../bar-filters/state';

@Component({
  selector: 'cvn-graphic-pin',
  template: `<ng-template #template let-anchor>
                <span *ngIf="!filters">Fijar</span>
                <div class="wrapper" *ngIf="filters">
                  <div>
                    <p>Periodicidad:</p>
                    <ul class="listFilters">
                      <li>
                        {{filters.period | dictionary}}
                      </li>
                    </ul>
                  </div>

                  <div *ngIf="filters.region">
                    <p>Regiones:</p>
                    <ul class="listFilters" >
                      <li *ngFor="let reg of filters.region">
                        {{reg}}
                      </li>
                    </ul>
                  </div>

                  <div *ngIf="filters.glnretailerlocations">
                    <p>Puntos de venta:</p>
                    <ul class="listFilters">
                      <li *ngFor="let ps of filters.glnretailerlocations">
                        {{ps}}
                      </li>
                    </ul>
                  </div>

                  <div *ngIf="filters.gtins">
                    <p>Productos:</p>
                    <ul class="listFilters">
                      <li *ngFor="let prod of filters.gtins">
                        {{prod}}
                      </li>
                    </ul>
                  </div>

                  <div *ngIf="filters.glnretailer">
                    <p>Clientes:</p>
                    <ul class="listFilters">
                      <li *ngFor="let client of filters.glnretailer">
                        {{client}}
                      </li>
                    </ul>
                  </div>

                  <div *ngIf="filters.bussiness_level1 || filters.bussiness_level2 || filters.bussiness_level3 || filters.bussiness_level4">
                    <p>Categorias de producto:</p>
                    <ul class="listFilters">
                      <li *ngIf="filters.bussiness_level1">
                        {{filters.bussiness_level1 | lowercase}}
                      </li>
                      <li *ngIf="filters.bussiness_level2">
                        {{filters.bussiness_level2 | lowercase}}
                      </li>
                      <li *ngIf="filters.bussiness_level3">
                        {{filters.bussiness_level3 | lowercase}}
                      </li>
                      <li *ngIf="filters.bussiness_level4">
                        {{filters.bussiness_level4 | lowercase}}
                      </li>
                    </ul>
                  </div>
                </div>
              </ng-template>

              <button class="btn btn-dark fa fa-thumb-tack"
                kendoTooltip
                position="left"
                [tooltipTemplate]="template" filter="button"
                [ngClass]="{'on': state}"
                aria-hidden="true">
              </button>`,
  styleUrls: ['./graphic-pin.component.scss']
})
export class GraphicPinComponent implements OnInit, OnChanges {

  @Input() state: boolean;
  @Input() pinned: any;
  @Input() id: string;
  public filters: FilterSelection;

  constructor() { }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) {
    const currentPinned: SimpleChange = changes.pinned;
    if (currentPinned) {
      if (currentPinned.currentValue) {
        const pinned = JSON.parse(currentPinned.currentValue.filters) || {};
        this.filters = pinned[this.id];
      }
    }
  }
}
