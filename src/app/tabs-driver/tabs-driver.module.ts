import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from "@ngx-translate/core";

import { TabsDriverPageRoutingModule } from './tabs-driver.routing.module';

import { TabsDriverPage } from './tabs-driver.page';
import { PipesModule } from 'src/pipes/pipes.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsDriverPageRoutingModule,
    PipesModule,
    TranslateModule
  ],
  declarations: [TabsDriverPage]
})
export class TabsDriverPageModule {}
