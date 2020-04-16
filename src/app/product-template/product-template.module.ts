import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";


// Store
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { effects, reducers } from "./store";

//model
import {ProductTemplate} from "./models/product-template";
//containers
import {ProductTemplateContainerModule } from "./containers/container.module";
import { ProductTemplateTable } from 'src/providers/db/tables/product-template.table';
//services


//routes

@NgModule({
  imports: [
    IonicModule,
    EffectsModule.forFeature(effects),
    StoreModule.forFeature("productTemplate", reducers),
   ProductTemplateContainerModule
  ],
  //
  exports: [ProductTemplateContainerModule],
  providers: [ProductTemplate,ProductTemplateTable]
  //
})
export class ProductTemplateModule { }
