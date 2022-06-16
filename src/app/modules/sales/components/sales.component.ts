import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router, Data } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';

import { Enumerable } from 'linq-es2015';
import { filterRoutesWithPrefix } from 'src/app/modules/core/shared';
import { DataRoute } from 'src/app/modules/core/utils/DataRoute';
import { HeaderServices } from 'src/app/modules/core/services/header-service/header.services';
import { TotalSale, TotalSalesQuery, TotalSalesService } from './total-sales/state';
import { SalesByClient, SalesByClientService, SalesByClientQuery } from '../state/salesByClient';
import { SalesByCategory, SalesByCategoryQuery, SalesByCategoryService } from '../state/salesByCategory';
import { SalesRanking, SalesRankingQuery, SalesRankingService } from '../state/salesRanking';
import { SalesByTimeSeries, SalesByTimeSeriesQuery, SalesByTimeSeriesService } from '../state/salesByTimeSeries';
import { SalesBehavior, SalesBehaviorQuery, SalesBehaviorService } from '../state/salesBehavior';
import { SalesBehaviorByTimeSeriesQuery, SalesBehaviorByTimeSeriesService, SalesBehaviorByTimeSeries } from '../state/salesBehaviorByTimeSeries';
import { PriceSensitivityTimeSeriesQuery, PriceSensitivityTimeSeriesService, PriceSensitivityTimeSeries } from '../state/priceSensitivityTimeSeries';
import { PeriodicitySelected, FilterSelection, FilterSelectionQuery } from 'src/app/modules/shared/components/bar-filters/state';
import {
  Notification,
  NotificationService as NotificationInsightsService,
  NotificationQuery as NotificationInsightsQuery
} from 'src/app/state/notification';
import { BarFiltersComponent } from 'src/app/modules/shared/components/bar-filters/bar-filters.component';
import { ChangeLevel } from '../sales.model';
import { RankingPointsSaleQuery, RankingPointsSaleService } from '../state/rankingPointsSale';
import { InitialPinned, Pinned, PinnedQuery, PinnedService } from 'src/app/state/pinned';
import { UtilitiesService } from '../../shared/services/utilities/utilities.service';
import { PermissionsChartService } from 'src/app/services/permissions-charts/permissions-charts.service';
@Component({
  selector: 'cvn-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit, OnDestroy {

  public totalSales$: Observable<TotalSale>;
  public loadingTotalSales$: Observable<boolean>;

  public salesByClient$: Observable<SalesByClient[]>;
  public loadingSalesByClient$: Observable<boolean>;

  public salesByCategory$: Observable<SalesByCategory[]>;
  public loadingSalesByCategory$: Observable<boolean>;

  public salesRanking$: Observable<SalesRanking>;
  public loadingSalesRanking$: Observable<boolean>;

  public rankingPointsSale$: Observable<SalesRanking>;
  public loadingRankingPointsSale$: Observable<boolean>;

  public salesByTimeSeries$: Observable<SalesByTimeSeries>;
  public loadingSalesByTimeSeries$: Observable<boolean>;

  public salesBehavior$: Observable<SalesBehavior>;
  public loadingSalesBehavior$: Observable<boolean>;

  public salesBehaviorByTimeSeries$: Observable<SalesBehaviorByTimeSeries[]>;
  public loadingSalesBehaviorByTimeSeries$: Observable<boolean>;

  public priceSensitivityTimeSeries$: Observable<PriceSensitivityTimeSeries>;
  public loadingPriceSensitivityTimeSeries$: Observable<boolean>;

  public pinned: Pinned | any;
  public pinned$: Observable<Pinned>;
  public notifications$: Observable<Notification[]>;
  public filters$: Observable<FilterSelection>;
  public currentFilters: FilterSelection;

  public currentPeriodicitySelected: PeriodicitySelected;
  public routes: Enumerable<DataRoute<Data>>;
  public subscription: Subscription;
  public isLoadingAll$: Observable<boolean>;
  public nameSubModule = 'sales';
  @ViewChild('filterBar') public filterBar: BarFiltersComponent;

  constructor(
    router: Router,
    private headerServices: HeaderServices,
    private utilitiesService: UtilitiesService,
    private filterSelectionQuery: FilterSelectionQuery,
    private totalSalesQuery: TotalSalesQuery,
    private totalSalesService: TotalSalesService,
    private salesByClientService: SalesByClientService,
    private salesByClientQuery: SalesByClientQuery,
    private salesByCategoryQuery: SalesByCategoryQuery,
    private salesByCategoryService: SalesByCategoryService,
    private salesRankingQuery: SalesRankingQuery,
    private salesRankingService: SalesRankingService,
    private rankingPointsSaleQuery: RankingPointsSaleQuery,
    private rankingPointsSaleService: RankingPointsSaleService,
    private salesByTimeSeriesQuery: SalesByTimeSeriesQuery,
    private salesByTimeSeriesService: SalesByTimeSeriesService,
    private salesBehaviorQuery: SalesBehaviorQuery,
    private salesBehaviorService: SalesBehaviorService,
    private salesBehaviorByTimeSeriesQuery: SalesBehaviorByTimeSeriesQuery,
    private salesBehaviorByTimeSeriesService: SalesBehaviorByTimeSeriesService,
    private priceSensitivityTimeSeriesQuery: PriceSensitivityTimeSeriesQuery,
    private priceSensitivityTimeSeriesService: PriceSensitivityTimeSeriesService,
    private notificationInsightsService: NotificationInsightsService,
    private notificationInsightsQuery: NotificationInsightsQuery,
    private pinnedQuery: PinnedQuery,
    private pinnedService: PinnedService,
    private permissionsChartService: PermissionsChartService
  ) {
    this.routes = filterRoutesWithPrefix(router, '');
  }º

  ngOnInit(): void {
    this.headerServices.setModel('assets/images/icon/promociones-icon.png', 'LOGYCA / ANALÍTICA', true);
    this.getNotificationsInsights('sales');
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

    this.getTotalSales();
    this.getSalesByClient();
    this.getSalesByCategory();
    this.getSalesByTimeSeries();
    this.getSalesBehaviorByCategory();
    this.getRankingPointsSale();
    this.getSalesRanking();
    this.getPriceSensitivityByTimeSeries();
  }

  public async getDataGraphsByTimeSeries() {
    this.unsubscribeByTimeSeries();
    this.getCurrentFilters();
    this.setPeriodicitySelected();
    this.addCurrentRangeDateToPinned();

    this.currentFilters.id_filter = await this.getIdForCache(this.currentFilters, 'isLoadingAll$');

    this.getSalesByTimeSeries();
    this.getPriceSensitivityByTimeSeries();
  }

  public unsubscribeAll(): void {
    if (this.subscription) this.subscription.unsubscribe();
    this.totalSalesService.unsubscribeGetTotalSales();
    this.salesByClientService.unsubscribeGetSalesByClient();
    this.salesByCategoryService.unsubscribeGetSalesByCategory();
    this.salesByTimeSeriesService.unsubscribeGetSalesByTimeSeries();
    this.salesBehaviorService.unsubscribeGetSalesBehavior();
    this.rankingPointsSaleService.unsubscribeGetRankingPointsSale();
    this.salesRankingService.unsubscribeGetProductSalesRanking();
    this.priceSensitivityTimeSeriesService.unsubscribeGetPriceSencitivity();
  }

  public unsubscribeByTimeSeries(): void {
    if (this.subscription) this.subscription.unsubscribe();
    this.salesByTimeSeriesService.unsubscribeGetSalesByTimeSeries();
    this.priceSensitivityTimeSeriesService.unsubscribeGetPriceSencitivity();
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

  public getTotalSales(): void {
    if(this.permissionsChartService.getDataCharts(this.nameSubModule,'total-sales') == true){
      const date = this.currentFilters;
      this.totalSalesService.getTotalSales(date);
      this.totalSales$ = this.totalSalesQuery.selectEntity(`totalSales${date.start_date}${date.end_date}`);
      this.loadingTotalSales$ = this.totalSalesQuery.selectLoading();
    }
  }

  public async getSalesByClient() {

    if(this.permissionsChartService.getDataCharts(this.nameSubModule,'sales-by-client') == true){

        await this.getIdForCachePinned('sales-by-client', 'loadingSalesByClient$');
        const date = this.pinned['sales-by-client'] || this.currentFilters;
        if (!date.id_filter) date.id_filter = await this.getIdForCache(date, 'loadingSalesByClient$');

        this.salesByClientService.getSalesByClient(date);
        this.salesByClient$ = this.salesByClientQuery.getTop(date, 6);
        this.loadingSalesByClient$ = this.salesByClientQuery.selectLoading();
    }
  }

  public async getSalesByCategory(params?: FilterSelection) {
    if(this.permissionsChartService.getDataCharts(this.nameSubModule,'sales-by-category') == true){
      await this.getIdForCachePinned('sales-by-category', 'loadingSalesByCategory$');
      const date = params || this.pinned['sales-by-category'] || this.currentFilters;
      if (!date.id_filter) date.id_filter = await this.getIdForCache(date, 'loadingSalesByCategory$');

      this.salesByCategoryService.getSalesByCategory(date);
      this.salesByCategory$ = this.salesByCategoryQuery.getTop(date, 6);
      this.loadingSalesByCategory$ = this.salesByCategoryQuery.selectLoading();
    }
  }

  public async getSalesByTimeSeries() {
    if(this.permissionsChartService.getDataCharts(this.nameSubModule,'sales-by-client-ts') == true){
      await this.getIdForCachePinned('sales-by-client-ts', 'loadingSalesByTimeSeries$');
      const date = this.pinned['sales-by-client-ts'] || this.currentFilters;
      if (!date.id_filter) date.id_filter = await this.getIdForCache(date, 'loadingSalesByTimeSeries$');

      this.salesByTimeSeriesService.getSalesByTimeSeries(date);
      this.salesByTimeSeries$ = this.salesByTimeSeriesQuery.get(date);
      this.loadingSalesByTimeSeries$ = this.salesByTimeSeriesQuery.selectLoading();
    }
  }

  public async getSalesBehaviorByCategory(params?: FilterSelection) {
    if(this.permissionsChartService.getDataCharts(this.nameSubModule,'sales-by-category-bar') == true){
      await this.getIdForCachePinned('sales-by-category-bar', 'loadingSalesBehavior$');
      const date = params || this.pinned['sales-by-category-bar'] || this.currentFilters;
      if (!date.id_filter) date.id_filter = await this.getIdForCache(date, 'loadingSalesBehavior$');

      this.salesBehaviorService.getSalesBehaviorByCategory(date);
      this.salesBehavior$ = this.salesBehaviorQuery.selectEntity(`salesBehaviorByCategory${date.start_date}${date.end_date}`);
      this.loadingSalesBehavior$ = this.salesBehaviorQuery.selectLoading();
    }
  }

  public async getSalesRanking() {
    if(this.permissionsChartService.getDataCharts(this.nameSubModule,'sales-products-rank') == true){
      await this.getIdForCachePinned('sales-products-rank', 'loadingSalesRanking$');
      const date = this.pinned['sales-products-rank'] || this.currentFilters;
      if (!date.id_filter) date.id_filter = await this.getIdForCache(date, 'loadingSalesRanking$');

      this.salesRankingService.getSalesRanking(date);
      this.salesRanking$ = this.salesRankingQuery.get(date);
      this.loadingSalesRanking$ = this.salesRankingQuery.selectLoading();
    }
  }

  public async getRankingPointsSale() {
    if(this.permissionsChartService.getDataCharts(this.nameSubModule,'sales-pointssale-rank') == true){
      await this.getIdForCachePinned('sales-pointssale-rank', 'loadingRankingPointsSale$');
      const date = this.pinned['sales-pointssale-rank'] || this.currentFilters;
      if (!date.id_filter) date.id_filter = await this.getIdForCache(date, 'loadingRankingPointsSale$');

      this.rankingPointsSaleService.get(date);
      this.rankingPointsSale$ = this.rankingPointsSaleQuery.get(date);
      this.loadingRankingPointsSale$ = this.rankingPointsSaleQuery.selectLoading();
    }
  }

  public async getSalesBehaviorByTimeSeries() {
    if(this.permissionsChartService.getDataCharts(this.nameSubModule,'sales-behavior-ts') == true){
      await this.getIdForCachePinned('sales-behavior-ts', 'loadingSalesBehaviorByTimeSeries$');
      const date = this.pinned['sales-behavior-ts'] || this.currentFilters;
      if (!date.id_filter) date.id_filter = await this.getIdForCache(date, 'loadingSalesBehaviorByTimeSeries$');

      this.salesBehaviorByTimeSeriesService.getSalesBehavior(date);
      this.salesBehaviorByTimeSeries$ = this.salesBehaviorByTimeSeriesQuery.get(date);
      this.loadingSalesBehaviorByTimeSeries$ = this.salesBehaviorByTimeSeriesQuery.selectLoading();
    }
  }

  public async getPriceSensitivityByTimeSeries() {
    if(this.permissionsChartService.getDataCharts(this.nameSubModule,'sales-price-sensitivity') == true){
      await this.getIdForCachePinned('sales-price-sensitivity', 'loadingPriceSensitivityTimeSeries$');
      const date = this.pinned['sales-price-sensitivity'] || this.currentFilters;
      if (!date.id_filter) date.id_filter = await this.getIdForCache(date, 'loadingPriceSensitivityTimeSeries$');

      this.priceSensitivityTimeSeriesService.getPriceSencitivity(date);
      this.priceSensitivityTimeSeries$ = this.priceSensitivityTimeSeriesQuery.get(date);
      this.loadingPriceSensitivityTimeSeries$ = this.priceSensitivityTimeSeriesQuery.selectLoading();
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
      if (data.id === 'sales-by-client')
        this.getSalesByClient();
      if (data.id === 'sales-by-category')
        this.getSalesByCategory();
      if (data.id === 'sales-by-client-ts')
        this.getSalesByTimeSeries();
      if (data.id === 'sales-behavior-ts')
        this.getSalesBehaviorByTimeSeries();
      if (data.id === 'sales-by-category-bar')
        this.getSalesBehaviorByCategory();
      if (data.id === 'sales-pointssale-rank')
        this.getRankingPointsSale();
      if (data.id === 'sales-products-rank')
        this.getSalesRanking();
      if (data.id === 'sales-price-sensitivity')
        this.getPriceSensitivityByTimeSeries();
    }
  }

  public setBusinessLevelsToParams(data: ChangeLevel): void {
    const params: FilterSelection = this.filterBar.getParamsForFiltersSelected();
    data.data.forEach(level => {
      params[`bussiness_level${level.level}`] = level.name;
    });

    if (data.type === 'column')
      this.getSalesBehaviorByCategory(params);
    else
      this.getSalesByCategory(params);
  }

}
