import { Injectable } from '@angular/core';
import { DBServiceORM } from '../db.orm.service';
import { DBProvider } from '../db';
import { ResCountryState } from 'src/app/res-country-state/models/res-country-state';




@Injectable()
export class ResCountryStateTable extends DBServiceORM {
  // should be equal to the interface in the model directory
  public structure = ResCountryState.getTableStructure();
  public tableName = 'res_country_state';

  constructor(dbProvider: DBProvider) {
    // define setting model
    super(dbProvider);
  }
}
