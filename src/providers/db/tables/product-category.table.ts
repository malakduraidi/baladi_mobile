import { Injectable } from '@angular/core';
import { DBServiceORM } from '../db.orm.service';
import { DBProvider } from '../db';

import { ProductCategory } from 'src/app/product-category/models/product-category';



@Injectable()
export class ProductCategoryTable extends DBServiceORM {
  // should be equal to the interface in the model directory
  public structure = ProductCategory.getTableStructure();
  public tableName = 'Product_category';

  constructor(dbProvider: DBProvider) {
    // define setting model
    super(dbProvider);
  }
}
