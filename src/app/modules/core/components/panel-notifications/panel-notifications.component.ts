import { Component, OnInit, TemplateRef, ViewChild, Input, ViewEncapsulation, SimpleChanges, OnChanges, OnDestroy } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '@progress/kendo-angular-notification';
import { Subscription } from 'rxjs';
import { Notification, NotificationService as NotificationsInsightsService, Insight, SendEmail } from 'src/app/state/notification';
import { SeeGraphicAnalysisService } from 'src/app/modules/shared/services/seeGraphicAnalysis/see-graphic-analysis.service';

@Component({
  selector: 'cvn-panel-notifications',
  templateUrl: './panel-notifications.component.html',
  styleUrls: ['./panel-notifications.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PanelNotificationsComponent implements OnInit, OnChanges, OnDestroy {

  @ViewChild('deshacer', { read: TemplateRef }) notificationDelete: TemplateRef<string>;
  @ViewChild('enviar', { read: TemplateRef }) notificationSendEmail: TemplateRef<string>;
  @ViewChild('archivar', { read: TemplateRef }) notificationArchive: TemplateRef<string>;
  @Input() notifications: Notification[];
  public isVisiblePanelNotifications: boolean;
  public isActiveDialogEmail: boolean;
  public isActiveDialogArchive: boolean;
  public isActiveDialogDelete: boolean;
  public hasResults: boolean;
  public isLoading: boolean;
  public subscription: Subscription;
  public isSelectingActive: boolean;
  public formSendEmail: FormGroup;

  constructor(
    private notificationService: NotificationService,
    private seeGraphicAnalysisService: SeeGraphicAnalysisService,
    private notificationsInsightsService: NotificationsInsightsService,
    private _formBuilder: FormBuilder,
  ) {
    this.isLoading = true;
    this.isSelectingActive = false;
  }

  ngOnInit() {
    this.initializeStates();
    this.initializeFormSendEmail();

    this.subscription = this.seeGraphicAnalysisService.eventShow$.subscribe((res: boolean) => {
      this.isVisiblePanelNotifications = res ? true : false;
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    const currentNotifications = changes.notifications.currentValue;
    if (currentNotifications)
      this.hasResults = (currentNotifications.length === 0) ? false : true;
    else
      this.initializeNotifications();
    this.isLoading = true;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public initializeStates() {
    this.isActiveDialogEmail = false;
    this.isActiveDialogArchive = false;
    this.isActiveDialogDelete = false;
    this.isVisiblePanelNotifications = false;
  }

  private initializeFormSendEmail() {
    this.formSendEmail = this._formBuilder.group({
      recipients: ['', Validators.required],
      note: ['', Validators.required]
    });
  }

  public initializeNotifications(): void {
    const initialValue: Notification[] = [];
    this.notifications = initialValue;
  }

  public togglePanelNotifications(): void {
    this.isVisiblePanelNotifications = !this.isVisiblePanelNotifications;
  }

  public toggleCheckInsight(): void {
    const insights = this.getAllInsights();

    let atListOneSelected: boolean;
    atListOneSelected = false;
    insights.forEach(it => it.checked ? atListOneSelected = true : null);
    this.isSelectingActive = atListOneSelected;
  }

  public getAllInsights(): Insight[] {
    const insights = [];
    if (!this.notifications) this.notifications = [];
    this.notifications.forEach(item => item.insights.forEach(insight => insights.push(insight)));
    return insights;
  }

  public get insightLength(): number {
    return this.getAllInsights().length;
  }

  public getSelectedInsights(): Insight[] {
    let result = [];
    this.notifications.forEach(item => {
      result = result.concat(item.insights.filter(ins => ins.checked));
    });
    return result;
  }

  public getIdOfSelectedInsights(): number[] {
    const insights = this.getSelectedInsights();
    const result = insights.map(ins => ins.id);
    return result;
  }

  public toggleDialogSendEmail(open?: boolean): void {
    if (open) {
      if (this.isSelectingActive) this.toggleDialogSendEmail();
    } else
      this.isActiveDialogEmail = !this.isActiveDialogEmail;
  }

  public confirmationDialogSendEmail(): void {
    this.toggleDialogSendEmail();
    this.sendEmailInsight();
    this.showStatusPop(this.notificationSendEmail);
  }

  public sendEmailInsight() {
    const dataForm = this.formSendEmail.value;
    const ids_insights = this.getIdOfSelectedInsights();

    const prepareDataForm: SendEmail = {
      'recipients[]': dataForm.recipients.split(','),
      'id[]': ids_insights,
      'note': dataForm.note
    };
    this.notificationsInsightsService.post(prepareDataForm);
  }

  public toggleDialogArchive(open?: boolean): void {
    if (open) {
      if (this.isSelectingActive) this.toggleDialogArchive();
    } else
      this.isActiveDialogArchive = !this.isActiveDialogArchive;
  }

  public confirmationDialogArchive(): void {
    this.toggleDialogArchive();
    this.archiveInsights();
    this.showStatusPop(this.notificationArchive);
  }

  public archiveInsights() {
    const toArchived = this.getSelectedInsights();
    toArchived.forEach(ins => {
      this.notificationsInsightsService.archive(ins.id, true, this.notifications);
    });
  }

  public toggleDialogDelete(open?: boolean): void {
    if (open) {
      if (this.isSelectingActive) this.toggleDialogDelete();
    } else
      this.isActiveDialogDelete = !this.isActiveDialogDelete;
  }

  public confirmationDialogDelete(): void {
    this.toggleDialogDelete();
    const toRemoved = this.getSelectedInsights();
    toRemoved.forEach(ins => {
      this.notificationsInsightsService.delete(ins.id, this.notifications);
    });
  }

  public showStatusPop(notificationTemplate: TemplateRef<any>): void {
    this.notificationService.show({
      content: notificationTemplate,
      position: { horizontal: 'center', vertical: 'bottom' },
      animation: { type: 'fade', duration: 800 },
      type: { style: 'warning', icon: true },
      hideAfter: 5000
    });
  }

  public get showNoResultsMessage(): boolean {
    return !this.hasResults && !this.isLoading;
  }

}
