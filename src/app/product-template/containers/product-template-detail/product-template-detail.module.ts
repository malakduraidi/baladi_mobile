import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { TranslateModule } from "@ngx-translate/core";
import {ProductTemplateDetailComponent } from "./product-template-detail";
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {ProductTemplateFormComponent } from '../../components/product-template-form/product-template-form';
import { ProductCategorySelectListModule } from 'src/app/product-category/containers/product-category-select-list/product-category-select-list.module';

@NgModule({
  imports: [
    IonicModule,
    ReactiveFormsModule,
    CommonModule,
    TranslateModule,
    ProductCategorySelectListModule
  ],
  exports: [ProductTemplateDetailComponent,ProductTemplateFormComponent],
  declarations: [ProductTemplateDetailComponent,ProductTemplateFormComponent],
  entryComponents: [ProductTemplateDetailComponent]
})
export class ProductTemplateDetailModule { }