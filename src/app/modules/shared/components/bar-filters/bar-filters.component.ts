import { Component, OnInit, ViewChild, EventEmitter, Output, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';

import { DateRangeService } from '@progress/kendo-angular-dateinputs';

import * as moment from 'moment';
import { Multiselect, MultiselectQuery } from '../multiselect-filter/state';
import { FilterSelection, PeriodicitySelected, OthersFilterSelection, FilterSelectionStore } from './state';

@Component({
  selector: 'cvn-bar-filters',
  templateUrl: './bar-filters.component.html',
  styleUrls: ['./bar-filters.component.scss']
})

export class BarFiltersComponent implements OnInit, OnChanges {

  @ViewChild('popup') popup;
  @ViewChild('endDateInput') endDateInput;
  @ViewChild('filterMultiselect') filterMultiselect;
  @ViewChild('daterange', { read: DateRangeService }) public service: DateRangeService;
  @Output() filterSelection: EventEmitter<{}> = new EventEmitter();
  @Output() periodicitySelected: EventEmitter<FilterSelection> = new EventEmitter();
  @Input() filters: FilterSelection;
  public isVisibleFilterBar: boolean;
  public range: { start: Date, end: Date };
  public periodicity: string[] = [];
  public currentSelectedPeriodicity: PeriodicitySelected;
  public multiselectOptions$: Observable<Multiselect[]>;
  public defaultPeriodicity: string;
  public today: Date;

  constructor(
    private datePipe: DatePipe,
    private multiselectQuery: MultiselectQuery,
    private filterSelectionStore: FilterSelectionStore
  ) {
    this.isVisibleFilterBar = true;
    this.defaultPeriodicity = 'Mensual';
    this.today = new Date();
  }

  ngOnInit() {
    this.getMultiselectOptions();
    this.initilizeDataRangeDates();
    this.initializePeriodicityOptions();
    this.emitFiltersSelected();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.filters) {
      const currentFilter: FilterSelection = changes.filters.currentValue;
      if (currentFilter)
        this.initilizeDataRangeDates();
    }
  }

  public initilizeDataRangeDates(): void {
    if (this.filters) {
      const { start_date, end_date } = this.filters;
      this.range = { start: moment(start_date).toDate(), end: moment(end_date).toDate() };
    } else {
      const currentMonth = this.getCurrentMonth();
      const currentYear = this.getCurrentYear();
      this.range = { start: new Date(currentYear, currentMonth, 1), end: new Date() };
    }
  }

  public getCurrentMonth(): number {
    return new Date().getMonth();
  }

  public getCurrentYear(): number {
    return new Date().getFullYear();
  }

  public initializePeriodicityOptions(): void {
    this.periodicity = ['Anual', 'Semanal', 'Diario'];
  }

  public getMultiselectOptions(): void {
    this.multiselectOptions$ = this.multiselectQuery.getOptions();
  }

  public emitFiltersSelected(): void {
    if (this.isValidCurrentRangeDateValue()) {
      const result: FilterSelection = this.getParamsForFiltersSelected();
      this.filterSelectionStore.setLastFilterSelected(result);
      this.filterSelection.emit();
      if (this.popup.show) this.popup.toggle();
    }
  }

  public getParamsForFiltersSelected(): FilterSelection {
    const { start_date, end_date }: FilterSelection = this.applyFormatToDateRangeSelected();
    const otherParams: OthersFilterSelection = this.filterMultiselect.convertFiltersToRequestParams();
    const params: FilterSelection = {
      start_date,
      end_date,
      period: this.currentSelectedPeriodicity || 'monthly'
    };

    Object.keys(otherParams).forEach(key => params[key] = otherParams[key]);

    return params;
  }

  public emitPeriodicitySelect(selected: string): void {
    this.currentSelectedPeriodicity = (
      selected === 'Diario'  ? 'daily' :
      selected === 'Semanal' ? 'weekly' :
      selected === 'Mensual' ? 'monthly' :
      selected === 'Anual'   ? 'yearly' :
      'monthly'
    );
    if (this.isValidCurrentRangeDateValue())
      this.periodicitySelected.emit();
  }

  public isValidCurrentRangeDateValue(): boolean {
    return this.range.start && this.range.end && (this.range.end.getTime() - this.range.start.getTime() > 0);
  }

  public applyFormatToDateRangeSelected(): FilterSelection {
    const start_date = this.transformDate(this.range.start);
    const end_date = this.transformDate(this.range.end);
    return { start_date, end_date };
  }

  public transformDate(date: Date): string {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

  public toggleVisibilityFilterBar(): void {
    this.isVisibleFilterBar = !this.isVisibleFilterBar;
  }

  public get animate(): { type: string, direction: string, duration: number } {
    return {
      type: 'slide',
      direction: 'down',
      duration: 300
    };
  }

  public onKeydown(event): void {
    if (event.key === 'Enter' && this.isValidCurrentRangeDateValue())
      this.emitFiltersSelected();
  }

}
