import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StockoutComponent } from './components/stockout.component';

const routes: Routes = [
  {
    path: '',
    component: StockoutComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StockoutRoutingModule { }
