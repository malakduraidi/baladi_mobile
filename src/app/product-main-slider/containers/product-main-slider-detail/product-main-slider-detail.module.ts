import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { TranslateModule } from "@ngx-translate/core";
import {ProductMainSliderDetailComponent } from "./product-main-slider-detail";
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {ProductMainSliderFormComponent } from '../../components/product-main-slider-form/product-main-slider-form';

@NgModule({
  imports: [
    IonicModule,
    ReactiveFormsModule,
    CommonModule,
    TranslateModule
  ],
  exports: [ProductMainSliderDetailComponent,ProductMainSliderFormComponent],
  declarations: [ProductMainSliderDetailComponent,ProductMainSliderFormComponent],
  entryComponents: [ProductMainSliderDetailComponent]
})
export class ProductMainSliderDetailModule { }