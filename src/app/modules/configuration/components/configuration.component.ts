import { Component, OnInit } from '@angular/core';
import { Data, Router } from '@angular/router';
import { Enumerable } from 'linq-es2015';
import { Observable, of } from 'rxjs';

import { saveAs } from '@progress/kendo-file-saver';
import { DataRoute } from '../../core/utils/DataRoute';
import { HeaderServices } from '../../core/services/header-service/header.services';
import { filterRoutesWithPrefix } from 'src/app/modules/core/shared';
import { UpdateInformationService, UpdateInformationQuery, UpdateInformation } from '../state/updateInformation';
import { ProgrammedDownloadsService, ProgrammedDownloadsQuery, ProgrammedDownload } from '../state/programmedDownload';
import { MultiselectQuery, Multiselect } from '../../shared/components/multiselect-filter/state';
import { DownloadInformationService, DownloadInformationQuery, DownloadInformation, DownloadInformationStore } from '../state/downloadInformation';
import { NotificationService, Notification, NotificationQuery } from 'src/app/state/notification';
import { PermissionsChartService } from 'src/app/services/permissions-charts/permissions-charts.service';

@Component({
  selector: 'cvn-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {

  routes: Enumerable<DataRoute<Data>>;

  public clients$: Observable<Multiselect[]>;

  public updateInformation$: Observable<UpdateInformation[]>;
  public loadingUpdateInformation$: Observable<boolean>;

  public programmedDownloads$: Observable<ProgrammedDownload[]>;
  public loadingProgrammedDownloads$: Observable<boolean>;
  public loadingDownloadInformation$: Observable<boolean>;

  public notifications$: Observable<Notification[]>;
  private chartss$: Observable<any[]>;
  public nameSubModule = 'configuration';
  public downloadInformationSales: boolean;
  public notificationsaved: boolean;

  constructor(
    private router: Router,
    private headerServices: HeaderServices,
    private multiselectQuery: MultiselectQuery,
    private updateInformationService: UpdateInformationService,
    private updateInformationQuery: UpdateInformationQuery,
    private programmedDownloadsService: ProgrammedDownloadsService,
    private programmedDownloadsQuery: ProgrammedDownloadsQuery,
    private downloadInformationService: DownloadInformationService,
    private downloadInformationQuery: DownloadInformationQuery,
    private downloadInformationStore: DownloadInformationStore,
    private notificationService: NotificationService,
    private notificationInsightsQuery: NotificationQuery,
    private permissionsChartService: PermissionsChartService
  ) {
    this.routes = filterRoutesWithPrefix(router, '');
  }
 
  ngOnInit(): void {
    
    this.headerServices.setModel('assets/images/icon/promociones-icon.png', 'LOGYCA / ANALÍTICA', true);
    this.getClients();
    this.getUpdateInformation();
    this.getProgrammedDownloads();
    this.getInsightsSaved();
    this.validatePermissions();

  }

  public getClients(): void {
    this.clients$ = this.multiselectQuery.getAllClients();
  }

  public getUpdateInformation(): void {
    this.updateInformationService.get();
    this.updateInformation$ = this.updateInformationQuery.get();
    this.loadingUpdateInformation$ = this.updateInformationQuery.selectLoading();
  }

  public getProgrammedDownloads(): void {
    this.programmedDownloadsService.get();
    this.programmedDownloads$ = this.programmedDownloadsQuery.get();
    this.loadingProgrammedDownloads$ = this.programmedDownloadsQuery.selectLoading();
  }

  public async getInsightsSaved() {
      this.notifications$ = this.notificationInsightsQuery.getArchived();
      this.notificationService.getArchivedNotifications();
  }

  public programmedDownload(download: ProgrammedDownload): void {
    this.programmedDownloadsService.post(download);
  }

  public removeDownload(id: number): void {
    this.programmedDownloadsService.delete(id);
  }

  public downloadSales(data: DownloadInformation) {
    this.loadingDownloadInformation$ = of(true);
    this.downloadInformationService.get(data)
      .subscribe((response: any) => {
        const blob = new Blob([response], { type: 'application/octet-stream' });
        saveAs(blob, 'download-sales.csv');
        this.downloadInformationStore.setLoading(false);
        this.loadingDownloadInformation$ = of(false);
      }, error => {
        this.downloadInformationStore.setLoading(false);
        this.loadingDownloadInformation$ = of(false);
      });
  }

  public removeInsight(insight, notifications) {
    this.notificationService.delete(insight.id, notifications);
  }

  public async validatePermissions() {  

    this.downloadInformationSales = false
    if (await this.permissionsChartService.getDataCharts(this.nameSubModule,'download-information-sales-inventory-data') == true){
      this.downloadInformationSales = true
    }
    this.notificationsaved = false
    if (await this.permissionsChartService.getDataCharts(this.nameSubModule,'insights-saved') == true){
      this.notificationsaved = true
    }
  }

}
