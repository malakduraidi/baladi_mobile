import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OrderPage } from './order.page';
import { PipesModule } from 'src/pipes/pipes.module';
import { SaleOrderLineOrderCartListModule } from '../sale-order-line/containers/sale-order-line-order-cart-list/sale-order-line-order-cart-list.module';


const routes: Routes = [
  {
    path: '',
    component: OrderPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    PipesModule,
    PipesModule,
    SaleOrderLineOrderCartListModule
  ],
  declarations: [OrderPage]
})
export class OrderPageModule {}
