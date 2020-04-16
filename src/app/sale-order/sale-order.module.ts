import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";


// Store
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { effects, reducers } from "./store";

//model
import {SaleOrder} from "./models/sale-order";
//containers
import {SaleOrderContainerModule } from "./containers/container.module";
import { SaleOrderTable } from 'src/providers/db/tables/sale-order.table';
//services


//routes

@NgModule({
  imports: [
    IonicModule,
    EffectsModule.forFeature(effects),
    StoreModule.forFeature("saleOrder", reducers),
   SaleOrderContainerModule
  ],
  //
  exports: [SaleOrderContainerModule],
  providers: [SaleOrder,SaleOrderTable]
  //
})
export class SaleOrderModule { }
