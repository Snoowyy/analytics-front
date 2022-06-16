import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { Inventory } from '../../state/inventory';
import { PermissionsChartService } from 'src/app/services/permissions-charts/permissions-charts.service';
@Component({
  selector: 'cvn-inventory-data',
  templateUrl: './inventory-data.component.html',
  styleUrls: ['./inventory-data.component.scss']
})
export class InventoryDataComponent implements OnInit, OnChanges {

  @Input() data: Inventory;
  @Input() isLoading: boolean;

  public nameSubModule = 'inventory';
  public last_inventory: boolean;
  public average_sale: boolean;
  public inventory_days: boolean;

  constructor(private permissionsChartService: PermissionsChartService) { }

  ngOnInit() {
    this.permissionsInventoryCards();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.data) {
      const currentValueData = changes.data.currentValue;
      !currentValueData ? this.initializeData() : null;
    }
  }

  public initializeData(): void {
    const initialValue: Inventory = {
      last_inventory_qty: 0,
      last_inventory_total: 0,
      average_sale_qty: 0,
      average_sale_total: 0,
      inventory_days: 0
    };
    this.data = initialValue;
  }

  public async permissionsInventoryCards() {  

    this.last_inventory = false
    if (await this.permissionsChartService.getDataCharts(this.nameSubModule,'last-inventory') == true){
      this.last_inventory = true
    }
    this.average_sale = false
    if (await this.permissionsChartService.getDataCharts(this.nameSubModule,'average-sale') == true){
      this.average_sale = true
    }

    this.inventory_days = false
    if (await this.permissionsChartService.getDataCharts(this.nameSubModule,'inventory-days') == true){
      this.inventory_days = true
    }

  }

}
