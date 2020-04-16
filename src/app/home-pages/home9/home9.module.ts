import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { Home9Page } from './home9.page';
import { PipesModule } from 'src/pipes/pipes.module';
import { ShareModule } from 'src/components/share/share.module';
import { ProductCategoryListDynamicModule } from 'src/app/product-category/containers/product-category-list-dynamic/product-category-list-dynamic.module';

const routes: Routes = [
  {
    path: '',
    component: Home9Page
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    PipesModule,
    ProductCategoryListDynamicModule,
    ShareModule,
  ],
  declarations: [Home9Page]
})
export class Home9PageModule {}
