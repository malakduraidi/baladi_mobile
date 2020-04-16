import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";


// Store
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { effects, reducers } from "./store";

//model
import {ProductCategory} from "./models/product-category";
//containers
import {ProductCategoryContainerModule } from "./containers/container.module";
import { ProductCategoryTable } from 'src/providers/db/tables/product-category.table';
//services


//routes

@NgModule({
  imports: [
    IonicModule,
    EffectsModule.forFeature(effects),
    StoreModule.forFeature("productCategory", reducers),
   ProductCategoryContainerModule
  ],
  //
  exports: [ProductCategoryContainerModule],
  providers: [ProductCategory,ProductCategoryTable]
  //
})
export class ProductCategoryModule { }
