import { Injectable } from '@angular/core';
import { DBServiceORM } from '../db.orm.service';
import { DBProvider } from '../db';
import { ProductMainSlider } from 'src/app/product-main-slider/models/product-main-slider';




@Injectable()
export class ProductMainSliderTable extends DBServiceORM {
  // should be equal to the interface in the model directory
  public structure = ProductMainSlider.getTableStructure();
  public tableName = 'Product_main_slider';

  constructor(dbProvider: DBProvider) {
    // define setting model
    super(dbProvider);
  }
}
