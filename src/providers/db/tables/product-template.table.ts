import { Injectable } from '@angular/core';
import { DBServiceORM } from '../db.orm.service';
import { DBProvider } from '../db';

import { ProductTemplate } from 'src/app/product-template/models/product-template';


@Injectable()
export class ProductTemplateTable extends DBServiceORM {
  // should be equal to the interface in the model directory
  public structure = ProductTemplate.getTableStructure();
  public tableName = 'product_template';

  constructor(dbProvider: DBProvider) {
    // define setting model
    super(dbProvider);
  }
}
