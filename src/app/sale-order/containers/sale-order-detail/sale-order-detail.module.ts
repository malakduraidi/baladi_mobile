import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { TranslateModule } from "@ngx-translate/core";
import {SaleOrderDetailComponent } from "./sale-order-detail";
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {SaleOrderFormComponent } from '../../components/sale-order-form/sale-order-form';

@NgModule({
  imports: [
    IonicModule,
    ReactiveFormsModule,
    CommonModule,
    TranslateModule
  ],
  exports: [SaleOrderDetailComponent,SaleOrderFormComponent],
  declarations: [SaleOrderDetailComponent,SaleOrderFormComponent],
  entryComponents: [SaleOrderDetailComponent]
})
export class SaleOrderDetailModule { }