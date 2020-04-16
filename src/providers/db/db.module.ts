import { CommonModule } from '@angular/common';
import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf
} from '@angular/core';

import { DBServiceORM } from './db.orm.service';
import { DBProvider } from './db';
import { SettingTable } from './tables/app-setting.table';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';

@NgModule({
  imports: [CommonModule],
  providers: [DBServiceORM, DBProvider, SettingTable, SQLitePorter]
})
export class DBModule {
  static forRoot(): ModuleWithProviders<DBModule> {
    return {
      ngModule: DBModule
    };
  }

  constructor(
    @Optional()
    @SkipSelf()
    parentModule: DBModule
  ) {
    if (parentModule) {
      throw new Error(
        'ServiceModule is already loaded. Import it in the AppModule only'
      );
    }
  }
}
