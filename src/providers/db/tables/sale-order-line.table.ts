import { Injectable } from '@angular/core';
import { DBServiceORM } from '../db.orm.service';
import { DBProvider } from '../db';
import { SaleOrderLine } from 'src/app/sale-order-line/models/sale-order-line';




@Injectable()
export class SaleOrderLineTable extends DBServiceORM {
  // should be equal to the interface in the model directory
  public structure = SaleOrderLine.getTableStructure();
  public tableName = 'sale_order_line';

  constructor(dbProvider: DBProvider) {
    // define setting model
    super(dbProvider);
  }
}
