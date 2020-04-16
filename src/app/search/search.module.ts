import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SearchPage } from './search.page';
import { PipesModule } from 'src/pipes/pipes.module';
import { ShareModule } from 'src/components/share/share.module';
import { ProductCategoryListDynamicModule } from '../product-category/containers/product-category-list-dynamic/product-category-list-dynamic.module';
// import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  {
    path: '',
    component: SearchPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProductCategoryListDynamicModule,
    // TranslateModule,

    IonicModule,
    PipesModule,
    ShareModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SearchPage]

})
export class SearchPageModule {}
