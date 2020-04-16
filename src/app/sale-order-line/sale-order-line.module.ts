import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";


// Store
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { effects, reducers } from "./store";

//model
import {SaleOrderLine} from "./models/sale-order-line";
//containers
import {SaleOrderLineContainerModule } from "./containers/container.module";
import { SaleOrderLineTable } from 'src/providers/db/tables/sale-order-line.table';
//services


//routes

@NgModule({
  imports: [
    IonicModule,
    EffectsModule.forFeature(effects),
    StoreModule.forFeature("saleOrderLine", reducers),
   SaleOrderLineContainerModule
  ],
  //
  exports: [SaleOrderLineContainerModule],
  providers: [SaleOrderLine,SaleOrderLineTable]
  //
})
export class SaleOrderLineModule { }
