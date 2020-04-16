import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";


// Store
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { effects, reducers } from "./store";

//model
import {Config} from "./models/config";
//containers
import {ConfigContainerModule } from "./containers/container.module";
import { ConfigTable } from 'src/providers/db/tables/config.table';
//services


//routes

@NgModule({
  imports: [
    IonicModule,
    EffectsModule.forFeature(effects),
    StoreModule.forFeature("config", reducers),
   ConfigContainerModule
  ],
  //
  exports: [ConfigContainerModule],
  providers: [Config,ConfigTable]
  //
})
export class ConfigModule { }
