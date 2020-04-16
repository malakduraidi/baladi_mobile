import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { TranslateModule } from "@ngx-translate/core";
import { CommonModule } from '@angular/common';
import {SaleOrderListComponent } from './sale-order-list';
import {SaleOrderItemComponent } from '../../components/sale-order-item/sale-order-item';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    TranslateModule,
  ],
  exports: [SaleOrderListComponent,SaleOrderItemComponent],
  declarations: [SaleOrderListComponent,SaleOrderItemComponent],
  entryComponents: [SaleOrderListComponent,SaleOrderItemComponent]

})
export class SaleOrderListModule { }


