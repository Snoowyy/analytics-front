import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { NgxPermissionsModule } from 'ngx-permissions';
import { ParametersComponent } from './parameters.component';
import { ProductFormComponent } from '../product-form/product-form.component';
import { PointsaleFormComponent } from '../pointsale-form/pointsale-form.component';
import { TaxFormComponent } from '../tax-form/tax-form.component';
import { MarginFormComponent } from '../margin-form/margin-form.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToCapitalCasePipe } from 'src/app/modules/shared/pipes/to-capital-case/to-capital-case.pipe';

describe('ParametersComponent', () => {
  let component: ParametersComponent;
  let fixture: ComponentFixture<ParametersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ParametersComponent,
        ProductFormComponent,
        PointsaleFormComponent,
        TaxFormComponent,
        MarginFormComponent
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule,
        NgxPermissionsModule.forRoot()
      ],
      providers: [
        ToCapitalCasePipe
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggleFormWindow() function change value variable respective', () => {
    expect(component.isActiveProductFormWindow).toBeFalsy();
    expect(component.isActivePointSaleFormWindow).toBeFalsy();
    expect(component.isActiveTaxFormWindow).toBeFalsy();
    expect(component.isActiveMarginFormWindow).toBeFalsy();

    component.toggleFormWindow('isActiveProductFormWindow');
    component.toggleFormWindow('isActivePointSaleFormWindow');
    component.toggleFormWindow('isActiveTaxFormWindow');
    component.toggleFormWindow('isActiveMarginFormWindow');

    expect(component.isActiveProductFormWindow).toBeTruthy();
    expect(component.isActivePointSaleFormWindow).toBeTruthy();
    expect(component.isActiveTaxFormWindow).toBeTruthy();
    expect(component.isActiveMarginFormWindow).toBeTruthy();
  });
});
