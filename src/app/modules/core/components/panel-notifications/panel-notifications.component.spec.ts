import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { NotificationService } from '@progress/kendo-angular-notification';
import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PanelNotificationsComponent } from './panel-notifications.component';
import { Notification } from 'src/app/state/notification';
import { SeeGraphicAnalysisService } from 'src/app/modules/shared/services/seeGraphicAnalysis/see-graphic-analysis.service';
import { dataNotification } from 'src/app/faker-data/data.faker';
import { PermissionsChartService } from 'src/app/services/permissions-charts/permissions-charts.service';

const mockNotifications: Notification[] = dataNotification;
const mockSelectingActive: Notification[] = [{
  insights_type: 'Participación de las causales agotado 5',
  insights: [{
    id: 5,
    username: 'hforigua',
    message: 'Las principales oportunidades de gestión son: Góndola no abastecida en PV Cliente1 chapinero y PV Cliente2 Colina. Inexactitud en el inventario PV Cliente 3 Country y PV Cliente 4 Ibagué.',
    saved: false,
    erased: false,
    created_at: '2019-01-25',
    expires_at: '2019-01-28',
    url: ''
  }]
}];

describe('PanelNotificationsComponent', () => {
  let component: PanelNotificationsComponent;
  let fixture: ComponentFixture<PanelNotificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PanelNotificationsComponent],
      imports: [
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [NotificationService, SeeGraphicAnalysisService, PermissionsChartService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelNotificationsComponent);
    component = fixture.componentInstance;
    component.notifications = mockNotifications;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be executed togglePanelNotifications() function when clicking on button #togglePanelNotifications', () => {
    spyOn(component, 'togglePanelNotifications');
    const btnTogglePanelNotifications = fixture.debugElement.query(By.css('#togglePanelNotifications')).nativeElement;
    btnTogglePanelNotifications.click();
    fixture.detectChanges();
    expect(component.togglePanelNotifications).toHaveBeenCalled();
  });

  it('should isSelectingActive() return true', () => {
    component.notifications[0].insights[0].checked = true;
    component.toggleCheckInsight();
    const result = component.isSelectingActive;
    expect(result).toBeTruthy();
  });

  it('should isSelectingActive() return false', () => {
    component.notifications.forEach(n => n.insights.forEach(i => i.checked = false));
    const result = component.isSelectingActive;
    expect(result).toEqual(false);
  });

  it('should getAllInsights() return array insights', () => {
    const insights = component.getAllInsights();
    expect(insights.length).toEqual(5);
  });

  it('should be executed toggleDialogArchive() function when clicking on button #btnToggleDialogArchive', () => {
    spyOn(component, 'toggleDialogArchive');
    const btnToggleDialogArchive = fixture.debugElement.query(By.css('#btnToggleDialogArchive')).nativeElement;
    component.notifications = mockSelectingActive;
    btnToggleDialogArchive.click();
    fixture.detectChanges();
    expect(component.toggleDialogArchive).toHaveBeenCalled();
  });

  it('should be executed toggleDialogSendEmail() function when clicking on button #btnToggleDialogSendEmail', () => {
    spyOn(component, 'toggleDialogSendEmail');
    const btnToggleDialogSendEmail = fixture.debugElement.query(By.css('#btnToggleDialogSendEmail')).nativeElement;
    component.notifications = mockSelectingActive;
    btnToggleDialogSendEmail.click();
    fixture.detectChanges();
    expect(component.toggleDialogSendEmail).toHaveBeenCalled();
  });

  it('should be executed toggleDialogDelete() function when clicking on button #btnToggleDialogDelete', () => {
    spyOn(component, 'toggleDialogDelete');
    const btnToggleDialogDelete = fixture.debugElement.query(By.css('#btnToggleDialogDelete')).nativeElement;
    component.notifications = mockSelectingActive;
    btnToggleDialogDelete.click();
    fixture.detectChanges();
    expect(component.toggleDialogDelete).toHaveBeenCalled();
  });

  it('should be getIdOfSelectedInsights() return empty array', () => {
    fakeAsync(() => {
      const expected: number[] = [];
      const result = component.getIdOfSelectedInsights();
      expect(result).toEqual(expected);
    });
  });

  it('should be getIdOfSelectedInsights() return of ids selected', () => {
    fakeAsync(() => {
      const expected: number[] = [2, 3];
      component.notifications.forEach(n => n.insights.forEach(i => i.checked = false));

      component.notifications[0].insights[1].checked = true;
      component.notifications[1].insights[0].checked = true;
      const result = component.getIdOfSelectedInsights();
      expect(result).toEqual(expected);
    });
  });

});
