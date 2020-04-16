import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';


import { HomePage } from './home.page';
import { ShareModule } from 'src/components/share/share.module';
import { PipesModule } from 'src/pipes/pipes.module';
import { ProductMainSliderListModule } from 'src/app/product-main-slider/containers/product-main-slider-list/product-main-slider-list.module';

const routes: Routes = [
  {
    path: '',
    component: HomePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ShareModule,
    PipesModule,
    ProductMainSliderListModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
