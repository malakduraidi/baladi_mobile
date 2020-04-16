import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";


// Store
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { effects, reducers } from "./store";

//model
import {ResPartner} from "./models/res-partner";
//containers
import {ResPartnerContainerModule } from "./containers/container.module";
import { ResPartnerTable } from 'src/providers/db/tables/res-partner.table';
//services


//routes

@NgModule({
  imports: [
    IonicModule,
    EffectsModule.forFeature(effects),
    StoreModule.forFeature("resPartner", reducers),
   ResPartnerContainerModule
  ],
  //
  exports: [ResPartnerContainerModule],
  providers: [ResPartner,ResPartnerTable]
  //
})
export class ResPartnerModule { }
