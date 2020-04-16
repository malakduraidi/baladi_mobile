import { Injectable } from '@angular/core';
import { DBServiceORM } from '../db.orm.service';
import { DBProvider } from '../db';
import { ResCountry } from 'src/app/res-country/models/res-country';




@Injectable()
export class ResCountryTable extends DBServiceORM {
  // should be equal to the interface in the model directory
  public structure = ResCountry.getTableStructure();
  public tableName = 'res_country';

  constructor(dbProvider: DBProvider) {
    // define setting model
    super(dbProvider);
  }
}
