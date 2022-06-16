import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';

import { ProductFormComponent } from './product-form.component';
import { ToCapitalCasePipe } from 'src/app/modules/shared/pipes/to-capital-case/to-capital-case.pipe';
import { ToMonthPipe } from 'src/app/modules/shared/pipes/to-month/to-month.pipe';

describe('ProductFormComponent', () => {
  let component: ProductFormComponent;
  let fixture: ComponentFixture<ProductFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductFormComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [ToCapitalCasePipe, ToMonthPipe]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be emit close event emitter when click on #cancelForm', (done) => {
    const expected = 'isActiveProductFormWindow';
    const btnCancelForm = fixture.debugElement.query(By.css('#cancelForm')).nativeElement;
    component.close.subscribe(data => {
      expect(data).toEqual(expected);
      done();
    });
    btnCancelForm.click();
    fixture.detectChanges();
  });
});
