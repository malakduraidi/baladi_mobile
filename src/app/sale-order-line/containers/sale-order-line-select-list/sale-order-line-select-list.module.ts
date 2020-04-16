import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { TranslateModule } from "@ngx-translate/core";
import { CommonModule } from '@angular/common';
import {SaleOrderLineSelectListComponent } from './sale-order-line-select-list';
import {SaleOrderLineSelectItemComponent } from '../../components/sale-order-line-select-item/sale-order-line-select-item';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    TranslateModule,
  ],
  exports: [SaleOrderLineSelectListComponent,SaleOrderLineSelectItemComponent],
  declarations: [SaleOrderLineSelectListComponent,SaleOrderLineSelectItemComponent],
  entryComponents: [SaleOrderLineSelectListComponent,SaleOrderLineSelectItemComponent]

})
export class SaleOrderLineSelectListModule { }


