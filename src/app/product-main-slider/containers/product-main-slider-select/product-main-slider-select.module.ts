import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { TranslateModule } from "@ngx-translate/core";
import {ProductMainSliderSelectComponent } from "./product-main-slider-select";
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductMainSliderSelectListModule } from '../product-main-slider-select-list/product-main-slider-select-list.module';

@NgModule({
  imports: [
    IonicModule,
    ReactiveFormsModule,
    CommonModule,
    TranslateModule,
    ProductMainSliderSelectListModule,
  ],
  exports: [ProductMainSliderSelectComponent,],
  declarations: [ProductMainSliderSelectComponent],
  entryComponents: [ProductMainSliderSelectComponent]
})
export class ProductMainSliderSelectModule { }