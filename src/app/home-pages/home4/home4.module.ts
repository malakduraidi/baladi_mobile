import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { Home4Page } from './home4.page';
import { PipesModule } from 'src/pipes/pipes.module';
import { ShareModule } from 'src/components/share/share.module';
import { ProductCategoryListDynamicModule } from 'src/app/product-category/containers/product-category-list-dynamic/product-category-list-dynamic.module';
import { ProductMainSliderListModule } from 'src/app/product-main-slider/containers/product-main-slider-list/product-main-slider-list.module';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  {
    path: '',
    component: Home4Page
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    PipesModule,
    ShareModule,
    ProductMainSliderListModule,
    TranslateModule,
    ProductCategoryListDynamicModule
  ],
  declarations: [Home4Page]
})
export class Home4PageModule {}
