import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { TranslateModule } from "@ngx-translate/core";
import { CommonModule } from '@angular/common';
import {ProductMainSliderSelectListComponent } from './product-main-slider-select-list';
import {ProductMainSliderSelectItemComponent } from '../../components/product-main-slider-select-item/product-main-slider-select-item';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    TranslateModule,
  ],
  exports: [ProductMainSliderSelectListComponent,ProductMainSliderSelectItemComponent],
  declarations: [ProductMainSliderSelectListComponent,ProductMainSliderSelectItemComponent],
  entryComponents: [ProductMainSliderSelectListComponent,ProductMainSliderSelectItemComponent]

})
export class ProductMainSliderSelectListModule { }


