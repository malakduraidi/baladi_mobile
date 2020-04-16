import { Injectable } from '@angular/core';
import { DBServiceORM } from '../db.orm.service';
import { DBProvider } from '../db';

import { Setting } from '../../../stores/app-setting/models/app-setting';

@Injectable()
export class SettingTable extends DBServiceORM {
  // should be equal to the interface in the model directory
  public structure = Setting.getTableStructure();
  public tableName = 'app_setting';

  constructor(dbProvider: DBProvider) {
    // define setting model
    super(dbProvider);
  }
}
