import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { TranslateModule } from "@ngx-translate/core";
import {SaleOrderLineSelectComponent } from "./sale-order-line-select";
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SaleOrderLineSelectListModule } from '../sale-order-line-select-list/sale-order-line-select-list.module';

@NgModule({
  imports: [
    IonicModule,
    ReactiveFormsModule,
    CommonModule,
    TranslateModule,
    SaleOrderLineSelectListModule,
  ],
  exports: [SaleOrderLineSelectComponent,],
  declarations: [SaleOrderLineSelectComponent],
  entryComponents: [SaleOrderLineSelectComponent]
})
export class SaleOrderLineSelectModule { }