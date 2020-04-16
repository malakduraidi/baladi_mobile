import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ManagerPage } from './manager.page';
import { PipesModule } from 'src/pipes/pipes.module';
import { ProductTemplateListDynamicModule } from '../product-template/containers/product-template-list-dynamic/product-template-list-dynamic.module';
import { ProductCategoryListManagerModule } from '../product-category/containers/product-category-list-manager/product-category-list-manager.module';

const routes: Routes = [
  {
    path: '',
    component: ManagerPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    PipesModule,
    ProductTemplateListDynamicModule,
    ProductCategoryListManagerModule
  ],
  declarations: [ManagerPage]
})
export class ManagerPageModule { }
