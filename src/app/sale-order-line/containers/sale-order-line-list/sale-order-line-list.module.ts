import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { TranslateModule } from "@ngx-translate/core";
import { CommonModule } from '@angular/common';
import {SaleOrderLineListComponent } from './sale-order-line-list';
import {SaleOrderLineItemComponent } from '../../components/sale-order-line-item/sale-order-line-item';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    TranslateModule,
  ],
  exports: [SaleOrderLineListComponent,SaleOrderLineItemComponent],
  declarations: [SaleOrderLineListComponent,SaleOrderLineItemComponent],
  entryComponents: [SaleOrderLineListComponent,SaleOrderLineItemComponent]

})
export class SaleOrderLineListModule { }


