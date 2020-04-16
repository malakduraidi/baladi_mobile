import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { TranslateModule } from "@ngx-translate/core";
import {ProductCategoryDetailComponent } from "./product-category-detail";
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {ProductCategoryFormComponent } from '../../components/product-category-form/product-category-form';

@NgModule({
  imports: [
    IonicModule,
    ReactiveFormsModule,
    CommonModule,
    TranslateModule
  ],
  exports: [ProductCategoryDetailComponent,ProductCategoryFormComponent],
  declarations: [ProductCategoryDetailComponent,ProductCategoryFormComponent],
  entryComponents: [ProductCategoryDetailComponent]
})
export class ProductCategoryDetailModule { }