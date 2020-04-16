import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { TranslateModule } from "@ngx-translate/core";
import { CommonModule } from '@angular/common';
import {ProductCategoryListComponent } from './product-category-list';
import {ProductCategoryItemComponent } from '../../components/product-category-item/product-category-item';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    TranslateModule,
  ],
  exports: [ProductCategoryListComponent,ProductCategoryItemComponent],
  declarations: [ProductCategoryListComponent,ProductCategoryItemComponent],
  entryComponents: [ProductCategoryListComponent,ProductCategoryItemComponent]

})
export class ProductCategoryListModule { }


