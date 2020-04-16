import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";


// Store
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { effects, reducers } from "./store";

//model
import {ProductMainSlider} from "./models/product-main-slider";
//containers
import {ProductMainSliderContainerModule } from "./containers/container.module";
import { ProductMainSliderTable } from 'src/providers/db/tables/product-main-slider.table';
//services


//routes

@NgModule({
  imports: [
    IonicModule,
    EffectsModule.forFeature(effects),
    StoreModule.forFeature("productMainSlider", reducers),
   ProductMainSliderContainerModule
  ],
  //
  exports: [ProductMainSliderContainerModule],
  providers: [ProductMainSlider,ProductMainSliderTable]
  //
})
export class ProductMainSliderModule { }
