import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";


// Store
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { effects, reducers } from "./store";

//model
import {ResCountryState} from "./models/res-country-state";
//containers
import {ResCountryStateContainerModule } from "./containers/container.module";
import { ResCountryStateTable } from 'src/providers/db/tables/res-country-state.table';
//services


//routes

@NgModule({
  imports: [
    IonicModule,
    EffectsModule.forFeature(effects),
    StoreModule.forFeature("resCountryState", reducers),
   ResCountryStateContainerModule
  ],
  //
  exports: [ResCountryStateContainerModule],
  providers: [ResCountryState,ResCountryStateTable]
  //
})
export class ResCountryStateModule { }
