import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryComponent } from './inventory.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DatePipe } from '@angular/common';

import { HeaderServices } from '../../core/services/header-service/header.services';
import { SeeGraphicAnalysisService } from 'src/app/modules/shared/services/seeGraphicAnalysis/see-graphic-analysis.service';
import { NotificationService } from 'src/app/state/notification';
import { ToCapitalCasePipe } from '../../shared/pipes/to-capital-case/to-capital-case.pipe';
import { DictionaryPipe } from '../../shared/pipes/dictionary/dictionary.pipe';
import { ToMonthPipe } from '../../shared/pipes/to-month/to-month.pipe';

describe('InventoryComponent', () => {
  let component: InventoryComponent;
  let fixture: ComponentFixture<InventoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InventoryComponent, DictionaryPipe],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        LeafletModule.forRoot(),
      ],
      providers: [
        HeaderServices,
        DatePipe,
        ToCapitalCasePipe,
        SeeGraphicAnalysisService,
        ToMonthPipe,
        NotificationService
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
