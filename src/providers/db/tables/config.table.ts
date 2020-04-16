import { Injectable } from '@angular/core';
import { DBServiceORM } from '../db.orm.service';
import { DBProvider } from '../db';

import { Config } from '../../../app/config/models/config';

@Injectable()
export class ConfigTable extends DBServiceORM {
  // should be equal to the interface in the model directory
  public structure = Config.getTableStructure();
  public tableName = 'config';

  constructor(dbProvider: DBProvider) {
    // define setting model
    super(dbProvider);
  }
}
