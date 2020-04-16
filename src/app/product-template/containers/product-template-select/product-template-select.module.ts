import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { TranslateModule } from "@ngx-translate/core";
import {ProductTemplateSelectComponent } from "./product-template-select";
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductTemplateSelectListModule } from '../product-template-select-list/product-template-select-list.module';

@NgModule({
  imports: [
    IonicModule,
    ReactiveFormsModule,
    CommonModule,
    TranslateModule,
    ProductTemplateSelectListModule,
  ],
  exports: [ProductTemplateSelectComponent,],
  declarations: [ProductTemplateSelectComponent],
  entryComponents: [ProductTemplateSelectComponent]
})
export class ProductTemplateSelectModule { }