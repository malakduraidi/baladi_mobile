import { Injectable } from '@angular/core';
import { DBServiceORM } from '../db.orm.service';
import { DBProvider } from '../db';
import { ResPartner } from 'src/app/res-partner/models/res-partner';


@Injectable()
export class ResPartnerTable extends DBServiceORM {
  // should be equal to the interface in the model directory
  public structure = ResPartner.getTableStructure();
  public tableName = 'res_partner';

  constructor(dbProvider: DBProvider) {
    // define setting model
    super(dbProvider);
  }
}
