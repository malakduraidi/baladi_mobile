import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { TranslateModule } from "@ngx-translate/core";
import { CommonModule } from '@angular/common';
import { SaleOrderLineCartListComponent } from './sale-order-line-cart-list';
import { SaleOrderLineCartItemComponent } from '../../components/sale-order-line-cart-item/sale-order-line-cart-item';

import { PipesModule } from 'src/pipes/pipes.module';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [
  {
    path: '',
    component: SaleOrderLineCartListComponent
  }
];

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    PipesModule,
    TranslateModule,
    RouterModule.forChild(routes),
  ],
  exports: [SaleOrderLineCartListComponent,SaleOrderLineCartItemComponent],
  declarations: [SaleOrderLineCartListComponent,SaleOrderLineCartItemComponent],
  entryComponents: [SaleOrderLineCartListComponent,SaleOrderLineCartItemComponent]

})
export class SaleOrderLineCartListModule { }


