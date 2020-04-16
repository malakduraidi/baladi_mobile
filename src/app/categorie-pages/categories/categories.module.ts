import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { CategoriesPage } from './categories.page';
import { PipesModule } from 'src/pipes/pipes.module';
import { ProductCategoryListDynamicModule } from 'src/app/product-category/containers/product-category-list-dynamic/product-category-list-dynamic.module';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  {
    path: '',
    component: CategoriesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    ProductCategoryListDynamicModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    TranslateModule,
    PipesModule
  ],
  declarations: [CategoriesPage]
})
export class CategoriesPageModule {}
