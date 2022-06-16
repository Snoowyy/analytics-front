import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { SendResultsComponent } from './send-results.component';

describe('SendResultsComponent', () => {
  let component: SendResultsComponent;
  let fixture: ComponentFixture<SendResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SendResultsComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
