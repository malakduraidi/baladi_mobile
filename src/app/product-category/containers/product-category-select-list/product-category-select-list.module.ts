import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { TranslateModule } from "@ngx-translate/core";
import { CommonModule } from '@angular/common';
import {ProductCategorySelectListComponent } from './product-category-select-list';
import {ProductCategorySelectItemComponent } from '../../components/product-category-select-item/product-category-select-item';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    TranslateModule,
  ],
  exports: [ProductCategorySelectListComponent,ProductCategorySelectItemComponent],
  declarations: [ProductCategorySelectListComponent,ProductCategorySelectItemComponent],
  entryComponents: [ProductCategorySelectListComponent,ProductCategorySelectItemComponent]

})
export class ProductCategorySelectListModule { }


