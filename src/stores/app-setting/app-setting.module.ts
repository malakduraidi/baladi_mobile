import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

// Store
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { effects, reducers } from './';
import { SettingTable } from '../../providers/db/tables/app-setting.table';
import { OdooModule } from '../../providers/odoo/odoo.module';

@NgModule({
  imports: [
    OdooModule,
    IonicModule,
    EffectsModule.forFeature(effects),
    StoreModule.forFeature('app-settings', reducers)
  ],
  providers: [SettingTable]
})
export class AppSettingModule { }
