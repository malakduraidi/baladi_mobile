import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProductDetailPage } from './product-detail.page';

import { ShareModule } from 'src/components/share/share.module';
import { PipesModule } from 'src/pipes/pipes.module';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  {
    path: '',
    component: ProductDetailPage
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
    PipesModule,
    TranslateModule
  ],
  declarations: [ProductDetailPage]
})
export class ProductDetailPageModule {}
