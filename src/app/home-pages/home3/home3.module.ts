import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { Home3Page } from './home3.page';
import { PipesModule } from 'src/pipes/pipes.module';
import { ShareModule } from 'src/components/share/share.module';
// import { OrderItemComponent } from 'src/components/order-item/order-item.component';

const routes: Routes = [
  {
    path: '',
    component: Home3Page
  }
];

@NgModule({
  // exports: [
  //   OrderItemComponent

  // ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    PipesModule,
    ShareModule,
    // OrderItemComponent
  ],
  declarations: [Home3Page] //OrderItemComponent
})
export class Home3PageModule {}
