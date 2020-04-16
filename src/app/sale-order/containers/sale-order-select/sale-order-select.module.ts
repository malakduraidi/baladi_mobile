import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { TranslateModule } from "@ngx-translate/core";
import {SaleOrderSelectComponent } from "./sale-order-select";
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SaleOrderSelectListModule } from '../sale-order-select-list/sale-order-select-list.module';

@NgModule({
  imports: [
    IonicModule,
    ReactiveFormsModule,
    CommonModule,
    TranslateModule,
    SaleOrderSelectListModule,
  ],
  exports: [SaleOrderSelectComponent,],
  declarations: [SaleOrderSelectComponent],
  entryComponents: [SaleOrderSelectComponent]
})
export class SaleOrderSelectModule { }