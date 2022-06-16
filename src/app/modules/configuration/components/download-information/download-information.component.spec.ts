import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { DownloadInformationComponent } from './download-information.component';

describe('DownloadInformationComponent', () => {
  let component: DownloadInformationComponent;
  let fixture: ComponentFixture<DownloadInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DownloadInformationComponent],
      imports: [ReactiveFormsModule, FormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [DatePipe]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
