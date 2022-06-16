import { Component, OnInit, ViewChild, TemplateRef, OnDestroy } from '@angular/core';
import { Data, Router } from '@angular/router';
import { Observable, Subscription, of } from 'rxjs';
import { Enumerable } from 'linq-es2015';

import { filterRoutesWithPrefix } from '../../core/shared';
import { DataRoute } from '../../core/utils/DataRoute';
import { HeaderServices } from '../../core/services/header-service/header.services';
import { Inventory, InventoryQuery, InventoryService } from '../state/inventory';
import { VsComparationTimeSeriesQuery, VsComparationTimeSeriesService, VsComparationTimeSeries } from '../state/vsComparationTimeSeries';
import { FilterSelection, PeriodicitySelected, FilterSelectionQuery } from 'src/app/modules/shared/components/bar-filters/state';
import { InventoryDaysByClient, InventoryDaysByClientQuery, InventoryDaysByClientService } from '../state/inventoryDaysByClient';
import { InventoryDaysByCategory, InventoryDaysByCategoryQuery, InventoryDaysByCategoryService } from '../state/inventoryDaysByCategory';
import { InventoryDaysByPointsSale, InventoryDaysByPointsSaleQuery, InventoryDaysByPointsSaleService } from '../state/inventoryDaysByPointsSale';
import {
  Notification,
  NotificationService as NotificationInsightsService,
  NotificationQuery as NotificationInsightsQuery
} from 'src/app/state/notification';
import { BarFiltersComponent } from '../../shared/components/bar-filters/bar-filters.component';
import { Pinned, InitialPinned, PinnedQuery, PinnedService } from 'src/app/state/pinned';
import { UtilitiesService } from '../../shared/services/utilities/utilities.service';
import { PermissionsChartService } from 'src/app/services/permissions-charts/permissions-charts.service';
@Component({
  selector: 'cvn-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit, OnDestroy {
  public inventoryData$: Observable<Inventory>;
  public loadingInventoryData$: Observable<boolean>;

  public inventoryDaysByClient$: Observable<InventoryDaysByClient[]>;
  public loadingInventoryDaysByClient$: Observable<boolean>;

  public inventoryDaysByCategory$: Observable<InventoryDaysByCategory[]>;
  public loadingInventoryDaysByCategory$: Observable<boolean>;

  public inventoryDaysByPointsSale$: Observable<InventoryDaysByPointsSale[]>;
  public loadingInventoryDaysByPointsSale$: Observable<boolean>;

  public salesVsDaysInventory$: Observable<VsComparationTimeSeries>;
  public loadingSalesVsDaysInventory$: Observable<boolean>;

  public pinned: Pinned | any;
  public pinned$: Observable<Pinned>;
  public notifications$: Observable<Notification[]>;
  public filters$: Observable<FilterSelection>;
  public currentFilters: FilterSelection;

  public currentPeriodicitySelected: PeriodicitySelected;
  public routes: Enumerable<DataRoute<Data>>;
  public subscription: Subscription;
  public isLoadingAll$: Observable<boolean>;
  public nameSubModule = 'inventory';
  @ViewChild('notificatrionReplenishment', { read: TemplateRef })
  @ViewChild('filterBar') public filterBar: BarFiltersComponent;

  constructor(
    router: Router,
    private headerServices: HeaderServices,
    private utilitiesService: UtilitiesService,
    private inventoryQuery: InventoryQuery,
    private inventoryService: InventoryService,
    private filterSelectionQuery: FilterSelectionQuery,
    private vsComparationTimeSeriesQuery: VsComparationTimeSeriesQuery,
    private vsComparationTimeSeriesService: VsComparationTimeSeriesService,
    private inventoryDaysByClientQuery: InventoryDaysByClientQuery,
    private inventoryDaysByClientService: InventoryDaysByClientService,
    private inventoryDaysByCategoryQuery: InventoryDaysByCategoryQuery,
    private inventoryDaysByCategoryService: InventoryDaysByCategoryService,
    private inventoryDaysByPointsSaleQuery: InventoryDaysByPointsSaleQuery,
    private inventoryDaysByPointsSaleService: InventoryDaysByPointsSaleService,
    private notificationInsightsService: NotificationInsightsService,
    private notificationInsightsQuery: NotificationInsightsQuery,
    private pinnedQuery: PinnedQuery,
    private pinnedService: PinnedService,
    private permissionsChartService: PermissionsChartService

  ) {
    this.routes = filterRoutesWithPrefix(router, '');
  }

  ngOnInit(): void {
    this.headerServices.setModel('assets/images/icon/promociones-icon.png', 'LOGYCA / ANALÍTICA', true);
    this.getNotificationsInsights('inventory');
    this.getFilters();
    this.getPinned();
  }

  ngOnDestroy(): void {
    this.unsubscribeAll();
  }

  public getFilters(): void {
    this.filters$ = this.filterSelectionQuery.get();
  }

  public getPinned(): void {
    this.pinned$ = this.pinnedQuery.get();
    this.pinned$.subscribe((res: Pinned) => {
      if (res)
        this.pinned = JSON.parse(res.filters) || {};
    });
  }

  public async getAllDataGraphs() {
    this.unsubscribeAll();
    this.getCurrentFilters();
    this.setPeriodicitySelected();
    this.addCurrentRangeDateToPinned();

    this.currentFilters.id_filter = await this.getIdForCache(this.currentFilters, 'isLoadingAll$');

    this.getInventoryData();
    this.getInventoryDaysByClient();
    this.getInventoryDaysByCategory();
    this.getInventoryDaysByPointsSale();
    this.getSalesvsDaysInventoryByTimeSeries();
  }

  public async getDataGraphsByTimeSeries() {
    this.unsubscribeByTimeSeries();
    this.getCurrentFilters();
    this.setPeriodicitySelected();
    this.addCurrentRangeDateToPinned();

    this.currentFilters.id_filter = await this.getIdForCache(this.currentFilters, 'isLoadingAll$');

    this.getSalesvsDaysInventoryByTimeSeries();
  }

  public unsubscribeAll(): void {
    if (this.subscription) this.subscription.unsubscribe();
    this.inventoryService.unsubscribeGetInventory();
    this.inventoryDaysByClientService.unsubscribeGetInventoryDaysByClient();
    this.inventoryDaysByCategoryService.unsubscribeGetInventoryDaysByCategory();
    this.inventoryDaysByPointsSaleService.unsubscribeGetInventoryDaysByPointsSale();
    this.vsComparationTimeSeriesService.unsubscribeGetInventoryDaysVsSales();
  }

  public unsubscribeByTimeSeries(): void {
    if (this.subscription) this.subscription.unsubscribe();
    this.vsComparationTimeSeriesService.unsubscribeGetInventoryDaysVsSales();
  }

  public getCurrentFilters(): void {
    this.currentFilters = this.filterBar.getParamsForFiltersSelected();
  }

  public setPeriodicitySelected(): void {
    this.currentPeriodicitySelected = this.currentFilters.period;
  }

  public addCurrentRangeDateToPinned(): void {
    if (this.pinned) {
      Object.keys(this.pinned).forEach(key => {
        this.pinned[key].start_date = this.currentFilters.start_date;
        this.pinned[key].end_date = this.currentFilters.end_date;
      });
    } else this.pinned = {};
  }

  public getInventoryData(): void {
    const date = this.currentFilters;
    this.inventoryService.get(date);
    this.inventoryData$ = this.inventoryQuery.selectEntity(`inventory${date.start_date}${date.end_date}`);
    this.loadingInventoryData$ = this.inventoryQuery.selectLoading();
  }

  public async getInventoryDaysByClient() {
    if(this.permissionsChartService.getDataCharts(this.nameSubModule,'inventory-days-by-client') == true){
      await this.getIdForCachePinned('inventory-days-by-client', 'loadingInventoryDaysByClient$');
      const date = this.pinned['inventory-days-by-client'] || this.currentFilters;
      if (!date.id_filter) date.id_filter = await this.getIdForCache(date, 'loadingInventoryDaysByClient$');

      this.inventoryDaysByClientService.get(date);
      this.inventoryDaysByClient$ = this.inventoryDaysByClientQuery.get(date);
      this.loadingInventoryDaysByClient$ = this.inventoryDaysByClientQuery.selectLoading();
    }
  }

  public async getInventoryDaysByCategory() {
    if(this.permissionsChartService.getDataCharts(this.nameSubModule,'inventory-days-by-category') == true){
      await this.getIdForCachePinned('inventory-days-by-category', 'loadingInventoryDaysByCategory$');
      const date = this.pinned['inventory-days-by-category'] || this.currentFilters;
      if (!date.id_filter) date.id_filter = await this.getIdForCache(date, 'loadingInventoryDaysByCategory$');

      this.inventoryDaysByCategoryService.get(date);
      this.inventoryDaysByCategory$ = this.inventoryDaysByCategoryQuery.get(date);
      this.loadingInventoryDaysByCategory$ = this.inventoryDaysByCategoryQuery.selectLoading();
    }
  }

  public async getInventoryDaysByPointsSale() {
    if(this.permissionsChartService.getDataCharts(this.nameSubModule,'inventory-days-by-pointssale') == true){
      await this.getIdForCachePinned('inventory-days-by-pointssale', 'loadingInventoryDaysByPointsSale$');
      const date = this.pinned['inventory-days-by-pointssale'] || this.currentFilters;
      if (!date.id_filter) date.id_filter = await this.getIdForCache(date, 'loadingInventoryDaysByPointsSale$');

      this.inventoryDaysByPointsSaleService.get(date);
      this.inventoryDaysByPointsSale$ = this.inventoryDaysByPointsSaleQuery.get(date);
      this.loadingInventoryDaysByPointsSale$ = this.inventoryDaysByPointsSaleQuery.selectLoading();
    }
  }

  public async getSalesvsDaysInventoryByTimeSeries() {
    if(this.permissionsChartService.getDataCharts(this.nameSubModule,'inventory-days-vs-sales') == true){
      await this.getIdForCachePinned('inventory-days-vs-sales', 'loadingSalesVsDaysInventory$');
      const date = this.pinned['inventory-days-vs-sales'] || this.currentFilters;
      if (!date.id_filter) date.id_filter = await this.getIdForCache(date, 'loadingSalesVsDaysInventory$');

      this.vsComparationTimeSeriesService.get(date);
      this.salesVsDaysInventory$ = this.vsComparationTimeSeriesQuery.get(date);
      this.loadingSalesVsDaysInventory$ = this.vsComparationTimeSeriesQuery.selectLoading();
    }
  }

  public getIdForCache(date: FilterSelection, loading: string): Promise<number> {
    this[loading] = of(true);
    return new Promise((resolve, reject) => {
      this.subscription = this.utilitiesService.getIdForCache(date)
        .subscribe(res => {
          this[loading] = of(false);
          resolve(res.id_filter);
        }, error => {
          this[loading] = of(false);
          reject(null);
        });
    });
  }

  public async getIdForCachePinned(namePinned: string, loading: string) {
    if (this.pinned[namePinned]) {
      if (!this.pinned[namePinned].id_filter)
        this.pinned[namePinned].id_filter = await this.getIdForCache(this.pinned[namePinned], loading);
    }
  }

  public getNotificationsInsights(context: string): void {
    this.notifications$ = this.notificationInsightsQuery.get();
    this.notificationInsightsService.getNotifications(context);
  }

  public changePinState(data: InitialPinned): void {
    const currentFiltersSelected = this.filterBar.getParamsForFiltersSelected();
    if (data.isPinned)
      delete this.pinned[data.id];
    else {
      delete currentFiltersSelected.start_date;
      delete currentFiltersSelected.end_date;
      this.pinned[data.id] = currentFiltersSelected;
    }
    this.pinnedService.pinnedData(JSON.stringify(this.pinned));

    if (data.isPinned) {
      if (data.id === 'inventory-days-by-client')
        this.getInventoryDaysByClient();
      if (data.id === 'inventory-days-by-category')
        this.getInventoryDaysByCategory();
      if (data.id === 'inventory-days-by-pointssale')
        this.getInventoryDaysByPointsSale();
      if (data.id === 'inventory-days-vs-sales')
        this.getSalesvsDaysInventoryByTimeSeries();
    }
  }

}
