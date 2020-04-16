import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";


// Store
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { effects, reducers } from "./store";

//model
import {ResCountry} from "./models/res-country";
//containers
import {ResCountryContainerModule } from "./containers/container.module";
import { ResCountryTable } from 'src/providers/db/tables/res-country.table';
//services


//routes

@NgModule({
  imports: [
    IonicModule,
    EffectsModule.forFeature(effects),
    StoreModule.forFeature("resCountry", reducers),
   ResCountryContainerModule
  ],
  //
  exports: [ResCountryContainerModule],
  providers: [ResCountry,ResCountryTable]
  //
})
export class ResCountryModule { }
