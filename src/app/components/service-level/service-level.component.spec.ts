import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderServices } from 'src/app/modules/core/services/header-service/header.services';
import { DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NotificationService } from '@progress/kendo-angular-notification';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ServiceLevelComponent } from './service-level.component';
import { SeeGraphicAnalysisService } from 'src/app/modules/shared/services/seeGraphicAnalysis/see-graphic-analysis.service';

describe('ServiceLevelComponent', () => {
  let component: ServiceLevelComponent;
  let fixture: ComponentFixture<ServiceLevelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ServiceLevelComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
      ],
      providers: [
        HeaderServices,
        DatePipe,
        SeeGraphicAnalysisService,
        NotificationService
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
