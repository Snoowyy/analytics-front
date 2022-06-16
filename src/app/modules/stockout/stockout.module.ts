import { NgModule } from '@angular/core';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { StockoutRoutingModule } from './stockout-routing.module';
import { StockoutComponent } from './components/stockout.component';
import { KendoModule } from '../kendo/kendo.module';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

@NgModule({
  declarations: [StockoutComponent],
  imports: [
    CommonModule,
    FormsModule,
    KendoModule,
    CoreModule,
    SharedModule.forRoot(),
    StockoutRoutingModule,
    LeafletModule.forRoot(),
  ],
  providers: [
    DatePipe,
    DecimalPipe
  ]
})
export class StockoutModule { }
