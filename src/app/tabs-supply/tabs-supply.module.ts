import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from "@ngx-translate/core";

import { TabsSupplyPageRoutingModule } from './tabs-supply.routing.module';

import { TabsSupplyPage } from './tabs-supply.page';
import { PipesModule } from 'src/pipes/pipes.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsSupplyPageRoutingModule,
    PipesModule,
    TranslateModule
  ],
  declarations: [TabsSupplyPage]
})
export class TabsSupplyPageModule {}
