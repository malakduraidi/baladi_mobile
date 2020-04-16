import { Injectable } from '@angular/core';
import { DBServiceORM } from '../db.orm.service';
import { DBProvider } from '../db';
import { SaleOrder } from 'src/app/sale-order/models/sale-order';




@Injectable()
export class SaleOrderTable extends DBServiceORM {
  // should be equal to the interface in the model directory
  public structure = SaleOrder.getTableStructure();
  public tableName = 'sale_order';

  constructor(dbProvider: DBProvider) {
    // define setting model
    super(dbProvider);
  }
}
