import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { TranslateModule } from "@ngx-translate/core";
import { CommonModule } from '@angular/common';
import {ProductMainSliderListComponent } from './product-main-slider-list';
import {ProductMainSliderItemComponent } from '../../components/product-main-slider-item/product-main-slider-item';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    TranslateModule,
  ],
  exports: [ProductMainSliderListComponent,ProductMainSliderItemComponent],
  declarations: [ProductMainSliderListComponent,ProductMainSliderItemComponent],
  entryComponents: [ProductMainSliderListComponent,ProductMainSliderItemComponent]

})
export class ProductMainSliderListModule { }


