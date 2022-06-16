import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ConfigurationComponent } from './configuration.component';
import { HeaderServices } from '../../core/services/header-service/header.services';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProgrammedDownloadsService, ProgrammedDownload } from '../state/programmedDownload';
import { of } from 'rxjs';
import { PermissionsChartService } from 'src/app/services/permissions-charts/permissions-charts.service';

describe('ConfigurationComponent', () => {
  let component: ConfigurationComponent;
  let fixture: ComponentFixture<ConfigurationComponent>;

  let programmedDownloadsServiceSpy: ProgrammedDownloadsService;

  function prepararSpy() {
    programmedDownloadsServiceSpy = jasmine.createSpyObj('ProgrammedDownloadsService', {
      get: of(true),
      post: of(true),
      delete: of(true)
    });
  }

  beforeEach(async(() => {
    prepararSpy();
    TestBed.configureTestingModule({
      declarations: [ConfigurationComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        HeaderServices,
        PermissionsChartService,
        { provide: ProgrammedDownloadsService, useValue: programmedDownloadsServiceSpy },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should programmedDownload function call method post service', () => {
    const mock: ProgrammedDownload = {
      glnretailer: 1,
      periodicity: 'W',
      execution_day: 2
    };
    component.programmedDownload(mock);
    expect(programmedDownloadsServiceSpy.post).toHaveBeenCalled();
    expect(programmedDownloadsServiceSpy.post).toHaveBeenCalledWith(mock);
  });

  it('should removeDownload function call method post service', () => {
    const mock = 2;
    component.removeDownload(mock);
    expect(programmedDownloadsServiceSpy.delete).toHaveBeenCalled();
    expect(programmedDownloadsServiceSpy.delete).toHaveBeenCalledWith(mock);
  });
});
