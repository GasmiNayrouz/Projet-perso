import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StockManagementRoutingModule } from './stock-management-routing.module';
import { StockListComponent } from './components/stock-list/stock-list.component';
import { StockFormComponent } from './components/stock-form/stock-form.component';


@NgModule({
  declarations: [
    StockListComponent,
    StockFormComponent
  ],
  imports: [
    CommonModule,
    StockManagementRoutingModule
  ]
})
export class StockManagementModule { }
