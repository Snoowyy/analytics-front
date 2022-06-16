import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TotalSale } from './state';
import { PermissionsChartService } from 'src/app/services/permissions-charts/permissions-charts.service';
@Component({
  selector: 'cvn-total-sales',
  templateUrl: './total-sales.component.html',
  styleUrls: ['./total-sales.component.scss']
})
export class TotalSalesComponent implements OnInit, OnChanges {

  @Input() totalSales: TotalSale;
  @Input() isLoading: boolean;
  public nameSubModule = 'sales';
  public variation: boolean;

  constructor(private permissionsChartService: PermissionsChartService) { }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.totalSales) {
      const currentValueTotalSales = changes.totalSales.currentValue;
      !currentValueTotalSales ? this.initializeTotalSales() : this.validateVariations();
    }
  }

  public initializeTotalSales(): void {
    const initialValue: TotalSale = {
      total: 0,
      qty: 0,
      'variation-ytd': null,
      'variation-mtd': null
    };
    this.totalSales = initialValue;
  }

  public validateVariations(): void {
    this.variation = false
    if(this.permissionsChartService.getDataCharts(this.nameSubModule,'variation') == true){
      this.variation = true
    }
      const actualVariationMtd = this.totalSales['variation-mtd'];
      const actualVariationYtd = this.totalSales['variation-ytd'];

      if (actualVariationMtd) { 
        if (actualVariationMtd.toString().toLowerCase() === 'na')
          this.totalSales['variation-mtd'] = null;

        if (actualVariationYtd.toString().toLowerCase() === 'na')
          this.totalSales['variation-ytd'] = null;
      }
     
  }

  public get showNoResultsMessage(): boolean {
    return !this.isLoading;
  }

}
