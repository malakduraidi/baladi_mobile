import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { TranslateModule } from "@ngx-translate/core";
import {ProductCategorySelectComponent } from "./product-category-select";
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductCategorySelectListModule } from '../product-category-select-list/product-category-select-list.module';

@NgModule({
  imports: [
    IonicModule,
    ReactiveFormsModule,
    CommonModule,
    TranslateModule,
    ProductCategorySelectListModule,
  ],
  exports: [ProductCategorySelectComponent,],
  declarations: [ProductCategorySelectComponent],
  entryComponents: [ProductCategorySelectComponent]
})
export class ProductCategorySelectModule { }