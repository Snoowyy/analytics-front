import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { UpdateInformationComponent } from './update-information.component';

describe('UpdateInformationComponent', () => {
  let component: UpdateInformationComponent;
  let fixture: ComponentFixture<UpdateInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateInformationComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('validateUpdateState function', () => {
    let result: boolean;

    result = component.validateUpdateState('IMPORTED');
    expect(result).toBeTruthy();

    result = component.validateUpdateState('na');
    expect(result).toBeFalsy();

    result = component.validateUpdateState('validated');
    expect(result).toBeTruthy();
  });

  it('validateOutdatedState function', () => {
    let result: boolean;

    result = component.validateOutdatedState('ERROR');
    expect(result).toBeTruthy();

    result = component.validateOutdatedState('na');
    expect(result).toBeFalsy();

    result = component.validateOutdatedState('error');
    expect(result).toBeTruthy();
  });

  it('validateInProgressState function', () => {
    let result: boolean;

    result = component.validateInProgressState('VALIDATING');
    expect(result).toBeTruthy();

    result = component.validateInProgressState('na');
    expect(result).toBeFalsy();

    result = component.validateInProgressState('importing');
    expect(result).toBeTruthy();
  });
});
