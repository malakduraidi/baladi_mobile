import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CartPage } from './cart.page';

// For Translation Language
import { PipesModule } from 'src/pipes/pipes.module';
import { SaleOrderLineCartListModule } from '../sale-order-line/containers/sale-order-line-cart-list/sale-order-line-cart-list.module';

const routes: Routes = [

  {
    path: '',
    component: CartPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    PipesModule,
    SaleOrderLineCartListModule
  ],
  declarations: [CartPage]
})
export class CartPageModule { }
