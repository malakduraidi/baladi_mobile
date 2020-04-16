import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { TranslateModule } from "@ngx-translate/core";
import { CommonModule } from '@angular/common';
import {SaleOrderSelectListComponent } from './sale-order-select-list';
import {SaleOrderSelectItemComponent } from '../../components/sale-order-select-item/sale-order-select-item';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    TranslateModule,
  ],
  exports: [SaleOrderSelectListComponent,SaleOrderSelectItemComponent],
  declarations: [SaleOrderSelectListComponent,SaleOrderSelectItemComponent],
  entryComponents: [SaleOrderSelectListComponent,SaleOrderSelectItemComponent]

})
export class SaleOrderSelectListModule { }


